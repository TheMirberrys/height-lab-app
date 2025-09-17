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
import { typography } from '@/theme/typography';

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

  // Validation helpers
  const validateHeights = (fields: (keyof FormData)[]) => {
    for (const field of fields) {
      const value = formData[field];
      if (!value || isNaN(Number(value))) {
        return `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is invalid`;
      }
    }
    return null;
  };

  const validateHeightRange = (height: string, fieldName: string) => {
    const heightNum = Number(height);
    if (heightNum < 20 || heightNum > 250) {
      return `${fieldName} is out of realistic range (20-250 ${heightUnit})`;
    }
    return null;
  };

  // Generic setter to reduce repetition
  const updateFormData = useCallback((field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);
  // Convert height values when unit changes
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

  const handleSubmit = useCallback(() => {
    // Check required fields
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

    // Validate numeric fields
    const heightValidationError = validateHeights(['childHeight', 'motherHeight', 'fatherHeight']);
    if (heightValidationError) {
      Alert.alert('Invalid Input', heightValidationError);
      return;
    }

    // Validate height ranges
    const rangeValidationError = validateHeightRange(formData.childHeight, 'Child height');
    if (rangeValidationError) {
      Alert.alert('Height Out of Range', rangeValidationError);
      return;
    }

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
        {/* Child Details Section */}
        <FormSection
          title="Child Details"
          icon={<User size={20} color={colors.primary[500]} />}
          headerRight={
            <View style={styles.unitsToggleContainer}>
              <Text style={styles.unitsLabel}>Height Units</Text>
              <UnitToggle
                options={['cm', 'inches']}
                selectedOption={heightUnit}
                onOptionChange={(option) => handleHeightUnitChange(option as 'cm' | 'inches')}
                inline
                accessibilityLabel={`Select height unit, currently ${heightUnit}`}
              />
            </View>
          }
        >
          <GenderSelector
            value={formData.childGender}
            onValueChange={updateFormData('childGender')}
          />

          <HeightInput
            label="Current Height"
            value={formData.childHeight}
            onChangeText={updateFormData('childHeight')}
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
          />

          <AgeInputs
            years={formData.childAgeYears}
            months={formData.childAgeMonths}
            weeks={formData.childAgeWeeks}
            onYearsChange={updateFormData('childAgeYears')}
            onMonthsChange={updateFormData('childAgeMonths')}
            onWeeksChange={updateFormData('childAgeWeeks')}
            ageUnit={ageUnit}
            onAgeUnitChange={setAgeUnit}
          />

          <HeightInput
            label="Height at Age 2 (optional)"
            value={formData.heightAt2}
            onChangeText={updateFormData('heightAt2')}
            keyboardType="numeric"
            helpText="Improves accuracy if known"
            unit={heightUnit}
            showUnitToggle={false}
          />
        </FormSection>

        {/* Parent Information Section */}
        <FormSection title="Parent Heights" icon={<Ruler size={20} color={colors.success[500]} />}>
          <HeightInput
            label="Mother's Height"
            value={formData.motherHeight}
            onChangeText={updateFormData('motherHeight')}
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
          />

          <HeightInput
            label="Father's Height"
            value={formData.fatherHeight}
            onChangeText={updateFormData('fatherHeight')}
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
    height: 100,
  },
});
