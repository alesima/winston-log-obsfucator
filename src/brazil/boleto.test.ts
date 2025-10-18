import { obfuscateBoleto } from './boleto';

describe('obfuscateBoleto', () => {
  it('should obfuscate Boleto codes', () => {
    const input = 'Boleto 123456789012345678901234567890123456789012345678';
    const expected = 'Boleto XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    expect(obfuscateBoleto(input)).toBe(expected);
  });

  it('Should show last digits when configured', () => {
    const input = 'Boleto 123456789012345678901234567890123456789012345678';
    const expected = 'Boleto XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX5678';
    expect(obfuscateBoleto(input, 4)).toBe(expected);
  });

  it('should handle Boleto codes of minimum length', () => {
    const input = 'Boleto ' + '1'.repeat(44);
    const expected = 'Boleto ' + 'X'.repeat(44);
    expect(obfuscateBoleto(input)).toBe(expected);
  });

  it('should handle Boleto codes of maximum length', () => {
    const input = 'Boleto ' + '1'.repeat(48);
    const expected = 'Boleto ' + 'X'.repeat(48);
    expect(obfuscateBoleto(input)).toBe(expected);
  });

  it('should not obfuscate numbers shorter than 44 digits', () => {
    const input = 'Boleto 1234567890123456789012345678901234567890123';
    expect(obfuscateBoleto(input)).toBe(input);
  });

  it('should not obfuscate numbers longer than 48 digits', () => {
    const input = 'Boleto ' + '1'.repeat(49);
    expect(obfuscateBoleto(input)).toBe(input);
  });
});