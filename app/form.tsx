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
    childGender: '',
    heightAt2: '',
    motherHeight: '',
    fatherHeight: '',
  });

  const [heightUnits, setHeightUnits] = useState({
    childHeight: 'cm',
    heightAt2: 'cm',
    motherHeight: 'cm',
    fatherHeight: 'cm',
  });
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
            label={`Current Height`}
            value={formData.childHeight}
            onChangeText={(text) => setFormData({...formData, childHeight: text})}
            placeholder="e.g., 108"
            keyboardType="numeric"
            required
            unit={heightUnits.childHeight}
            onUnitChange={(unit) => setHeightUnits({...heightUnits, childHeight: unit})}
          />

          <AgeInputs
            years={formData.childAgeYears}
            months={formData.childAgeMonths}
            onYearsChange={(text) => setFormData({...formData, childAgeYears: text})}
            onMonthsChange={(text) => setFormData({...formData, childAgeMonths: text})}
          />

          <HeightInput
            label={`Height at Age 2`}
            value={formData.heightAt2}
            onChangeText={(text) => setFormData({...formData, heightAt2: text})}
            placeholder="e.g., 88"
            keyboardType="numeric"
            helpText="Optional - improves accuracy if known"
            unit={heightUnits.heightAt2}
            onUnitChange={(unit) => setHeightUnits({...heightUnits, heightAt2: unit})}
          />
        </FormSection>

        {/* Parent Information */}
        <FormSection 
          title="Parent Heights" 
          icon={<Ruler size={20} color={colors.success[500]} />}
        >
          <HeightInput
            label={`Mother's Height`}
            value={formData.motherHeight}
            onChangeText={(text) => setFormData({...formData, motherHeight: text})}
            placeholder="e.g., 166"
            keyboardType="numeric"
            required
            unit={heightUnits.motherHeight}
            onUnitChange={(unit) => setHeightUnits({...heightUnits, motherHeight: unit})}
          />

          <HeightInput
            label={`Father's Height`}
            value={formData.fatherHeight}
            onChangeText={(text) => setFormData({...formData, fatherHeight: text})}
            placeholder="e.g., 180"
            keyboardType="numeric"
            required
            unit={heightUnits.fatherHeight}
            onUnitChange={(unit) => setHeightUnits({...heightUnits, fatherHeight: unit})}
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