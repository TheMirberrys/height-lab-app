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
import { convertHeight, validateHeights, validateHeightRange } from '@/utils/heightUtils';
import { getAgeInYears } from '@/utils/ageUtils';

// Helper function to check if age is greater than 2 years 6 months
const isAgeGreaterThan2Years6Months = (ageValue: string, ageUnit: 'years-months' | 'weeks'): boolean => {
  const ageInYears = getAgeInYears(ageValue, ageUnit);
  return ageInYears > 2.5; // 2 years 6 months = 2.5 years
};

type FormData = {
  childHeight: string;
  childAge: string; // Unified age field
  childGender: string;
  heightAt2: string;
  motherHeight: string;
  fatherHeight: string;
};

type ValidationErrors = {
  [K in keyof FormData]?: boolean;
};
export default function FormPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    childHeight: '',
    childAge: '',
    childGender: '',
    heightAt2: '',
    motherHeight: '',
    fatherHeight: '',
  });

  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');
  const [ageUnit, setAgeUnit] = useState<'years-months' | 'weeks'>('years-months');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Check if we should show the height at age 2 field
  const shouldShowHeightAt2 = isAgeGreaterThan2Years6Months(formData.childAge, ageUnit);

  // Generic setter to reduce repetition
  const updateFormData = useCallback((field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: false }));
    }
  }, []);

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
    // Check required fields and set validation errors
    const requiredFields: (keyof FormData)[] = ['childHeight', 'childAge', 'childGender'];
    const errors: ValidationErrors = {};
    let hasErrors = false;

    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = true;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setValidationErrors(errors);
      return;
    }

    // Validate numeric fields
    const heightFields = ['childHeight'];
    if (formData.motherHeight) heightFields.push('motherHeight');
    if (formData.fatherHeight) heightFields.push('fatherHeight');
    
    const heightValidationError = validateHeights(formData, heightFields);
    if (heightValidationError) {
      Alert.alert('Invalid Input', heightValidationError);
      return;
    }

    // Validate height ranges
    const rangeValidationError = validateHeightRange(formData.childHeight, 'Child height', heightUnit);
    if (rangeValidationError) {
      Alert.alert('Height Out of Range', rangeValidationError);
      return;
    }

    router.push({
      pathname: '/results',
      params: {
        ...formData,
        childAgeYears: getAgeInYears(formData.childAge, ageUnit).toString(), // Convert for results page
      },
    });
  }, [formData, router, ageUnit]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <AppHeader showBackButton onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {showErrorMessage && (
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>Please fill in all required fields</Text>
          </View>
        )}

        {/* Child Details Section */}
        <FormSection
          title="Child Details"
          icon={<User size={20} color={colors.primary[500]} />}
          showUnitsToggle
          unitsLabel="Height Units"
          unitsOptions={['cm', 'inches']}
          selectedUnit={heightUnit}
          onUnitChange={(unit) => handleHeightUnitChange(unit as 'cm' | 'inches')}
        >
          <GenderSelector
            value={formData.childGender}
            onValueChange={updateFormData('childGender')}
            hasError={validationErrors.childGender}
          />

          <HeightInput
            label="Current Height"
            value={formData.childHeight}
            onChangeText={updateFormData('childHeight')}
            required
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
            hasError={validationErrors.childHeight}
          />

          <AgeInputs
            value={formData.childAge}
            onValueChange={updateFormData('childAge')}
            ageUnit={ageUnit}
            onAgeUnitChange={setAgeUnit}
            hasError={validationErrors.childAge}
          />

          {shouldShowHeightAt2 && (
            <HeightInput
              label="Height at Age 2 (optional)"
              value={formData.heightAt2}
              onChangeText={updateFormData('heightAt2')}
              keyboardType="numeric"
              helpText="Improves accuracy if known"
              unit={heightUnit}
              showUnitToggle={false}
            />
          )}
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
            helpText="Improves accuracy if known"
          />

          <HeightInput
            label="Father's Height"
            value={formData.fatherHeight}
            onChangeText={updateFormData('fatherHeight')}
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
            helpText="Improves accuracy if known"
          />
        </FormSection>

        <Button
          title="Calculate Height Prediction"
          onPress={handleSubmit}
          variant="secondary"
          accessibilityLabel="Calculate height prediction"
          testID="calculate-button"
        />
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
    paddingBottom: 100,
  },
});
