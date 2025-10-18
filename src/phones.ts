/**
 * Obfuscates phone numbers
 * Matches common phone number patterns
 * 
 * Examples of matched patterns:
 * - (123) 456-7890
 * - 123-456-7890
 * 
 * @param text The input text containing phone numbers to obfuscate.
 * @param showLast Number of digits to show at the end of phone numbers (default is 0).
 * @returns The text with phone numbers obfuscated.
 */
export function obfuscatePhones(text: string, showLast: number = 0): string {
  // Regex for phone numbers with separators
  const phoneRegex = /\(\d{3}\)\s*\d{3}[\s\-]\d{4}|\d{3}[\s\-]\d{3}[\s\-]\d{4}/g;
  return text.replace(phoneRegex, (match) => {
    if (showLast > 0) {
      // Extract digits and show last N
      const digits = match.replace(/\D/g, '');
      if (digits.length >= 10) {
        const lastDigits = digits.slice(-showLast);
        const maskedLength = digits.length - showLast;
        const masked = 'X'.repeat(maskedLength) + lastDigits;
        // Format as (XXX) XXX-XXXX
        return `(${masked.slice(0, 3)}) ${masked.slice(3, 6)}-${masked.slice(6)}`;
      }
    }
    return '(XXX) XXX-XXXX';
  });
}