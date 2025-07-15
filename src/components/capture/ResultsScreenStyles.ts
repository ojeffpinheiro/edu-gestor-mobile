import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  questionContainer: {
    marginBottom: 10
  },
  questionText: {
    fontSize: 16
  },
  warningText: {
    color: 'orange'
  },
  errorContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffeeee'
  },
  errorTitle: {
    fontWeight: 'bold',
    color: 'red'
  },
  errorText: {
    color: 'red'
  }
});

export default styles;