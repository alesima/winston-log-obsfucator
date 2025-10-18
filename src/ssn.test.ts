import { obfuscateSSN } from './ssn';

describe('obfuscateSSN', () => {
  it('should obfuscate SSN with dashes', () => {
    const input = 'SSN 123-45-6789';
    const expected = 'SSN XXX-XX-XXXX';
    expect(obfuscateSSN(input)).toBe(expected);
  });

  it('Should show last digits when configured', () => {
    const input = 'SSN 123-45-6789';
    const expected = 'SSN XXX-XX-6789';
    expect(obfuscateSSN(input, 4)).toBe(expected);
  });

  it('should obfuscate SSN with spaces', () => {
    const input = 'SSN 123 45 6789';
    const expected = 'SSN XXX-XX-XXXX';
    expect(obfuscateSSN(input)).toBe(expected);
  });

  it('should handle multiple SSNs', () => {
    const input = 'SSNs 123-45-6789 and 987-65-4321';
    const expected = 'SSNs XXX-XX-XXXX and XXX-XX-XXXX';
    expect(obfuscateSSN(input)).toBe(expected);
  });

  it('should not obfuscate invalid SSN formats', () => {
    const input = 'Number 123456 approved';
    expect(obfuscateSSN(input)).toBe(input);
  });
});