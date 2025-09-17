import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { UnitToggle } from './UnitToggle';
import { colors, spacing, borderRadius } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { convertHeight } from '@/utils/heightUtils';

interface HeightInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  helpText?: string;
  unit: 'cm' | 'inches';
  onUnitChange?: (unit: 'cm' | 'inches') => void;
  showUnitToggle?: boolean;
  hasError?: boolean;
}

const InputWithSuffix = ({ value, onChangeText, suffix, style, hasError }: {
  value: string;
  onChangeText: (text: string) => void;
  suffix: string;
  style?: any;
  hasError?: boolean;
}) => {
  const handleTextChange = (text: string) => {
    // Only allow positive integers (no decimals, no negative numbers)
    const numericText = text.replace(/[^0-9]/g, '');
    onChangeText(numericText);
  };

  return (
    <View style={[styles.inputContainer, style, hasError && styles.inputContainerError]}>
      <TextInput
        style={styles.inputWithSuffix}
        value={value}
        onChangeText={handleTextChange}
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
  onUnitChange,
  showUnitToggle = true,
  hasError = false
}: HeightInputProps) {
  // For inches, split the value into feet and inches
  const getFeetAndInches = (totalInches: string) => {
    const inches = parseFloat(totalInches) || 0;
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return { feet: feet.toString(), inches: remainingInches.toString() };
  };

  const handleFeetInchesChange = (feet: string, inches: string) => {
    const totalInches = (parseInt(feet) || 0) * 12 + (parseInt(inches) || 0);
    onChangeText(totalInches.toString());
  };

  // Handle unit change with conversion
  const handleUnitChange = (newUnit: 'cm' | 'inches') => {
    const convertedValue = convertHeight(value, unit, newUnit);
    onChangeText(convertedValue);
    onUnitChange(newUnit);
  };

  const { feet, inches } = unit === 'inches' ? getFeetAndInches(value) : { feet: '', inches: '' };

  return (
    <View style={styles.inputGroup}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, hasError && styles.labelError]}>
          {label}
        </Text>
        {showUnitToggle && onUnitChange && (
          <UnitToggle
            options={['cm', 'inches']}
            selectedOption={unit}
            onOptionChange={(option) => handleUnitChange(option as 'cm' | 'inches')}
            inline
          />
        )}
      </View>
      {helpText && <Text style={styles.helpText}>{helpText}</Text>}
      {hasError && (
        <Text style={styles.errorText}>Please answer this question</Text>
      )}
      
      {unit === 'inches' ? (
        <View style={styles.feetInchesRow}>

          <InputWithSuffix
            value={feet}
            onChangeText={(text) => handleFeetInchesChange(text, inches)}
            suffix="ft"
            style={styles.feetInput}
            hasError={hasError}
          />
          <InputWithSuffix
            value={inches}
            onChangeText={(text) => handleFeetInchesChange(feet, text)}
            suffix="in"
            style={styles.inchesInput}
            hasError={hasError}
          />
        </View>
      ) : (
        <InputWithSuffix
          value={value}
          onChangeText={onChangeText}
          suffix="cm"
          hasError={hasError}
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
  labelError: {
    color: '#DC2626',
  },
  helpText: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    marginBottom: spacing.sm,
  },
  errorText: {
    fontSize: typography.sizes.xs,
    color: '#DC2626',
    marginBottom: spacing.sm,
    fontWeight: typography.weights.medium,
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
  inputContainerError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
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