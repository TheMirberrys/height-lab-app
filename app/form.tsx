// FormPage.tsx
import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Ruler } from 'lucide-react-native';
import { AppHeader } from '@/components/ui/AppHeader';
import { FormSection } from '@/components/form/FormSection';
import { HeightInput } from '@/components/form/HeightInput';
import { GenderSelector } from '@/components/form/GenderSelector';
import { AgeInputs } from '@/components/form/AgeInputs';
import { Button } from '@/components/ui/Button';
import { UnitToggle } from '@/components/form/UnitToggle';
import { colors, spacing } from '@/theme/colors';
import { typography } from '@/theme/typography'; // ✅ fixed import

type FormData = {
  childHeight: string;
  childAgeYears: string;
  childAgeMonths: string;
  childAgeWeeks: string;
  childGender: string;
  heightAt2: string;
  motherHeight: string;
  fatherHeight: string;
};

export default function FormPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    childHeight: '',
    childAgeYears: '',
    childAgeMonths: '',
    childAgeWeeks: '',
    childGender: '',
    heightAt2: '',
    motherHeight: '',
    fatherHeight: '',
  });

  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');
  const [ageUnit, setAgeUnit] = useState<'years-months' | 'weeks'>('years-months');

  // Convert height values when unit changes (support decimals)
  const convertHeight = (value: string, fromUnit: 'cm' | 'inches', toUnit: 'cm' | 'inches') => {
    if (!value || fromUnit === toUnit) return value;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    if (fromUnit === 'cm' && toUnit === 'inches') {
      return (numValue / 2.54).toFixed(1).replace(/\.0$/, '');
    } else if (fromUnit === 'inches' && toUnit === 'cm') {
      return (numValue * 2.54).toFixed(1).replace(/\.0$/, '');
    }
    return value;
  };

  const handleHeightUnitChange = useCallback(
    (newUnit: 'cm' | 'inches') => {
      const oldUnit = heightUnit;
      // Convert all height values using functional update
      setFormData((prev) => ({
        ...prev,
        childHeight: convertHeight(prev.childHeight, oldUnit, newUnit),
        heightAt2: convertHeight(prev.heightAt2, oldUnit, newUnit),
        motherHeight: convertHeight(prev.motherHeight, oldUnit, newUnit),
        fatherHeight: convertHeight(prev.fatherHeight, oldUnit, newUnit),
      }));
      setHeightUnit(newUnit);
    },
    [heightUnit],
  );

  // helper for numeric validation
  const isNumeric = (v: string) => v !== '' && !isNaN(Number(v));

  const handleSubmit = useCallback(() => {
    // Basic presence checks
    if (
      !formData.childHeight ||
      !formData.childAgeYears ||
      !formData.childGender ||
      !formData.motherHeight ||
      !formData.fatherHeight
    ) {
      Alert.alert('Missing Information', 'Please fill in all required fields marked with *');
      return;
    }

    // Numeric validation for height fields
    if (!isNumeric(formData.childHeight) || !isNumeric(formData.motherHeight) || !isNumeric(formData.fatherHeight)) {
      Alert.alert('Invalid input', 'Please enter numeric values for heights.');
      return;
    }

    // Optional: validate sensible ranges (example)
    const childHeightNum = Number(formData.childHeight);
    if (childHeightNum < 20 || childHeightNum > 250) {
      Alert.alert('Height out of range', 'Please enter a realistic child height.');
      return;
    }

    // Navigate to results with form data (ensure the receiving route can parse these)
    router.push({
      pathname: '/results',
      params: formData,
    });
  }, [formData, router]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <AppHeader showBackButton onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Child Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithToggle}>
            <View style={styles.sectionHeader}>
              <User size={20} color={colors.primary[500]} />
              <Text style={styles.sectionTitle}>Child Details</Text>
            </View>

            <View style={styles.unitsToggleContainer}>
              <Text style={styles.unitsLabel}>Height Units</Text>
              <UnitToggle
                options={['cm', 'inches']}
                selectedOption={heightUnit}
                onOptionChange={(option) => handleHeightUnitChange(option as 'cm' | 'inches')}
                inline
                accessibilityLabel="Height unit toggle"
              />
            </View>
          </View>

          <GenderSelector
            value={formData.childGender}
            onValueChange={(gender) =>
              setFormData((prev) => ({ ...prev, childGender: gender }))
            }
          />

          <HeightInput
            label="Current Height"
            value={formData.childHeight}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, childHeight: text }))}
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
          />

          <AgeInputs
            years={formData.childAgeYears}
            months={formData.childAgeMonths}
            weeks={formData.childAgeWeeks}
            onYearsChange={(text) => setFormData((prev) => ({ ...prev, childAgeYears: text }))}
            onMonthsChange={(text) => setFormData((prev) => ({ ...prev, childAgeMonths: text }))}
            onWeeksChange={(text) => setFormData((prev) => ({ ...prev, childAgeWeeks: text }))}
            ageUnit={ageUnit}
            onAgeUnitChange={setAgeUnit}
          />

          <HeightInput
            label="Height at Age 2"
            value={formData.heightAt2}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, heightAt2: text }))}
            keyboardType="numeric"
            helpText="Optional - improves accuracy if known"
            unit={heightUnit}
            showUnitToggle={false}
          />
        </View>

        {/* Parent Information */}
        <FormSection title="Parent Heights" icon={<Ruler size={20} color={colors.success[500]} />}>
          <HeightInput
            label="Mother's Height"
            value={formData.motherHeight}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, motherHeight: text }))}
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
          />

          <HeightInput
            label="Father's Height"
            value={formData.fatherHeight}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, fatherHeight: text }))}
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
          />
        </FormSection>

        <Button
          title="Calculate Height Prediction"
          onPress={handleSubmit}
          variant="secondary"
          accessibilityLabel="Calculate height prediction"
          testID="calculate-button"
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  scrollContainer: {
    padding: spacing.xxl,
    flexGrow: 1,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionHeaderWithToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  sectionHeader: {
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
  bottomSpacer: {
    height: 100, // Extra space to ensure button is accessible above mobile navigation
  },
});
