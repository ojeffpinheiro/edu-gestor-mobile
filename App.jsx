import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import IdentificationScreen from './src/screens/IdentificationScreen';
import CaptureScreen from './src/screens/CaptureScreen';
import ProcessingScreen from './src/screens/ProcessingScreen';
import ReportScreen from './src/screens/ReportScreen';
import CorretionScreen from './src/screens/CorretionScreen';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {
  const [tfReady, setTfReady] = useState(false);

  useEffect(() => {
    const initializeTensorFlow = async () => {
      try {
        // 1. Importar o polyfill específico primeiro
        await import('@tensorflow/tfjs-react-native/dist/platform_react_native');

        await tf.setBackend('rn-webgl');

        // 2. Aguardar a inicialização do backend
        await tf.ready();

        // 3. Verificar o backend
        console.log('Backend atual:', tf.getBackend());

        setTfReady(true);
      } catch (error) {
        console.error('Falha na inicialização:', error);
      }
    };

    initializeTensorFlow();
  }, []);

  if (!tfReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Inicializando TensorFlow...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          id={undefined}
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
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
            component={CorretionScreen}
            options={{ title: 'Correção' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}