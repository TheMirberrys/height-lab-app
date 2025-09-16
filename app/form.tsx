import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
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
import { UnitToggle } from '@/components/form/UnitToggle';
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

  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');

  const [ageUnit, setAgeUnit] = useState<'years-months' | 'weeks'>('years-months');

  // Convert height values when unit changes
  const convertHeight = (value: string, fromUnit: 'cm' | 'inches', toUnit: 'cm' | 'inches') => {
    if (!value || fromUnit === toUnit) return value;
    const numValue = parseInt(value);
    if (isNaN(numValue)) return '';
    
    if (fromUnit === 'cm' && toUnit === 'inches') {
      return Math.round(numValue / 2.54).toString();
    } else if (fromUnit === 'inches' && toUnit === 'cm') {
      return Math.round(numValue * 2.54).toString();
    }
    return value;
  };

  const handleHeightUnitChange = (newUnit: 'cm' | 'inches') => {
    const oldUnit = heightUnit;
    
    // Convert all height values
    setFormData(prev => ({
      ...prev,
      childHeight: convertHeight(prev.childHeight, oldUnit, newUnit),
      heightAt2: convertHeight(prev.heightAt2, oldUnit, newUnit),
      motherHeight: convertHeight(prev.motherHeight, oldUnit, newUnit),
      fatherHeight: convertHeight(prev.fatherHeight, oldUnit, newUnit),
    }));
    
    setHeightUnit(newUnit);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.childHeight || !formData.childAgeYears || !formData.childGender || !formData.motherHeight || !formData.fatherHeight) {
      Alert.alert('Missing Information', 'Please fill in all required fields marked with *');
      return;
    }

    // Navigate to results with form data
    router.push({
      pathname: '/results',
      params: formData
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <AppHeader showBackButton onBackPress={() => router.back()} />

      {/* Global Height Unit Toggle */}
      <View style={styles.globalToggleContainer}>
        <UnitToggle
          options={['cm', 'inches']}
          selectedOption={heightUnit}
          onOptionChange={(option) => handleHeightUnitChange(option as 'cm' | 'inches')}
          inline
        />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
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
            label="Current Height"
            value={formData.childHeight}
            onChangeText={(text) => setFormData({...formData, childHeight: text})}
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
          />

          <AgeInputs
            years={formData.childAgeYears}
            months={formData.childAgeMonths}
            weeks={formData.childAgeWeeks}
            onYearsChange={(text) => setFormData({...formData, childAgeYears: text})}
            onMonthsChange={(text) => setFormData({...formData, childAgeMonths: text})}
            onWeeksChange={(text) => setFormData({...formData, childAgeWeeks: text})}
            ageUnit={ageUnit}
            onAgeUnitChange={setAgeUnit}
          />

          <HeightInput
            label="Height at Age 2"
            value={formData.heightAt2}
            onChangeText={(text) => setFormData({...formData, heightAt2: text})}
            keyboardType="numeric"
            helpText="Optional - improves accuracy if known"
            unit={heightUnit}
            showUnitToggle={false}
          />
        </FormSection>

        {/* Parent Information */}
        <FormSection 
          title="Parent Heights" 
          icon={<Ruler size={20} color={colors.success[500]} />}
        >
          <HeightInput
            label="Mother's Height"
            value={formData.motherHeight}
            onChangeText={(text) => setFormData({...formData, motherHeight: text})}
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
          />

          <HeightInput
            label="Father's Height"
            value={formData.fatherHeight}
            onChangeText={(text) => setFormData({...formData, fatherHeight: text})}
            keyboardType="numeric"
            unit={heightUnit}
            showUnitToggle={false}
          />
        </FormSection>

        <Button
          title="Calculate Height Prediction"
          onPress={handleSubmit}
          variant="secondary"
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
  globalToggleContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    padding: spacing.xxl,
    flexGrow: 1,
  },
  bottomSpacer: {
    height: 100, // Extra space to ensure button is accessible above mobile navigation
  },
});