import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  correct: {
    backgroundColor: '#dcfce7',
  },
  incorrect: {
    backgroundColor: '#fee2e2',
  },
  questionNumber: {
    fontWeight: '500',
  },
  answers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  answerText: {
    fontSize: 12,
  },
  answerValue: {
    fontWeight: 'bold',
  },
});

export default styles;