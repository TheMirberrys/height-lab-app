import { View, Text, StyleSheet, TextInput } from 'react-native';
import { UnitToggle } from './UnitToggle';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

interface HeightInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  unit: 'cm' | 'inches';
  onUnitChange: (unit: 'cm' | 'inches') => void;
}

export function HeightInput({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  required = false, 
  helpText,
  unit,
  onUnitChange
}: HeightInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {required && '*'}
      </Text>
      {helpText && <Text style={styles.helpText}>{helpText}</Text>}
      <UnitToggle
        options={['cm', 'inches']}
        selectedOption={unit}
        onOptionChange={(option) => onUnitChange(option as 'cm' | 'inches')}
        label="Unit"
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="numeric"
      />
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
  helpText: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.neutral[800],
  },
});