import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

interface GenderSelectorProps {
  value: string;
  onValueChange: (gender: string) => void;
}

export function GenderSelector({ value, onValueChange }: GenderSelectorProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Gender *</Text>
      <View style={styles.genderButtons}>
        <TouchableOpacity
          style={[styles.genderButton, value === 'male' && styles.genderButtonActive]}
          onPress={() => onValueChange('male')}
        >
          <Text style={[styles.genderButtonText, value === 'male' && styles.genderButtonTextActive]}>
            Boy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, value === 'female' && styles.genderButtonActive]}
          onPress={() => onValueChange('female')}
        >
          <Text style={[styles.genderButtonText, value === 'female' && styles.genderButtonTextActive]}>
            Girl
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral[700],
    marginBottom: spacing.sm,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  genderButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  genderButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.neutral[500],
  },
  genderButtonTextActive: {
    color: colors.white,
  },
});