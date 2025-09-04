import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme/colors';

export function AppHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <TrendingUp size={28} color={colors.primary[500]} />
        <Text style={styles.appName}>Height Lab</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[800],
    marginLeft: spacing.sm,
  },
});