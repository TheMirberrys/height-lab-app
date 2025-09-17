import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface UnitToggleProps {
  options: string[]; // expects exactly 2 options, e.g. ["°C", "°F"]
  selectedOption: string;
  onOptionChange: (option: string) => void;
  label?: string;
  inline?: boolean;
}

export function UnitToggle({ options, selectedOption, onOptionChange, label, inline = false }: UnitToggleProps) {
  const knobPosition = useRef(new Animated.Value(selectedOption === options[0] ? 0 : 1)).current;

  // Animate knob when selection changes
  useEffect(() => {
    Animated.spring(knobPosition, {
      toValue: selectedOption === options[0] ? 0 : 1,
      useNativeDriver: false,
      friction: 8,
      tension: 70,
    }).start();
  }, [selectedOption]);

  const knobTranslate = knobPosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, inline && styles.inlineContainer]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.toggleWrapper]}>
        {/* Left label */}
        <TouchableOpacity onPress={() => onOptionChange(options[0])}>
          <Text style={[styles.toggleText, selectedOption === options[0] && styles.toggleTextActive]}>
            {options[0]}
          </Text>
        </TouchableOpacity>

        {/* Pill with knob */}
        <TouchableOpacity
          style={[styles.pill]}
          activeOpacity={1}
          onPress={() => onOptionChange(selectedOption === options[0] ? options[1] : options[0])}
        >
          <Animated.View
            style={[
              styles.knob,
              { transform: [{ translateX: knobTranslate }] },
            ]}
          />
        </TouchableOpacity>

        {/* Right label */}
        <TouchableOpacity onPress={() => onOptionChange(options[1])}>
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
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    width: 50,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.neutral[200],
    marginHorizontal: spacing.sm,
    justifyContent: 'center',
    padding: 2,
  },
  knob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
