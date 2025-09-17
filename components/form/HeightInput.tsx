import React, { useState, useEffect } from 'react';
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
  error?: string;
}

const InputWithSuffix = ({
  value,
  onChangeText,
  suffix,
  style,
}: {
  value: string;
  onChangeText: (text: string) => void;
  suffix: string;
  style?: any;
}) => {
  const handleTextChange = (text: string) => {
    // Only allow positive integers
    const numericText = text.replace(/[^0-9]/g, '');
    onChangeText(numericText);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.inputWithSuffix}
        value={value}
        onChangeText={handleTextChange}
        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
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
  error,
}: HeightInputProps) {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  // Sync feet/inches state when value changes and unit is inches
  useEffect(() => {
    if (unit === 'inches') {
      const totalInches = parseInt(value) || 0;
      setFeet(Math.floor(totalInches / 12).toString());
      setInches((totalInches % 12).toString());
    }
  }, [value, unit]);

  const handleFeetInchesChange = (newFeet: string, newInches: string) => {
    setFeet(newFeet);
    setInches(newInches);
    const totalInches = (parseInt(newFeet) || 0) * 12 + (parseInt(newInches) || 0);
    onChangeText(totalInches.toString());
  };

  const handleUnitChange = (newUnit: 'cm' | 'inches') => {
    const convertedValue = convertHeight(value, unit, newUnit);
    onChangeText(convertedValue);
    onUnitChange?.(newUnit);
  };

  return (
    <View style={styles.inputGroup}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label} {required && '*'}
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

      {unit === 'inches' ? (
        <View style={styles.feetInchesRow}>
          <InputWithSuffix
            value={feet}
            onChangeText={(text) => handleFeetInchesChange(text, inches)}
            suffix="ft"
            style={styles.feetInput}
          />
          <InputWithSuffix
            value={inches}
            onChangeText={(text) => handleFeetInchesChange(feet, text)}
            suffix="in"
            style={styles.inchesInput}
          />
        </View>
      ) : (
        <InputWithSuffix value={value} onChangeText={onChangeText} suffix="cm" />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
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
  },
  feetInput: {
    flex: 1,
    marginRight: spacing.md,
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
  errorText: {
    color: colors.warning[700],
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
  },
});
