import { StyleSheet, View } from 'react-native';
import '@tensorflow/tfjs-react-native';

import HomeScreen from '../components/process/HomeScreen';
import DetailsScreen from '../components/process/DetailsScreen';
import ResultsScreen from '../components/process/ResultsScreen';
import SettingsScreen from '../components/process/SettingsScreen';
import Navigation from '../components/process/Navigation';
import { useTheme } from '../context/ThemeContext';
import { useProcessingLogic } from '../hooks/useProcessing';

const ProcessingScreen = () => {
  const { colors } = useTheme();
  const styles = createProcessingScreenStyles(colors);

  const { currentScreen, capturedImage, processingStatus, correctionResults, corrections, examTemplate,
    handleImageCapture, saveCorrection, setCurrentScreen, setExamTemplate
   } = useProcessingLogic();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'details':
        return (
          <DetailsScreen
            correctionResults={correctionResults}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'results':
        return <ResultsScreen corrections={corrections} />;
      case 'settings':
        return (
          <SettingsScreen
            examTemplate={examTemplate}
            onExamTemplateChange={setExamTemplate}
          />
        );
      default:
        return <HomeScreen
            examTemplate={examTemplate}
            capturedImage={capturedImage}
            processingStatus={processingStatus}
            correctionResults={correctionResults}
            onImageCapture={handleImageCapture}
            onSaveCorrection={saveCorrection}
            onViewDetails={() => setCurrentScreen('details')}
          />
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      {renderScreen()}
    </View>
  );
};

const createProcessingScreenStyles = (colors) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});

export default ProcessingScreen;