/**
 * Obfuscates credit card numbers
 * Matches common credit card patterns and replaces with **** **** **** ****
 * 
 * Examples of matched patterns:
 * - 4111 1111 1111 1111
 * - 4111-1111-1111-1111
 * - 4111111111111111
 * 
 * @param text The input text containing credit card numbers to obfuscate.
 * @param showLast Number of digits to show at the end of credit card numbers (default is 0).
 * @returns The text with credit card numbers obfuscated.
 */
export function obfuscateCreditCards(text: string, showLast: number = 0): string {
  // Regex for credit card numbers (13-16 digits, with optional spaces/dashes)
  // More specific to avoid matching other IDs like CNPJ
  const ccRegex = /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{1,4}\b/g;
  return text.replace(ccRegex, (match) => {
    // Only obfuscate if it looks like a credit card (13-16 digits)
    const digitsOnly = match.replace(/[\s\-]/g, '');
    if (digitsOnly.length >= 13 && digitsOnly.length <= 16) {
      if (showLast > 0) {
        const lastDigits = digitsOnly.slice(-showLast);
        const maskedLength = digitsOnly.length - showLast;
        const masked = 'X'.repeat(maskedLength) + lastDigits;
        // Format with spaces
        return masked.replace(/(.{4})/g, '$1 ').trim();
      } else {
        return '**** **** **** ****';
      }
    }
    return match; // Don't obfuscate if it doesn't match credit card length
  });
}