import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

interface UnitToggleProps {
  options: string[];
  selectedOption: string;
  onOptionChange: (option: string) => void;
  label: string;
}

export function UnitToggle({ options, selectedOption, onOptionChange, label }: UnitToggleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.toggleContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.toggleOption,
              selectedOption === option && styles.toggleOptionActive,
              option === options[0] && styles.toggleOptionFirst,
              option === options[options.length - 1] && styles.toggleOptionLast,
            ]}
            onPress={() => onOptionChange(option)}
          >
            <Text style={[
              styles.toggleText,
              selectedOption === option && styles.toggleTextActive
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral[600],
    marginBottom: spacing.sm,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.sm,
    padding: 2,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  toggleOptionActive: {
    backgroundColor: colors.white,
    shadowColor: colors.shadow.default,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleOptionFirst: {
    borderTopLeftRadius: borderRadius.sm - 2,
    borderBottomLeftRadius: borderRadius.sm - 2,
  },
  toggleOptionLast: {
    borderTopRightRadius: borderRadius.sm - 2,
    borderBottomRightRadius: borderRadius.sm - 2,
  },
  toggleText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral[500],
  },
  toggleTextActive: {
    color: colors.neutral[700],
  },
});