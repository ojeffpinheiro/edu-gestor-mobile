import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6'
  },
  processingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  processingText: {
    marginTop: 10,
    color: '#64748b'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

export default styles;