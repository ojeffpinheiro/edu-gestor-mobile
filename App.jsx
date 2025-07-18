import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import { ThemeProvider } from './src/context/ThemeContext';

import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import IdentificationScreen from './src/screens/IdentificationScreen';
import CaptureScreen from './src/screens/CaptureScreen';
import ProcessingScreen from './src/screens/ProcessingScreen';
import ReportScreen from './src/screens/ReportScreen';
import CorrectionScreen from './src/screens/CorretionScreen';
import { loadModels } from './src/utils/imageProcessor';

const Stack = createStackNavigator();

const AppContent = () => {
  const [tfReady, setTfReady] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        // 1. Carrega o polyfill primeiro
        await import('@tensorflow/tfjs-react-native/dist/platform_react_native');

        // 2. Inicializa o TensorFlow
        await tf.ready();

        // 3. Configura o backend
        await tf.setBackend('rn-webgl');

        // 4. Carrega os modelos
        await loadModels();

        if (isMounted) {
          setTfReady(true);
        }
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        if (isMounted) {
          setInitialized(true);
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Inicializando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#2196F3' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Correção de Provas' }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ title: 'Autenticação' }}
          />
          <Stack.Screen
            name="Identification"
            component={IdentificationScreen}
            options={{ title: 'Identificação' }}
          />
          <Stack.Screen
            name="Capture"
            component={CaptureScreen}
            options={{ title: 'Captura' }}
          />
          <Stack.Screen
            name="Processing"
            component={ProcessingScreen}
            options={{ title: 'Processamento' }}
          />
          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{ title: 'Relatório' }}
          />
          <Stack.Screen
            name="Correction"
            component={CorrectionScreen}
            options={{ title: 'Correção' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}