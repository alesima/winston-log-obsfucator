import { obfuscateCNPJ } from './cnpj';

describe('obfuscateCNPJ', () => {
  it('should obfuscate CNPJ with dots, slash and dash', () => {
    const input = 'CNPJ 12.345.678/0001-23';
    const expected = 'CNPJ XX.XXX.XXX/XXXX-XX';
    expect(obfuscateCNPJ(input)).toBe(expected);
  });

  it('Should show last digits when configured', () => {
    const input = 'CNPJ 12.345.678/0001-23';
    const expected = 'CNPJ XX.XXX.XXX/XXXX-23';
    expect(obfuscateCNPJ(input, 2)).toBe(expected);
  });

  it('should obfuscate CNPJ with spaces', () => {
    const input = 'CNPJ 12 345 678 0001 23';
    const expected = 'CNPJ XX.XXX.XXX/XXXX-XX';
    expect(obfuscateCNPJ(input)).toBe(expected);
  });

  it('should obfuscate CNPJ without separators', () => {
    const input = 'CNPJ 12345678000123';
    const expected = 'CNPJ XX.XXX.XXX/XXXX-XX';
    expect(obfuscateCNPJ(input)).toBe(expected);
  });

  it('should handle multiple CNPJs', () => {
    const input = 'CNPJs 12.345.678/0001-23 and 98.765.432/0001-00';
    const expected = 'CNPJs XX.XXX.XXX/XXXX-XX and XX.XXX.XXX/XXXX-XX';
    expect(obfuscateCNPJ(input)).toBe(expected);
  });
});