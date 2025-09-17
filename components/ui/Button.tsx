import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
}

export function Button({ title, onPress, variant = 'primary', size = 'large' }: ButtonProps) {
  const buttonStyle = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
    size === 'large' ? styles.largeButton : styles.mediumButton,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText,
    size === 'large' ? styles.largeButtonText : styles.mediumButtonText,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary[500],
    shadowColor: colors.shadow.primary,
  },
  secondaryButton: {
    backgroundColor: colors.success[500],
    shadowColor: colors.shadow.success,
  },
  largeButton: {
    paddingVertical: spacing.lg,
  },
  mediumButton: {
    paddingVertical: spacing.md,
  },
  buttonText: {
    fontWeight: typography.weights.semibold,
  },
  primaryButtonText: {
    color: colors.white,
  },
  secondaryButtonText: {
    color: colors.white,
  },
  largeButtonText: {
    fontSize: typography.sizes.lg,
  },
  mediumButtonText: {
    fontSize: typography.sizes.md,
  },
});