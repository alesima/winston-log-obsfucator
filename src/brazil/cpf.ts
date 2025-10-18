/**
 * Obfuscates Brazilian CPF (Cadastro de Pessoas Físicas)
 * Matches XXX.XXX.XXX-XX pattern
 * 
 * @param text The input text containing CPFs to obfuscate.
 * @param showLast Number of digits to show at the end of CPFs (default is 0).
 * @returns The text with CPFs obfuscated.
 */
export function obfuscateCPF(text: string, showLast: number = 0): string {
  const cpfRegex = /\b\d{3}[\.\s\-]?\d{3}[\.\s\-]?\d{3}[\.\s\-]?\d{2}\b/g;
  return text.replace(cpfRegex, (match) => {
    if (showLast > 0) {
      const digits = match.replace(/\D/g, '');
      const lastDigits = digits.slice(-showLast);
      const maskedLength = digits.length - showLast;
      const masked = 'X'.repeat(maskedLength) + lastDigits;
      return `${masked.slice(0, 3)}.${masked.slice(3, 6)}.${masked.slice(6, 9)}-${masked.slice(9)}`;
    }
    return 'XXX.XXX.XXX-XX';
  });
}