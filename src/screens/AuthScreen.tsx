import { useState } from 'react';
import { View } from 'react-native';

import { AuthView } from '../types/newTypes';

import AuthForm from '../components/views/AuthForm';
import HomeView from '../components/views/HomeView';
import ScannerView from '../components/views/ScannerView';
import StudentsView from '../components/views/StudentsView';

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
          <ScannerView
            setCurrentView={setCurrentView}
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'students':
        return (
          <StudentsView
            setCurrentView={setCurrentView}
            scannedCode={scannedCode}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        );
      default:
        return <HomeView setCurrentView={setCurrentView} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderCurrentView()}
    </View>
  );
};

export default AuthScreen;