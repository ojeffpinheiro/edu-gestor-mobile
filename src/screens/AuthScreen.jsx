import { useState } from 'react';
import { View } from 'react-native';
import AuthForm from '../components/auth/AuthForm';
import ScannerScreen from '../components/auth/ScannerScreen';
import StudentsScreen from '../components/auth/StudentsScreen';
import HomeScreen from '../components/auth/HomeScreen';

const AuthScreen = () => {
  const [currentView, setCurrentView] = useState('home');
  const [scannedCode, setScannedCode] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'auth':
        return (
          <AuthForm
            setCurrentView={setCurrentView}
            setIsAuthenticated={setIsAuthenticated}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'scanner':
        return (
          <ScannerScreen
            setCurrentView={setCurrentView}
            scannedCode={scannedCode}
            setScannedCode={setScannedCode}
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
            isAuthenticated={isAuthenticated}
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