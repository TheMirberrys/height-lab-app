import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface MethodCardProps {
  icon: React.ReactNode;
  method: string;
  height: number;
  confidence: string;
  explanation: string;
  formatHeight: (inches: number) => string;
}

export function MethodCard({ icon, method, height, confidence, explanation, formatHeight }: MethodCardProps) {
  return (
    <View style={styles.methodCard}>
      <View style={styles.methodHeader}>
        {icon}
        <View style={styles.methodTitleContainer}>
          <Text style={styles.methodName}>{method}</Text>
          <Text style={styles.methodConfidence}>{confidence} Confidence</Text>
        </View>
        <Text style={styles.methodHeight}>{formatHeight(height)}</Text>
      </View>
      <Text style={styles.methodExplanation}>{explanation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  methodCard: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow.default,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  methodTitleContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  methodName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[800],
    marginBottom: 2,
  },
  methodConfidence: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
  },
  methodHeight: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.primary[500],
  },
  methodExplanation: {
    fontSize: typography.sizes.base,
    color: colors.neutral[500],
    lineHeight: 20,
  },
});