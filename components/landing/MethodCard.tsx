import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

interface MethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function MethodCard({ icon, title, description }: MethodCardProps) {
  return (
    <View style={styles.methodCard}>
      {icon}
      <View style={styles.methodContent}>
        <Text style={styles.methodTitle}>{title}</Text>
        <Text style={styles.methodDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  methodCard: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow.default,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  methodContent: {
    marginLeft: spacing.lg,
    flex: 1,
  },
  methodTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[800],
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[500],
    lineHeight: 18,
  },
});