/**
 * Obfuscates email addresses
 * Replaces the local part with asterisks
 * 
 * @param text The input text containing email addresses to obfuscate.
 * @param showFirst Number of characters to show at the start of the local part (default is 0).
 * @returns The text with email addresses obfuscated.
 */
export function obfuscateEmails(text: string, showFirst: number = 0): string {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  return text.replace(emailRegex, (match) => {
    const [local, domain] = match.split('@');
    if (showFirst > 0) {
      const visible = local.slice(0, showFirst);
      const masked = '*'.repeat(local.length - showFirst);
      return `${visible}${masked}@${domain}`;
    }
    return '*'.repeat(local.length) + '@' + domain;
  });
}