import { View, StyleSheet } from 'react-native';
import { FormInput } from './FormInput';
import { UnitToggle } from './UnitToggle';
import { spacing } from '@/theme/colors';

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
        <Text style={styles.label}>Age *</Text>
        <UnitToggle
          options={['Years & Months', 'Weeks']}
          selectedOption={ageUnit === 'years-months' ? 'Years & Months' : 'Weeks'}
          onOptionChange={(option) => onAgeUnitChange(option === 'Years & Months' ? 'years-months' : 'weeks')}
          inline
        />
      </View>
      
      {ageUnit === 'years-months' ? (
        <View style={styles.ageRow}>
          <View style={styles.ageInput}>
            <FormInput
              label="Years"
              value={years}
              onChangeText={onYearsChange}
              placeholder="e.g., 8"
              keyboardType="numeric"
              required
            />
          </View>
          <View style={styles.ageInput}>
            <FormInput
              label="Months"
              value={months}
              onChangeText={onMonthsChange}
              placeholder="e.g., 6"
              keyboardType="numeric"
            />
          </View>
        </View>
      ) : (
        <FormInput
          label="Weeks"
          value={weeks}
          onChangeText={onWeeksChange}
          placeholder="e.g., 416"
          keyboardType="numeric"
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
  ageInput: {
    flex: 1,
  },
});