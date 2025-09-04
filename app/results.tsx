import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { TrendingUp, Calculator, Users } from 'lucide-react-native';
import { AppHeader } from '@/components/ui/AppHeader';
import { FinalPredictionCard } from '@/components/results/FinalPredictionCard';
import { MethodCard } from '@/components/results/MethodCard';
import { ImportantNote } from '@/components/results/ImportantNote';
import { Button } from '@/components/ui/Button';
import { colors, spacing, typography } from '@/theme/colors';

interface HeightPrediction {
  method: string;
  height: number;
  confidence: string;
  explanation: string;
  icon: any;
}

export default function ResultsPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [predictions, setPredictions] = useState<HeightPrediction[]>([]);
  const [finalPrediction, setFinalPrediction] = useState<number>(0);

  useEffect(() => {
    calculatePredictions();
  }, []);

  const calculatePredictions = () => {
    const childHeight = parseFloat(params.childHeight as string);
    const childAgeYears = parseFloat(params.childAgeYears as string);
    const childAgeMonths = parseFloat(params.childAgeMonths as string) || 0;
    const childGender = params.childGender as string;
    const heightAt2 = parseFloat(params.heightAt2 as string);
    const motherHeight = parseFloat(params.motherHeight as string);
    const fatherHeight = parseFloat(params.fatherHeight as string);

    const results: HeightPrediction[] = [];

    // Method 1: Linear Regression (simplified growth curve)
    let linearPrediction = 0;
    if (childGender === 'male') {
      const growthRemaining = (18 - childAgeYears) * 2.3;
      linearPrediction = childHeight + growthRemaining;
    } else {
      const growthRemaining = (16 - childAgeYears) * 2.1;
      linearPrediction = childHeight + growthRemaining;
    }

    results.push({
      method: 'Linear Regression',
      height: Math.round(linearPrediction * 10) / 10,
      confidence: 'High',
      explanation: `Based on current height and expected growth rate. Children typically grow at a predictable rate, with boys growing until age 18 and girls until age 16.`,
      icon: <TrendingUp size={20} color={colors.primary[500]} />
    });

    // Method 2: Parental Height Method
    const genderAdjustment = childGender === 'male' ? 5 : -5;
    const parentalPrediction = (motherHeight + fatherHeight + genderAdjustment) / 2;

    results.push({
      method: 'Parental Height',
      height: Math.round(parentalPrediction * 10) / 10,
      confidence: 'Medium',
      explanation: `Uses the formula: (Mother's height + Father's height ${childGender === 'male' ? '+ 5' : '- 5'}) ÷ 2. Genetics play a major role in determining adult height.`,
      icon: <Users size={20} color={colors.primary[500]} />
    });

    // Method 3: Height at Age 2 (if available)
    if (heightAt2) {
      const doubleHeight2Prediction = heightAt2 * 2;
      results.push({
        method: 'Height at Age 2',
        height: Math.round(doubleHeight2Prediction * 10) / 10,
        confidence: 'High',
        explanation: `The "double height at 2" rule states that a child's height at age 2 multiplied by 2 closely approximates their adult height.`,
        icon: <Calculator size={20} color={colors.primary[500]} />
      });
    }

    // Calculate final prediction (average, excluding outliers)
    const heights = results.map(r => r.height);
    const mean = heights.reduce((a, b) => a + b, 0) / heights.length;
    const validHeights = heights.filter(h => Math.abs(h - mean) <= 6);
    const finalHeight = validHeights.reduce((a, b) => a + b, 0) / validHeights.length;

    setPredictions(results);
    setFinalPrediction(Math.round(finalHeight * 10) / 10);
  };

  const formatHeight = (inches: number) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round((inches % 12) * 10) / 10;
    return `${feet}'${remainingInches}"`;
  };

  return (
    <View style={styles.container}>
      <AppHeader showBackButton onBackPress={() => router.back()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FinalPredictionCard 
          height={finalPrediction}
          formatHeight={formatHeight}
        />

        {/* Method Details */}
        <View style={styles.methodsSection}>
          <Text style={styles.methodsTitle}>Calculation Methods</Text>
          
          {predictions.map((prediction, index) => (
            <MethodCard
              key={index}
              icon={prediction.icon}
              method={prediction.method}
              height={prediction.height}
              confidence={prediction.confidence}
              explanation={prediction.explanation}
              formatHeight={formatHeight}
            />
          ))}
        </View>

        <ImportantNote />

        <Button
          title="Make Another Prediction"
          onPress={() => router.push('/')}
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
  methodsSection: {
    marginBottom: spacing.xxxl,
  },
  methodsTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[800],
    marginBottom: spacing.lg,
  },
});