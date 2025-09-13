import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { UnitToggle } from './UnitToggle';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

interface HeightInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  helpText?: string;
  unit: 'cm' | 'inches';
  onUnitChange: (unit: 'cm' | 'inches') => void;
}

const InputWithSuffix = ({ value, onChangeText, suffix, style }: {
  value: string;
  onChangeText: (text: string) => void;
  suffix: string;
  style?: any;
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.inputWithSuffix}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
      <Text style={styles.suffix}>{suffix}</Text>
    </View>
  );
};

export function HeightInput({ 
  label, 
  value, 
  onChangeText, 
  required = false, 
  helpText,
  unit,
  onUnitChange
}: HeightInputProps) {
  // For inches, split the value into feet and inches
  const getFeetAndInches = (totalInches: string) => {
    const inches = parseFloat(totalInches) || 0;
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return { feet: feet.toString(), inches: remainingInches.toString() };
  };

  const handleFeetInchesChange = (feet: string, inches: string) => {
    const totalInches = (parseFloat(feet) || 0) * 12 + (parseFloat(inches) || 0);
    onChangeText(totalInches.toString());
  };

  const { feet, inches } = unit === 'inches' ? getFeetAndInches(value) : { feet: '', inches: '' };

  return (
    <View style={styles.inputGroup}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label} {required && '*'}
        </Text>
        <UnitToggle
          options={['cm', 'inches']}
          selectedOption={unit}
          onOptionChange={(option) => onUnitChange(option as 'cm' | 'inches')}
          inline
        />
      </View>
      {helpText && <Text style={styles.helpText}>{helpText}</Text>}
      
      {unit === 'inches' ? (
        <View style={styles.feetInchesRow}>
          <InputWithSuffix
            value={feet}
            onChangeText={(text) => handleFeetInchesChange(text, inches)}
            placeholder="5"
            suffix="ft"
            style={styles.feetInput}
          />
          <InputWithSuffix
            value={inches}
            onChangeText={(text) => handleFeetInchesChange(feet, text)}
            placeholder="8"
            suffix="in"
            style={styles.inchesInput}
          />
        </View>
      ) : (
        <InputWithSuffix
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          suffix="cm"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: spacing.xl,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral[700],
  },
  helpText: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    marginBottom: spacing.sm,
  },
  feetInchesRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  feetInput: {
    flex: 1,
  },
  inchesInput: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  inputWithSuffix: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.neutral[800],
  },
  suffix: {
    fontSize: typography.sizes.md,
    color: colors.neutral[400],
    marginLeft: spacing.xs,
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