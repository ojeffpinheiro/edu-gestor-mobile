import { View, Text, ScrollView } from 'react-native';
import { BarChart3 } from 'lucide-react-native';
import CorrectionResultCard from './CorrectionResultCard';
import { useTheme } from '../../context/ThemeContext';
import createResultsScreenStyles from './ResultsScreenStyles';

const ResultsScreen = ({ corrections }) => {
  const { colors } = useTheme();
  const styles = createResultsScreenStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Correções Realizadas</Text>
      
      {corrections.length === 0 ? (
        <View style={styles.emptyState}>
          <BarChart3 size={48} color="#9ca3af" />
          <Text style={styles.emptyText}>Nenhuma correção realizada ainda</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.resultsList}>
          {corrections.map((correction) => (
            <CorrectionResultCard key={correction.id} correction={correction} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ResultsScreen;