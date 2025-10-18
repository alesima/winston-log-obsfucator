import { obfuscateBrazilianPhones } from './phones';

describe('obfuscateBrazilianPhones', () => {
  it('should obfuscate Brazilian phone numbers completely by default', () => {
    const input = 'Call +55 11 99999-9999';
    const expected = 'Call +55 XX XXXXX-XXXX';
    expect(obfuscateBrazilianPhones(input)).toBe(expected);
  });

  it('should show last 4 digits when configured', () => {
    const input = 'Call +55 11 99999-9999';
    const expected = 'Call +55 XX XXXXX-9999';
    expect(obfuscateBrazilianPhones(input, 4)).toBe(expected);
  });

  it('should obfuscate phone with parentheses', () => {
    const input = 'Call (21) 8888-8888';
    const expected = 'Call (XX) XXXX-XXXX';
    expect(obfuscateBrazilianPhones(input)).toBe(expected);
  });

  it('should obfuscate phone without country code', () => {
    const input = 'Call 11 99999-9999';
    const expected = 'Call XX XXXXX-XXXX';
    expect(obfuscateBrazilianPhones(input)).toBe(expected);
  });

  it('should handle multiple Brazilian phones', () => {
    const input = 'Calls +55 11 99999-9999 and (21) 8888-8888';
    const expected = 'Calls +55 XX XXXXX-XXXX and (XX) XXXX-XXXX';
    expect(obfuscateBrazilianPhones(input)).toBe(expected);
  });
});