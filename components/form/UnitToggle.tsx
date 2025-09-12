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
        {/* Left label */}
        <TouchableOpacity onPress={() => onOptionChange(options[0])} style={styles.side}>
          <Text style={[styles.toggleText, selectedOption === options[0] && styles.toggleTextActive]}>
            {options[0]}
          </Text>
        </TouchableOpacity>

        {/* Toggle pill */}
        <View style={styles.pill}>
          <View
            style={[
              styles.knob,
              selectedOption === options[1] && styles.knobRight
            ]}
          />
        </View>

        {/* Right label */}
        <TouchableOpacity onPress={() => onOptionChange(options[1])} style={styles.side}>
          <Text style={[styles.toggleText, selectedOption === options[1] && styles.toggleTextActive]}>
            {options[1]}
          </Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  inlineToggleContainer: {
    marginLeft: spacing.sm,
  },
  side: {
    paddingHorizontal: spacing.sm,
  },
  toggleText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral[500],
  },
  toggleTextActive: {
    color: colors.neutral[700],
  },
  pill: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.neutral[300],
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.white,
    marginLeft: 1,
  },
  knobRight: {
    marginLeft: 21,
  },
});
