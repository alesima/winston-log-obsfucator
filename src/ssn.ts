/**
 * Obfuscates Social Security Numbers
 * Matches XXX-XX-XXXX pattern
 * 
 * @param text The input text containing SSNs to obfuscate.
 * @param showLast Number of digits to show at the end of SSNs (default is 0).
 * @returns The text with SSNs obfuscated.
 */
export function obfuscateSSN(text: string, showLast: number = 0): string {
  const ssnRegex = /\b\d{3}[- ]\d{2}[- ]\d{4}\b/g;
  return text.replace(ssnRegex, (match) => {
    if (showLast > 0) {
      const digits = match.replace(/\D/g, '');
      const lastDigits = digits.slice(-showLast);
      const maskedLength = digits.length - showLast;
      const masked = 'X'.repeat(maskedLength) + lastDigits;
      return `${masked.slice(0, 3)}-${masked.slice(3, 5)}-${masked.slice(5)}`;
    }
    return 'XXX-XX-XXXX';
  });
}