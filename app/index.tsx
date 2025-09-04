import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Calculator, Users } from 'lucide-react-native';
import { AppHeader } from '@/components/ui/AppHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { MethodCard } from '@/components/landing/MethodCard';
import { AccuracyCard } from '@/components/landing/AccuracyCard';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/theme/colors';

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/form');
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <HeroSection onGetStarted={handleGetStarted} />

        {/* How it works */}
        <View style={styles.section}>
          <MethodCard
            icon={<Calculator size={20} color={colors.success[500]} />}
            title="Linear Regression"
            description="Advanced statistical analysis of growth patterns and curves to project future height"
          />

          <MethodCard
            icon={<Calculator size={20} color={colors.success[500]} />}
            title="Double Height Rule"
            description="Traditional paediatric method: height at age of 2 doubled for adult prediction"
          />

          <MethodCard
            icon={<Users size={20} color={colors.success[500]} />}
            title="Parental Height"
            description="Genetic potential calculation based on both biological parent's heights"
          />
        </View>

        <Button
          title="Start Prediction"
          onPress={handleGetStarted}
        />

        <AccuracyCard />
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: spacing.xxl,
    paddingTop: spacing.lg,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
});