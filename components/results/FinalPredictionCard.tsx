import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

interface FinalPredictionCardProps {
  height: number;
  formatHeight: (inches: number) => string;
}

export function FinalPredictionCard({ height, formatHeight }: FinalPredictionCardProps) {
  return (
    <View style={styles.finalCard}>
      <Text style={styles.finalLabel}>Predicted Adult Height</Text>
      <Text style={styles.finalHeight}>{formatHeight(height)}</Text>
      <Text style={styles.finalSubtext}>({height} inches)</Text>
      <View style={styles.confidenceBar}>
        <View style={styles.confidenceBarFill} />
      </View>
      <Text style={styles.confidenceText}>High Confidence</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  finalCard: {
    backgroundColor: colors.white,
    padding: spacing.xxl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.xxxl,
    shadowColor: colors.shadow.default,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  finalLabel: {
    fontSize: typography.sizes.md,
    color: colors.neutral[500],
    marginBottom: spacing.sm,
  },
  finalHeight: {
    fontSize: typography.sizes.xxxxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[800],
    marginBottom: 4,
  },
  finalSubtext: {
    fontSize: typography.sizes.md,
    color: colors.neutral[500],
    marginBottom: spacing.lg,
  },
  confidenceBar: {
    width: 200,
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: 3,
    marginBottom: spacing.sm,
  },
  confidenceBarFill: {
    width: '85%',
    height: '100%',
    backgroundColor: colors.success[500],
    borderRadius: 3,
  },
  confidenceText: {
    fontSize: typography.sizes.base,
    color: colors.success[500],
    fontWeight: typography.weights.medium,
  },
});