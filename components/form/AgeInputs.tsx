import { View, StyleSheet } from 'react-native';
import { FormInput } from './FormInput';
import { spacing } from '@/theme/colors';

interface AgeInputsProps {
  years: string;
  months: string;
  onYearsChange: (text: string) => void;
  onMonthsChange: (text: string) => void;
}

export function AgeInputs({ years, months, onYearsChange, onMonthsChange }: AgeInputsProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
  ageRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  ageInput: {
    flex: 1,
  },
});