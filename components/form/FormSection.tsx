import { View, Text, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { UnitToggle } from './UnitToggle';
import { colors, spacing } from '@/theme/colors';

import { typography } from '@/theme/typography';

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  showUnitsToggle?: boolean;
  unitsLabel?: string;
  unitsOptions?: [string, string];
  selectedUnit?: string;
  onUnitChange?: (unit: string) => void;
}

export function FormSection({ 
  title, 
  icon, 
  children, 
  headerRight,
  showUnitsToggle = false,
  unitsLabel,
  unitsOptions,
  selectedUnit,
  onUnitChange
}: FormSectionProps) {
  const defaultHeaderRight = showUnitsToggle && unitsOptions && selectedUnit && onUnitChange ? (
    <View style={styles.unitsToggleContainer}>
      <Text style={styles.unitsLabel}>{unitsLabel}</Text>
      <UnitToggle
        options={unitsOptions}
        selectedOption={selectedUnit}
        onOptionChange={onUnitChange}
        inline
      />
    </View>
  ) : null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          {icon}
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {headerRight || defaultHeaderRight}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[800],
    marginLeft: spacing.sm,
  },
  unitsToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitsLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral[600],
    marginRight: spacing.md,
  },
});