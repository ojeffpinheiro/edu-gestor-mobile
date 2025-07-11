import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function IdentificationScreen() {
  const [numQuestoes, setNumQuestoes] = useState('');
  const [etapa, setEtapa] = useState('config');
  const [imagemUri, setImagemUri] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const [processando, setProcessando] = useState(false);
  const [permissaoCamera, setPermissaoCamera] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    obterPermissaoCamera();
  }, []);

  const obterPermissaoCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermissaoCamera(status === 'granted');
  };

  const iniciarCaptura = () => {
    const num = parseInt(numQuestoes);
    if (!num || num < 1 || num > 50) {
      Alert.alert('Erro', 'Digite um número válido de questões (1-50)');
      return;
    }
    setEtapa('camera');
  };

  const tirarFoto = async () => {
    if (cameraRef.current) {
      try {
        const foto = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setImagemUri(foto.uri);
        processarImagem(foto.uri);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível tirar a foto');
      }
    }
  };

  const escolherDaGaleria = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagemUri(resultado.assets[0].uri);
      processarImagem(resultado.assets[0].uri);
    }
  };

  const processarImagem = async (uri) => {
    setProcessando(true);
    setEtapa('resultado');
    
    // Simulação do processamento de imagem
    // Em uma implementação real, aqui você usaria bibliotecas como OpenCV
    // ou serviços de OCR/ML para detectar as marcações
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const num = parseInt(numQuestoes);
      const respostasSimuladas = [];
      
      for (let i = 1; i <= num; i++) {
        // Simula detecção aleatória de alternativas (A, B, C, D, E)
        const alternativas = ['A', 'B', 'C', 'D', 'E'];
        const alternativaMarcada = Math.random() > 0.1 ? 
          alternativas[Math.floor(Math.random() * alternativas.length)] : 
          null;
        
        respostasSimuladas.push({
          questao: i,
          resposta: alternativaMarcada,
          confianca: alternativaMarcada ? Math.random() * 0.3 + 0.7 : 0
        });
      }
      
      setRespostas(respostasSimuladas);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível processar a imagem');
    } finally {
      setProcessando(false);
    }
  };

  const reiniciar = () => {
    setEtapa('config');
    setImagemUri(null);
    setRespostas([]);
    setNumQuestoes('');
  };

  const exportarResultado = () => {
    const gabarito = respostas.map(r => 
      `${r.questao}: ${r.resposta || 'Não identificada'}`
    ).join('\n');
    
    Alert.alert(
      'Gabarito Identificado',
      gabarito,
      [
        { text: 'Fechar', style: 'cancel' },
        { text: 'Compartilhar', onPress: () => {
          // Implementar compartilhamento
          console.log('Compartilhar resultado');
        }}
      ]
    );
  };

  const renderizarConfig = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="assignment" size={48} color="#4CAF50" />
        <Text style={styles.titulo}>Leitor de Gabarito</Text>
        <Text style={styles.subtitulo}>
          Identifique automaticamente as respostas marcadas
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Número de questões:</Text>
        <TextInput
          style={styles.input}
          value={numQuestoes}
          onChangeText={setNumQuestoes}
          keyboardType="numeric"
          placeholder="Ex: 20"
          maxLength={2}
        />
        
        <TouchableOpacity style={styles.botaoPrimario} onPress={iniciarCaptura}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
          <Text style={styles.textoBotaoPrimario}>Iniciar Captura</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.instrucoes}>
        <Text style={styles.tituloInstrucoes}>Instruções:</Text>
        <Text style={styles.textoInstrucoes}>
          • Certifique-se de que o gabarito está bem iluminado
        </Text>
        <Text style={styles.textoInstrucoes}>
          • Mantenha a folha reta e sem dobras
        </Text>
        <Text style={styles.textoInstrucoes}>
          • Enquadre toda a área das respostas
        </Text>
      </View>
    </View>
  );

  const renderizarCamera = () => {
    if (permissaoCamera === null) {
      return (
        <View style={styles.container}>
          <Text>Solicitando permissão para usar a câmera...</Text>
        </View>
      );
    }
    
    if (permissaoCamera === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.erro}>Permissão da câmera negada</Text>
          <TouchableOpacity style={styles.botaoSecundario} onPress={obterPermissaoCamera}>
            <Text style={styles.textoBotaoSecundario}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.containerCamera}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.back}
          autoFocus={Camera.Constants.AutoFocus.on}
        >
          <View style={styles.overlayCamera}>
            <View style={styles.headerCamera}>
              <TouchableOpacity onPress={() => setEtapa('config')}>
                <MaterialIcons name="arrow-back" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.tituloCamera}>
                Posicione o gabarito na tela
              </Text>
            </View>
            
            <View style={styles.guiaCaptura}>
              <View style={styles.bordaGuia} />
            </View>
            
            <View style={styles.controlesCamera}>
              <TouchableOpacity 
                style={styles.botaoGaleria}
                onPress={escolherDaGaleria}
              >
                <MaterialIcons name="photo-library" size={24} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.botaoCaptura} onPress={tirarFoto}>
                <View style={styles.botaoCapturaInner} />
              </TouchableOpacity>
              
              <View style={styles.espaco} />
            </View>
          </View>
        </Camera>
      </View>
    );
  };

  const renderizarResultado = () => (
    <ScrollView style={styles.container}>
      <View style={styles.headerResultado}>
        <TouchableOpacity onPress={reiniciar}>
          <MaterialIcons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.tituloResultado}>Resultado</Text>
        <TouchableOpacity onPress={exportarResultado}>
          <MaterialIcons name="share" size={28} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {imagemUri && (
        <View style={styles.containerImagem}>
          <Image source={{ uri: imagemUri }} style={styles.imagemProcessada} />
        </View>
      )}

      {processando ? (
        <View style={styles.containerProcessando}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.textoProcessando}>Processando imagem...</Text>
        </View>
      ) : (
        <View style={styles.containerRespostas}>
          <Text style={styles.tituloRespostas}>
            Respostas Identificadas ({respostas.length})
          </Text>
          
          <View style={styles.gridRespostas}>
            {respostas.map((resposta, index) => (
              <View key={index} style={styles.itemResposta}>
                <Text style={styles.numeroQuestao}>{resposta.questao}</Text>
                <Text style={[
                  styles.alternativaResposta,
                  !resposta.resposta && styles.naoIdentificada
                ]}>
                  {resposta.resposta || '?'}
                </Text>
                {resposta.confianca > 0 && (
                  <View style={styles.barraConfianca}>
                    <View 
                      style={[
                        styles.preenchimentoConfianca,
                        { width: `${resposta.confianca * 100}%` }
                      ]} 
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.resumo}>
            <Text style={styles.textoResumo}>
              Identificadas: {respostas.filter(r => r.resposta).length} de {respostas.length}
            </Text>
            <Text style={styles.textoResumo}>
              Não identificadas: {respostas.filter(r => !r.resposta).length}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.app}>
      {etapa === 'config' && renderizarConfig()}
      {etapa === 'camera' && renderizarCamera()}
      {etapa === 'resultado' && renderizarResultado()}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  botaoPrimario: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoPrimario: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  textoBotaoSecundario: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  instrucoes: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tituloInstrucoes: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  textoInstrucoes: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 5,
  },
  containerCamera: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlayCamera: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  headerCamera: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  tituloCamera: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  guiaCaptura: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bordaGuia: {
    width: width * 0.8,
    height: height * 0.5,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  controlesCamera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  botaoGaleria: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCaptura: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCapturaInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  espaco: {
    width: 50,
  },
  erro: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  tituloResultado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  containerImagem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagemProcessada: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  containerProcessando: {
    alignItems: 'center',
    padding: 40,
  },
  textoProcessando: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  containerRespostas: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tituloRespostas: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  gridRespostas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemResposta: {
    width: '18%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    minHeight: 80,
  },
  numeroQuestao: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  alternativaResposta: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
  },
  naoIdentificada: {
    color: '#f44336',
  },
  barraConfianca: {
    width: '100%',
    height: 3,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 8,
  },
  preenchimentoConfianca: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  resumo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f8f0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  textoResumo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});