import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '@/theme/colors';

interface AppHeaderProps {
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export function AppHeader({ showBackButton = false, onBackPress }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <ArrowLeft size={24} color={colors.neutral[600]} />
        </TouchableOpacity>
      )}
      <View style={styles.logoContainer}>
        <TrendingUp size={28} color={colors.primary[500]} />
        <Text style={styles.appName}>Height Lab</Text>
      </View>
      {showBackButton && <View style={styles.spacer} />}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: spacing.xxl,
    padding: spacing.sm,
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
  spacer: {
    width: 48, // Same width as back button to center the logo
  },
});