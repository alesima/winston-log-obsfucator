/**
 * Obfuscates Boleto codes
 * Boleto codes are typically 44-48 digits
 * 
 * @param text The input text containing Boleto codes to obfuscate.
 * @param showLast Number of digits to show at the end of Boleto codes (default is 0).
 * @returns The text with Boleto codes obfuscated.
 */
export function obfuscateBoleto(text: string, showLast: number = 0): string {
  const boletoRegex = /\b\d{44,48}\b/g;
  return text.replace(boletoRegex, (match) => {
    if (showLast > 0) {
      const digits = match.replace(/\D/g, '');
      const lastDigits = digits.slice(-showLast);
      const maskedLength = digits.length - showLast;
      const masked = 'X'.repeat(maskedLength) + lastDigits;
      return masked;
    }
    return 'X'.repeat(match.length);
  });
}