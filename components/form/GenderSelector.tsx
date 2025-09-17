import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface GenderSelectorProps {
  value: string;
  onValueChange: (gender: string) => void;
  hasError?: boolean;
}

export function GenderSelector({ value, onValueChange, hasError = false }: GenderSelectorProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, hasError && styles.labelError]}>Gender *</Text>
      <View style={[styles.genderButtons, hasError && styles.genderButtonsError]}>
        <TouchableOpacity
          style={[
            styles.genderButton, 
            value === 'male' && styles.genderButtonActive,
            hasError && !value && styles.genderButtonError
          ]}
          onPress={() => onValueChange('male')}
        >
          <Text style={[styles.genderButtonText, value === 'male' && styles.genderButtonTextActive]}>
            Boy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton, 
            value === 'female' && styles.genderButtonActive,
            hasError && !value && styles.genderButtonError
          ]}
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
  labelError: {
    color: '#DC2626',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  genderButtonsError: {
    // Container error styling if needed
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
  genderButtonError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
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