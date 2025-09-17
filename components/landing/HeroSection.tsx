import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <View style={styles.hero}>
      <Text style={styles.subtitle}>
        Scientific height prediction for children and adolescents using proven medical methods
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginBottom: spacing.xxxl,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[500],
    lineHeight: 26,
  },
});