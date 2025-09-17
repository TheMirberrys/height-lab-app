import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  helpText?: string;
  keyboardType?: 'default' | 'numeric';
}

export function FormInput({ 
  label, 
  value, 
  onChangeText, 
  required = false, 
  helpText,
  keyboardType = 'default' 
}: FormInputProps) {
  const handleTextChange = (text: string) => {
    if (keyboardType === 'numeric') {
      // Only allow positive integers (no decimals, no negative numbers)
      const numericText = text.replace(/[^0-9]/g, '');
      onChangeText(numericText);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {required && '*'}
      </Text>
      {helpText && <Text style={styles.helpText}>{helpText}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleTextChange}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral[700],
    marginBottom: spacing.sm,
  },
  helpText: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.neutral[800],
  },
});