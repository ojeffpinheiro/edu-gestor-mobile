import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Download, Share2 } from 'lucide-react-native';
import { createMainStyles } from '../../styles/mainStyles';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, BorderRadius } from '../../styles/designTokens';

const ResultsScreen = ({ results, imageUri, onBack }) => {
  const { colors } = useTheme();
  const styles = createMainStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={localStyles.header}>
          <TouchableOpacity onPress={onBack}>
            <ChevronLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.title, { flex: 1, textAlign: 'center' }]}>Resultados</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={localStyles.content}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={localStyles.resultImage} />
          )}

          <View style={localStyles.resultMeta}>
            <Text style={styles.subtitle}>Detalhes da Análise</Text>
            
            <View style={[localStyles.metaItem, { borderColor: colors.border }]}>
              <Text style={[localStyles.metaLabel, { color: colors.textSecondary }]}>
                Total de Questões:
              </Text>
              <Text style={[localStyles.metaValue, { color: colors.textPrimary }]}>
                {results?.totalQuestions || 'N/A'}
              </Text>
            </View>
            
            <View style={[localStyles.metaItem, { borderColor: colors.border }]}>
              <Text style={[localStyles.metaLabel, { color: colors.textSecondary }]}>
                Acertos:
              </Text>
              <Text style={[localStyles.metaValue, { color: colors.success }]}>
                {results?.correctAnswers || 'N/A'}
              </Text>
            </View>
            
            <View style={[localStyles.metaItem, { borderColor: colors.border }]}>
              <Text style={[localStyles.metaLabel, { color: colors.textSecondary }]}>
                Erros:
              </Text>
              <Text style={[localStyles.metaValue, { color: colors.error }]}>
                {results?.wrongAnswers || 'N/A'}
              </Text>
            </View>
            
            <View style={[localStyles.metaItem, { borderColor: colors.border }]}>
              <Text style={[localStyles.metaLabel, { color: colors.textSecondary }]}>
                Nota Final:
              </Text>
              <Text style={[localStyles.metaValue, { color: colors.primary }]}>
                {results?.score ? `${results.score.toFixed(1)}` : 'N/A'}
              </Text>
            </View>
          </View>

          <View style={localStyles.actionButtons}>
            <TouchableOpacity 
              style={[
                localStyles.actionButton, 
                { backgroundColor: colors.card, borderColor: colors.border }
              ]}
              onPress={() => {/* Implement PDF export */}}
            >
              <Download size={20} color={colors.textPrimary} />
              <Text style={[localStyles.actionButtonText, { color: colors.textPrimary }]}>
                Exportar PDF
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                localStyles.actionButton, 
                { backgroundColor: colors.primary }
              ]}
              onPress={() => {/* Implement share */}}
            >
              <Share2 size={20} color={colors.card} />
              <Text style={[localStyles.actionButtonText, { color: colors.card }]}>
                Compartilhar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg
  },
  content: {
    paddingBottom: Spacing.xl
  },
  resultImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg
  },
  resultMeta: {
    marginBottom: Spacing.xl
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1
  },
  metaLabel: {
    fontSize: 16
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '600'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginHorizontal: Spacing.sm
  },
  actionButtonText: {
    marginLeft: Spacing.sm,
    fontWeight: '600'
  }
});

export default ResultsScreen;
