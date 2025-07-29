import { useState } from 'react';
import { View } from 'react-native';
import AuthForm from '../components/auth/AuthForm';
import ScannerScreen from '../components/auth/ScannerScreen';
import StudentsScreen from '../components/auth/StudentsScreen';
import HomeScreen from '../components/auth/HomeScreen';
import { AuthView } from '../types/newTypes';

const AuthScreen = () => {
  const [currentView, setCurrentView] = useState<AuthView>('home');
  const [scannedCode, setScannedCode] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'auth':
        return (
          <AuthForm setCurrentView={setCurrentView} />
        );
      case 'scanner':
        return (
          <ScannerScreen
            setCurrentView={setCurrentView}
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'students':
        return (
          <StudentsScreen
            setCurrentView={setCurrentView}
            scannedCode={scannedCode}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        );
      default:
        return <HomeScreen setCurrentView={setCurrentView} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderCurrentView()}
    </View>
  );
};

export default AuthScreen;