import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BarChart3 } from 'lucide-react-native';
import CorrectionResultCard from './CorrectionResultCard';

const ResultsScreen = ({ corrections }) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    color: '#6b7280',
  },
  resultsList: {
    gap: 12,
    paddingBottom: 16,
  },
});

export default ResultsScreen;