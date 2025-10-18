/**
 * Obfuscates UUIDs in the given text.
 * By default, it masks the entire UUID. If showLast is greater than 0,
 * it reveals the specified number of characters at the end of the UUID.
 *
 * @param text - The input text containing UUIDs to obfuscate.
 * @param showLast - Number of characters to show at the end of the UUID (default is 0).
 * @returns The text with UUIDs obfuscated.
 */
export function obfuscateUUIDs(text: string, showLast: number = 0): string {
  const uuidRegex = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;
  return text.replace(uuidRegex, (match) => {
    if (showLast > 0) {
      const digits = match.replace(/-/g, '');
      const lastDigits = digits.slice(-showLast);
      const maskedLength = digits.length - showLast;
      const masked = 'X'.repeat(maskedLength) + lastDigits;
      return `${masked.slice(0, 8)}-${masked.slice(8, 12)}-${masked.slice(12, 16)}-${masked.slice(16, 20)}-${masked.slice(20)}`;
    }
    return 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';
  });
}