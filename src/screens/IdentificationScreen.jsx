import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import { BorderRadius, Spacing, Typography, Shadow } from '../styles/designTokens';

const { width, height } = Dimensions.get('window');

export default function IdentificationScreen() {
  const [numQuestoes, setNumQuestoes] = useState('');
  const [etapa, setEtapa] = useState('config');
  const [imagemUri, setImagemUri] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const [processando, setProcessando] = useState(false);
  const [permissaoCamera, setPermissaoCamera] = useState(null);
  const cameraRef = useRef(null);

  const { colors } = useTheme();
  const styles = createIdentificationScreenStyles(colors)

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
        {
          text: 'Compartilhar', onPress: () => {
            // Implementar compartilhamento
            console.log('Compartilhar resultado');
          }
        }
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

        <Button
          title="Iniciar Captura"
          onPress={iniciarCaptura}
          variant="primary"
          icon={<MaterialIcons name="camera-alt" size={24} color="white" />}
          iconPosition="left"
        />
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
          <Button
            title="Tentar Novamente"
            onPress={obterPermissaoCamera}
            variant="outline"
          />
        </View>
      );
    }

    return (
      <View style={styles.containerCamera}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back" />

        <View style={styles.overlayCamera}>
          <Button onPress={() => setEtapa('config')}
            icon={<MaterialIcons name="arrow-back" size={28} color="white" />}
            title='Posicione o gabarito na tela' />

          <View style={styles.guiaCaptura}>
            <View style={styles.bordaGuia} />
          </View>

          <View style={styles.controlesCamera}>
            <Button style={styles.botaoGaleria} onPress={escolherDaGaleria} 
              icon={ <MaterialIcons name="photo-library" size={24} color="white" />}  />
            
            <Button style={styles.botaoCapturar} onPress={tirarFoto} />

            <View style={styles.espaco} />
          </View>
        </View>
      </View>
    );
  };

  const renderizarResultado = () => (
    <ScrollView style={styles.container}>
      <View style={styles.headerResultado}>
        <Button onPress={reiniciar} 
          icon={<MaterialIcons name="arrow-back" size={28} color="#333" />} />
        
        <Text style={styles.tituloResultado}>Resultado</Text>
        <Button
          onPress={exportarResultado}
          variant="ghost"
          icon={<MaterialIcons name="share" size={24} color="#4CAF50" />}
        />
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

const createIdentificationScreenStyles = (colors) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: colors.background.primary,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.xxl,
  },
  titulo: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.text.primary,
    marginTop: Spacing.md,
  },
  subtitulo: {
    fontSize: Typography.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  card: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadow(colors).sm,
  },
  label: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    fontSize: Typography.fontSize.md,
    marginBottom: Spacing.xl,
    backgroundColor: colors.background.secondary,
  },
  instrucoes: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    ...Shadow(colors).sm,
  },
  tituloInstrucoes: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.md,
  },
  textoInstrucoes: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: Typography.lineHeight.md,
    marginBottom: Spacing.sm,
  },
  containerCamera: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlayCamera: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  guiaCaptura: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bordaGuia: {
    width: '80%',
    height: '50%',
    borderWidth: 2,
    borderColor: colors.text.onPrimary,
    borderRadius: BorderRadius.lg,
    borderStyle: 'dashed',
  },
  controlesCamera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  botaoGaleria: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.gray[600] + '4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  erro: {
    fontSize: Typography.fontSize.md,
    color: colors.feedback.error,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  headerResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    marginTop: Spacing.xxl,
  },
  tituloResultado: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.text.primary,
  },
  containerImagem: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadow(colors).sm,
  },
  imagemProcessada: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
  },
  containerProcessando: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  textoProcessando: {
    fontSize: Typography.fontSize.md,
    color: colors.text.secondary,
    marginTop: Spacing.md,
  },
  containerRespostas: {
    backgroundColor: colors.component.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadow(colors).sm,
  },
  tituloRespostas: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: Spacing.md,
  },
  gridRespostas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemResposta: {
    width: '18%',
    backgroundColor: colors.background.secondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
    minHeight: 80,
  },
  numeroQuestao: {
    fontSize: Typography.fontSize.xs,
    color: colors.text.secondary,
    fontWeight: Typography.fontWeight.semibold,
  },
  alternativaResposta: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: colors.feedback.success,
    marginTop: Spacing.xs,
  },
  naoIdentificada: {
    color: colors.feedback.error,
  },
  barraConfianca: {
    width: '100%',
    height: 3,
    backgroundColor: colors.border.light,
    borderRadius: 2,
    marginTop: Spacing.sm,
  },
  preenchimentoConfianca: {
    height: '100%',
    backgroundColor: colors.feedback.success,
    borderRadius: 2,
  },
  resumo: {
    marginTop: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: colors.feedback.success + '20',
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.feedback.success,
  },
  textoResumo: {
    fontSize: Typography.fontSize.sm,
    color: colors.text.primary,
    marginBottom: Spacing.xs,
  },
});