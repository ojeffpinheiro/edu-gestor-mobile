import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { 
  Camera, 
  ScanLine, 
  User, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  Users,
  Settings,
  Home,
  Eye,
  EyeOff
} from 'lucide-react-native';

const AuthScreen = () => {
  const [currentView, setCurrentView] = useState('home');
  const [scannedCode, setScannedCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [students, setStudents] = useState([
    { id: '001', name: 'Ana Silva', class: '3A' },
    { id: '002', name: 'Carlos Santos', class: '3A' },
    { id: '003', name: 'Maria Oliveira', class: '3B' },
    { id: '004', name: 'João Pereira', class: '3B' }
  ]);

  const validatePassword = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setCurrentView('scanner');
    } else {
      Alert.alert('Erro', 'Senha incorreta!');
    }
  };

  const simulateBarcodeScan = () => {
    const mockCodes = ['PROVA001', 'TURMA3A', 'TURMA3B', 'PROVA002'];
    const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
    setScannedCode(randomCode);
    setScannerActive(false);
  };

  const HomeScreen = () => (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <BookOpen size={32} color="#2563eb" />
          </View>
          <Text style={styles.title}>Correção Automatizada</Text>
          <Text style={styles.subtitle}>Sistema para correção de provas via scanner</Text>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Como funciona:</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• Autentique-se com sua senha</Text>
            <Text style={styles.infoItem}>• Escaneie o código da prova</Text>
            <Text style={styles.infoItem}>• Identifique o aluno</Text>
            <Text style={styles.infoItem}>• Capture a folha de resposta</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setCurrentView('auth')}
        >
          <Text style={styles.buttonText}>Iniciar Correção</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const AuthScreenComponent = () => (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Lock size={24} color="#2563eb" />
          </View>
          <Text style={styles.title}>Autenticação</Text>
          <Text style={styles.subtitle}>Digite sua senha para acessar o sistema</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} color="#6b7280" /> : <Eye size={20} color="#6b7280" />}
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={validatePassword}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentView('home')}
        >
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
        
        <View style={styles.demoBox}>
          <Text style={styles.demoText}>
            <Text style={{fontWeight: 'bold'}}>Demo:</Text> Use a senha "admin123" para testar
          </Text>
        </View>
      </View>
    </View>
  );

  const ScannerScreen = () => (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <ScanLine size={24} color="#2563eb" />
          </View>
          <Text style={styles.title}>Scanner de Código</Text>
          <Text style={styles.subtitle}>Escaneie o código da prova ou turma</Text>
        </View>
        
        <View style={styles.scannerPlaceholder}>
          {scannerActive ? (
            <View style={styles.scannerActive}>
              <Camera size={32} color="#2563eb" />
              <Text style={styles.scannerText}>Escaneando...</Text>
            </View>
          ) : (
            <View style={styles.scannerInactive}>
              <ScanLine size={32} color="#9ca3af" />
              <Text style={styles.scannerText}>Clique para iniciar o scanner</Text>
            </View>
          )}
        </View>
        
        {scannedCode && (
          <View style={styles.successBox}>
            <View style={styles.successHeader}>
              <CheckCircle size={20} color="#16a34a" />
              <Text style={styles.successTitle}>Código Detectado</Text>
            </View>
            <Text style={styles.successCode}>{scannedCode}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.primaryButton, scannerActive && styles.disabledButton]}
          onPress={() => {
            setScannerActive(true);
            setTimeout(simulateBarcodeScan, 2000);
          }}
          disabled={scannerActive}
        >
          <Text style={styles.buttonText}>
            {scannerActive ? 'Escaneando...' : 'Iniciar Scanner'}
          </Text>
        </TouchableOpacity>
        
        {scannedCode && (
          <TouchableOpacity 
            style={styles.successButton}
            onPress={() => setCurrentView('students')}
          >
            <Text style={styles.buttonText}>Continuar para Identificação</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentView('auth')}
        >
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const StudentsScreen = () => (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Users size={24} color="#2563eb" />
          </View>
          <Text style={styles.title}>Identificação de Aluno</Text>
          <Text style={styles.subtitle}>Selecione o aluno para esta prova</Text>
        </View>
        
        {scannedCode && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              <Text style={{fontWeight: 'bold'}}>Código:</Text> {scannedCode}
            </Text>
          </View>
        )}
        
        <ScrollView style={styles.studentsList}>
          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentItem,
                selectedStudent === student.id && styles.selectedStudent
              ]}
              onPress={() => setSelectedStudent(student.id)}
            >
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentClass}>Turma: {student.class}</Text>
              </View>
              <View style={styles.studentIdContainer}>
                <Text style={styles.studentId}>ID: {student.id}</Text>
                {selectedStudent === student.id && (
                  <CheckCircle size={20} color="#2563eb" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {selectedStudent && (
          <View style={styles.successBox}>
            <View style={styles.successHeader}>
              <CheckCircle size={20} color="#16a34a" />
              <Text style={styles.successTitle}>Aluno Selecionado</Text>
            </View>
            <Text style={styles.successText}>
              {students.find(s => s.id === selectedStudent)?.name}
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.primaryButton, !selectedStudent && styles.disabledButton]}
          onPress={() => Alert.alert('Próximo passo', 'Captura da folha de resposta')}
          disabled={!selectedStudent}
        >
          <Text style={styles.buttonText}>Continuar para Captura</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentView('scanner')}
        >
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'auth':
        return <AuthScreenComponent />;
      case 'scanner':
        return <ScannerScreen />;
      case 'students':
        return <StudentsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.appContainer}>
      {renderCurrentView()}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(239, 246, 255, 0.5)',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: '#dbeafe',
    borderRadius: 999,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    color: '#1e40af',
    fontSize: 14,
  },
  infoList: {
    marginTop: 8,
  },
  infoItem: {
    color: '#1e40af',
    fontSize: 14,
    marginBottom: 4,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    paddingRight: 48,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  successButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  demoBox: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  demoText: {
    color: '#92400e',
    fontSize: 14,
  },
  scannerPlaceholder: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    height: 200,
  },
  scannerActive: {
    alignItems: 'center',
  },
  scannerInactive: {
    alignItems: 'center',
  },
  scannerText: {
    color: '#6b7280',
    marginTop: 16,
  },
  successBox: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  successTitle: {
    fontWeight: '600',
    color: '#166534',
    marginLeft: 8,
  },
  successText: {
    color: '#166534',
  },
  successCode: {
    color: '#166534',
    fontFamily: 'monospace',
    fontSize: 18,
  },
  studentsList: {
    maxHeight: 300,
    marginBottom: 24,
  },
  studentItem: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedStudent: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  studentInfo: {
    marginBottom: 8,
  },
  studentName: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: 16,
  },
  studentClass: {
    color: '#6b7280',
    fontSize: 14,
  },
  studentIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  studentId: {
    color: '#9ca3af',
    fontSize: 14,
  },
});

export default AuthScreen;