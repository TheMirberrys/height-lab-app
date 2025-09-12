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
      <UnitToggle
        options={['years + months', 'weeks']}
        selectedOption={ageUnit === 'years-months' ? 'years + months' : 'weeks'}
        onOptionChange={(option) => onAgeUnitChange(option === 'years + months' ? 'years-months' : 'weeks')}
        label="Age Format"
      />
      
      {ageUnit === 'years-months' ? (
        <View style={styles.ageRow}>
          <View style={styles.ageInput}>
            <FormInput
              label="Age (Years)"
              value={years}
              onChangeText={onYearsChange}
              placeholder="e.g., 8"
              keyboardType="numeric"
              required
            />
          </View>
          <View style={styles.ageInput}>
            <FormInput
              label="Age (Months)"
              value={months}
              onChangeText={onMonthsChange}
              placeholder="e.g., 6"
              keyboardType="numeric"
            />
          </View>
        </View>
      ) : (
        <FormInput
          label="Age (Weeks)"
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
  ageRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  ageInput: {
    flex: 1,
  },
});