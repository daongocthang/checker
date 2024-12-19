export const isNumeric = (s: string) => !Number.isNaN(s) && !isNaN(parseFloat(s));
