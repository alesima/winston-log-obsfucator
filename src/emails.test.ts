import { obfuscateEmails } from './emails';

describe('obfuscateEmails', () => {
  it('should obfuscate email addresses', () => {
    const input = 'Contact user@example.com for support';
    const expected = 'Contact ****@example.com for support';
    expect(obfuscateEmails(input)).toBe(expected);
  });

  it('should handle emails with numbers and special chars', () => {
    const input = 'Email user.name+tag123@test-domain.co.uk';
    const expected = 'Email ****************@test-domain.co.uk';
    expect(obfuscateEmails(input)).toBe(expected);
  });

  it('should handle multiple emails', () => {
    const input = 'Emails user1@test.com and user2@example.org';
    const expected = 'Emails *****@test.com and *****@example.org';
    expect(obfuscateEmails(input)).toBe(expected);
  });

  it('should not obfuscate invalid email formats', () => {
    const input = 'Text user@ test.com';
    expect(obfuscateEmails(input)).toBe(input);
  });
});