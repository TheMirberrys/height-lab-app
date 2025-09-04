import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

export function AccuracyCard() {
  return (
    <View style={styles.accuracyCard}>
      <Text style={styles.accuracyTitle}>Scientific Accuracy</Text>
      <Text style={styles.accuracyText}>
        Our predictions combine multiple proven methods and exclude outliers for the most accurate results. 
        Typical accuracy is within 2-4 inches of adult height.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  accuracyCard: {
    backgroundColor: colors.primary[50],
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xxxl,
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  accuracyTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.primary[500],
    marginBottom: spacing.sm,
  },
  accuracyText: {
    fontSize: typography.sizes.base,
    color: colors.primary[700],
    lineHeight: 20,
  },
});