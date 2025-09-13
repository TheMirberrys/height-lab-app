import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { UnitToggle } from './UnitToggle';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

interface AgeInputsProps {
  years: string;
  months: string;
  weeks: string;
  onYearsChange: (text: string) => void;
  onMonthsChange: (text: string) => void;
  onWeeksChange: (text: string) => void;
  ageUnit: 'years-months' | 'weeks';
  onAgeUnitChange: (unit: 'years-months' | 'weeks') => void;
}

const InputWithSuffix = ({ value, onChangeText, suffix, required = false }: {
  value: string;
  onChangeText: (text: string) => void;
  suffix: string;
  required?: boolean;
}) => {
  return (
    <View style={styles.inputContainer}>
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

export function AgeInputs({ 
  years, 
  months, 
  weeks,
  onYearsChange, 
  onMonthsChange,
  onWeeksChange,
  ageUnit,
  onAgeUnitChange
}: AgeInputsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Age</Text>
        <UnitToggle
          options={['Years & Months', 'Weeks']}
          selectedOption={ageUnit === 'years-months' ? 'Years & Months' : 'Weeks'}
          onOptionChange={(option) => onAgeUnitChange(option === 'Years & Months' ? 'years-months' : 'weeks')}
          inline
        />
      </View>
      
      {ageUnit === 'years-months' ? (
        <View style={styles.ageRow}>
          <InputWithSuffix
            value={years}
            onChangeText={onYearsChange}
            suffix="years"
            required
          />
          <InputWithSuffix
            value={months}
            onChangeText={onMonthsChange}
            suffix="months"
          />
        </View>
      ) : (
        <InputWithSuffix
          value={weeks}
          onChangeText={onWeeksChange}
          suffix="weeks"
          required
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  ageRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    flex: 1,
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
});