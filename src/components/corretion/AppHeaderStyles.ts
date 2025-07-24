import { StyleSheet } from "react-native";
import { ColorScheme } from "../../styles/colors";
import { Spacing } from "../../styles/designTokens";

const createHeaderstyles = (colors: ColorScheme) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: Spacing.xs,
  },
});

export default createHeaderstyles;