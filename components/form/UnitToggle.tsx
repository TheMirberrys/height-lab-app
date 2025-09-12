import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

interface UnitToggleProps {
  options: string[];
  selectedOption: string;
  onOptionChange: (option: string) => void;
  label?: string;
  inline?: boolean;
}

export function UnitToggle({ options, selectedOption, onOptionChange, label, inline = false }: UnitToggleProps) {
  return (
    <View style={[styles.container, inline && styles.inlineContainer]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.toggleContainer, inline && styles.inlineToggleContainer]}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.toggleOption,
              inline && styles.inlineToggleOption,
              selectedOption === option && styles.toggleOptionActive,
              option === options[0] && styles.toggleOptionFirst,
              option === options[options.length - 1] && styles.toggleOptionLast,
            ]}
            onPress={() => onOptionChange(option)}
          >
            <Text style={[
              styles.toggleText,
              inline && styles.inlineToggleText,
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
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral[600],
    marginBottom: spacing.sm,
    marginRight: spacing.md,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.sm,
    padding: 2,
  },
  inlineToggleContainer: {
    backgroundColor: colors.neutral[200],
    borderRadius: 20,
    padding: 3,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  inlineToggleOption: {
    flex: 0,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
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
  inlineToggleText: {
    fontSize: typography.sizes.xs,
  },
  toggleTextActive: {
    color: colors.neutral[700],
  },
});