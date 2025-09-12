import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { User, Ruler } from 'lucide-react-native';
import { AppHeader } from '@/components/ui/AppHeader';
import { FormSection } from '@/components/form/FormSection';
import { FormInput } from '@/components/form/FormInput';
import { HeightInput } from '@/components/form/HeightInput';
import { GenderSelector } from '@/components/form/GenderSelector';
import { AgeInputs } from '@/components/form/AgeInputs';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/theme/colors';

export default function FormPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    childHeight: '',
    childAgeYears: '',
    childAgeMonths: '',
    childAgeWeeks: '',
    childGender: '',
    heightAt2: '',
    motherHeight: '',
    fatherHeight: '',
  });

  const [units, setUnits] = useState({
    childHeightUnit: 'cm' as 'cm' | 'inches',
    heightAt2Unit: 'cm' as 'cm' | 'inches',
    motherHeightUnit: 'cm' as 'cm' | 'inches',
    fatherHeightUnit: 'cm' as 'cm' | 'inches',
    ageUnit: 'years-months' as 'years-months' | 'weeks',
  });

  // Helper function to convert units for calculations
  const convertToInches = (value: string, unit: 'cm' | 'inches'): number => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 0;
    return unit === 'cm' ? numValue / 2.54 : numValue;
  };

  // Helper function to convert age to years
  const convertToYears = (): number => {
    if (units.ageUnit === 'weeks') {
      const weeks = parseFloat(formData.childAgeWeeks);
      return weeks / 52.1775; // More precise weeks per year
    } else {
      const years = parseFloat(formData.childAgeYears) || 0;
      const months = parseFloat(formData.childAgeMonths) || 0;
      return years + (months / 12);
    }
  };
  const handleSubmit = () => {
    // Validate required fields
    const ageValid = units.ageUnit === 'weeks' ? formData.childAgeWeeks : formData.childAgeYears;
    if (!formData.childHeight || !ageValid || !formData.childGender || !formData.motherHeight || !formData.fatherHeight) {
      Alert.alert('Missing Information', 'Please fill in all required fields marked with *');
      return;
    }

    // Convert all heights to inches for consistent calculations
    const childHeightInches = convertToInches(formData.childHeight, units.childHeightUnit);
    const heightAt2Inches = formData.heightAt2 ? convertToInches(formData.heightAt2, units.heightAt2Unit) : 0;
    const motherHeightInches = convertToInches(formData.motherHeight, units.motherHeightUnit);
    const fatherHeightInches = convertToInches(formData.fatherHeight, units.fatherHeightUnit);
    const ageInYears = convertToYears();

    // Navigate to results with converted data
    router.push({
      pathname: '/results',
      params: {
        childHeight: childHeightInches.toString(),
        childAgeYears: ageInYears.toString(),
        childAgeMonths: '0', // Not needed since we have total years
        childGender: formData.childGender,
        heightAt2: heightAt2Inches.toString(),
        motherHeight: motherHeightInches.toString(),
        fatherHeight: fatherHeightInches.toString(),
      }
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader showBackButton onBackPress={() => router.back()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Child Information */}
        <FormSection 
          title="Child Details" 
          icon={<User size={20} color={colors.primary[500]} />}
        >
          <GenderSelector
            value={formData.childGender}
            onValueChange={(gender) => setFormData({...formData, childGender: gender})}
          />

          <HeightInput
            label="Current Height (cm)"
            value={formData.childHeight}
            onChangeText={(text) => setFormData({...formData, childHeight: text})}
            placeholder={units.childHeightUnit === 'cm' ? "e.g., 108" : "e.g., 42.5"}
            unit={units.childHeightUnit}
            onUnitChange={(unit) => setUnits({...units, childHeightUnit: unit})}
            required
          />

          <AgeInputs
            years={formData.childAgeYears}
            months={formData.childAgeMonths}
            weeks={formData.childAgeWeeks}
            onYearsChange={(text) => setFormData({...formData, childAgeYears: text})}
            onMonthsChange={(text) => setFormData({...formData, childAgeMonths: text})}
            onWeeksChange={(text) => setFormData({...formData, childAgeWeeks: text})}
            ageUnit={units.ageUnit}
            onAgeUnitChange={(unit) => setUnits({...units, ageUnit: unit})}
          />

          <HeightInput
            label="Height at Age 2 (cm)"
            value={formData.heightAt2}
            onChangeText={(text) => setFormData({...formData, heightAt2: text})}
            placeholder={units.heightAt2Unit === 'cm' ? "e.g., 88" : "e.g., 34.6"}
            unit={units.heightAt2Unit}
            onUnitChange={(unit) => setUnits({...units, heightAt2Unit: unit})}
            helpText="Optional - improves accuracy if known"
          />
        </FormSection>

        {/* Parent Information */}
        <FormSection 
          title="Parent Heights" 
          icon={<Ruler size={20} color={colors.success[500]} />}
        >
          <HeightInput
            label="Mother's Height (cm)"
            value={formData.motherHeight}
            onChangeText={(text) => setFormData({...formData, motherHeight: text})}
            placeholder={units.motherHeightUnit === 'cm' ? "e.g., 166" : "e.g., 65.4"}
            unit={units.motherHeightUnit}
            onUnitChange={(unit) => setUnits({...units, motherHeightUnit: unit})}
            required
          />

          <HeightInput
            label="Father's Height (cm)"
            value={formData.fatherHeight}
            onChangeText={(text) => setFormData({...formData, fatherHeight: text})}
            placeholder={units.fatherHeightUnit === 'cm' ? "e.g., 180" : "e.g., 70.9"}
            unit={units.fatherHeightUnit}
            onUnitChange={(unit) => setUnits({...units, fatherHeightUnit: unit})}
            required
          />
        </FormSection>

        <Button
          title="Calculate Height Prediction"
          onPress={handleSubmit}
          variant="secondary"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  content: {
    flex: 1,
    padding: spacing.xxl,
  },
});