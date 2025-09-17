import { View, Text, StyleSheet } from 'react-native';
import { Info } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '@/theme/colors';
import { typography } from '@/theme/typography';

export function ImportantNote() {
  return (
    <View style={styles.noteCard}>
      <Info size={20} color={colors.warning[500]} />
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle}>Important Note</Text>
        <Text style={styles.noteText}>
          Height predictions are estimates based on statistical models. Actual adult height can vary due to 
          nutrition, health conditions, and other environmental factors. Consult a pediatrician for medical concerns.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: colors.warning[50],
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    marginBottom: spacing.xxxl,
    borderWidth: 1,
    borderColor: colors.warning[100],
  },
  noteContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  noteTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.warning[700],
    marginBottom: 4,
  },
  noteText: {
    fontSize: typography.sizes.sm,
    color: colors.warning[700],
    lineHeight: 18,
  },
});