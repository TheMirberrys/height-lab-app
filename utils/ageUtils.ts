// Age conversion utilities
export const convertYearsMonthsToWeeks = (years: number, months: number): number => {
  return Math.round(years * 52 + months * 4.33);
};

export const convertWeeksToYearsMonths = (weeks: number): { years: number; months: number } => {
  const totalMonths = weeks / 4.33;
  const years = Math.floor(totalMonths / 12);
  const months = Math.round(totalMonths % 12);
  return { years, months };
};

export const parseAgeValue = (value: string, unit: 'years-months' | 'weeks') => {
  if (unit === 'weeks') {
    return { weeks: parseInt(value) || 0, years: 0, months: 0 };
  } else {
    // For years-months, value should be in format "years,months" or just "years"
    const parts = value.split(',');
    const years = parseInt(parts[0]) || 0;
    const months = parseInt(parts[1]) || 0;
    return { years, months, weeks: 0 };
  }
};

export const formatAgeValue = (years: number, months: number, weeks: number, unit: 'years-months' | 'weeks'): string => {
  if (unit === 'weeks') {
    return weeks > 0 ? weeks.toString() : '';
  } else {
    if (years === 0 && months === 0) return '';
    if (months === 0) return years.toString();
    return `${years},${months}`;
  }
};

export const getAgeInYears = (ageValue: string, ageUnit: 'years-months' | 'weeks'): number => {
  if (!ageValue) return 0;
  
  if (ageUnit === 'weeks') {
    const weeks = parseInt(ageValue) || 0;
    return weeks / 52;
  } else {
    // Parse years from "years,months" format
    const parts = ageValue.split(',');
    const years = parseInt(parts[0]) || 0;
    const months = parseInt(parts[1]) || 0;
    return years + (months / 12);
  }
};