import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { UnitToggle } from './UnitToggle';
import { colors, spacing, borderRadius } from '@/theme/colors';
import { typography } from '@/theme/typography';

import { 
  convertYearsMonthsToWeeks, 
  convertWeeksToYearsMonths, 
  parseAgeValue, 
  formatAgeValue 
} from '@/utils/ageUtils';

interface AgeInputsProps {
  value: string; // Unified age value
  onValueChange: (value: string) => void;
  ageUnit: 'years-months' | 'weeks';
  onAgeUnitChange: (unit: 'years-months' | 'weeks') => void;
  error?: string;
}

const InputWithSuffix = ({ value, onChangeText, suffix, required = false }: {
  value: string;
  onChangeText: (text: string) => void;
  suffix: string;
  required?: boolean;
}) => {
  const handleTextChange = (text: string) => {
    // Only allow positive integers (no decimals, no negative numbers)
    const numericText = text.replace(/[^0-9]/g, '');
    onChangeText(numericText);
  };

  return (
    <View style={styles.inputContainer}>
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

export function AgeInputs({
  value,
  onValueChange,
  ageUnit,
  onAgeUnitChange,
  error
}: AgeInputsProps) {
  // Parse current value based on unit
  const currentAge = parseAgeValue(value, ageUnit);
  const { years, months, weeks } = currentAge;

  // Handle unit change with conversion
  const handleUnitChange = (newUnit: 'years-months' | 'weeks') => {
    if (newUnit === ageUnit) return;

    let convertedValue = '';
    if (newUnit === 'weeks' && (years > 0 || months > 0)) {
      const convertedWeeks = convertYearsMonthsToWeeks(years, months);
      convertedValue = convertedWeeks.toString();
    } else if (newUnit === 'years-months' && weeks > 0) {
      const converted = convertWeeksToYearsMonths(weeks);
      convertedValue = formatAgeValue(converted.years, converted.months, 0, 'years-months');
    }

    onValueChange(convertedValue);
    onAgeUnitChange(newUnit);
  };

  // Handle individual field changes
  const handleYearsChange = (newYears: string) => {
    const yearsNum = parseInt(newYears) || 0;
    const newValue = formatAgeValue(yearsNum, months, 0, 'years-months');
    onValueChange(newValue);
  };

  const handleMonthsChange = (newMonths: string) => {
    const monthsNum = parseInt(newMonths) || 0;
    const newValue = formatAgeValue(years, monthsNum, 0, 'years-months');
    onValueChange(newValue);
  };

  const handleWeeksChange = (newWeeks: string) => {
    onValueChange(newWeeks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Age</Text>
        <UnitToggle
          options={['Years & Months', 'Weeks']}
          selectedOption={ageUnit === 'years-months' ? 'Years & Months' : 'Weeks'}
          onOptionChange={(option) => handleUnitChange(option === 'Years & Months' ? 'years-months' : 'weeks')}
          inline
        />
      </View>
      
      {ageUnit === 'years-months' ? (
        <View style={styles.ageRow}>
          <InputWithSuffix
            value={years > 0 ? years.toString() : ''}
            onChangeText={handleYearsChange}
            suffix="years"
            required
          />
          <InputWithSuffix
            value={months > 0 ? months.toString() : ''}
            onChangeText={handleMonthsChange}
            suffix="months"
          />
        </View>
      ) : (
        <InputWithSuffix
          value={weeks > 0 ? weeks.toString() : ''}
          onChangeText={handleWeeksChange}
          suffix="weeks"
          required
        />
      )}
      
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: colors.warning[700],
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
  },
});