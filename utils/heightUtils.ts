// Height conversion utilities
export const convertHeight = (value: string, fromUnit: 'cm' | 'inches', toUnit: 'cm' | 'inches'): string => {
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

// Height validation utilities
export const validateHeights = (formData: Record<string, string>, fields: string[]): string | null => {
  for (const field of fields) {
    const value = formData[field];
    if (!value || isNaN(Number(value))) {
      return `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is invalid`;
    }
  }
  return null;
};

export const validateHeightRange = (height: string, fieldName: string, unit: 'cm' | 'inches'): string | null => {
  const heightNum = Number(height);
  if (heightNum < 20 || heightNum > 250) {
    return `${fieldName} is out of realistic range (20-250 ${unit})`;
  }
  return null;
};