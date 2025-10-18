import { obfuscateCPF } from './cpf';

describe('obfuscateCPF', () => {
  it('should obfuscate CPF with dots and dash', () => {
    const input = 'CPF 123.456.789-01';
    const expected = 'CPF XXX.XXX.XXX-XX';
    expect(obfuscateCPF(input)).toBe(expected);
  });

  it('Should show last digits when configured', () => {
    const input = 'CPF 123.456.789-01';
    const expected = 'CPF XXX.XXX.XXX-01';
    expect(obfuscateCPF(input, 2)).toBe(expected);
  });

  it('should obfuscate CPF with spaces', () => {
    const input = 'CPF 123 456 789 01';
    const expected = 'CPF XXX.XXX.XXX-XX';
    expect(obfuscateCPF(input)).toBe(expected);
  });

  it('should obfuscate CPF without separators', () => {
    const input = 'CPF 12345678901';
    const expected = 'CPF XXX.XXX.XXX-XX';
    expect(obfuscateCPF(input)).toBe(expected);
  });

  it('should handle multiple CPFs', () => {
    const input = 'CPFs 123.456.789-01 and 987.654.321-00';
    const expected = 'CPFs XXX.XXX.XXX-XX and XXX.XXX.XXX-XX';
    expect(obfuscateCPF(input)).toBe(expected);
  });
});