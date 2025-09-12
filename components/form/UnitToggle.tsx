import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme/colors';

interface UnitToggleProps {
  options: string[]; // expects exactly 2 options, e.g. ["°C", "°F"]
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
        {options.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[styles.half]}
            onPress={() => onOptionChange(option)}
            activeOpacity={0.8}
          >
            {/* Knob that moves to the selected side */}
            {selectedOption === option && (
              <View
                style={[
                  styles.knob,
                  index === 0 ? styles.knobLeft : styles.knobRight,
                ]}
              />
            )}
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
    backgroundColor: colors.neutral[200],
    borderRadius: 20,
    overflow: 'hidden',
  },
  inlineToggleContainer: {
    marginLeft: spacing.sm,
  },
  half: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    position: 'relative',
  },
  knob: {
    ...StyleSheet.absoluteFillObject,
    margin: 2,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  knobLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  knobRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
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
