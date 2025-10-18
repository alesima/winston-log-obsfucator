import { obfuscateMessage, ObfuscationOptions } from './obfuscator';

describe('obfuscateMessage', () => {
  it('should obfuscate credit card numbers', () => {
    const input = 'Payment with card 4111 1111 1111 1111 approved';
    const expected = 'Payment with card **** **** **** **** approved';
    expect(obfuscateMessage(input)).toBe(expected);
  });

  it('should obfuscate SSN', () => {
    const input = 'User SSN is 123-45-6789';
    const expected = 'User SSN is XXX-XX-XXXX';
    expect(obfuscateMessage(input)).toBe(expected);
  });

  it('should obfuscate emails', () => {
    const input = 'Contact user@example.com for support';
    const expected = 'Contact ****@example.com for support';
    expect(obfuscateMessage(input)).toBe(expected);
  });

  it('should obfuscate phone numbers', () => {
    const input = 'Call (555) 123-4567';
    const expected = 'Call (XXX) XXX-XXXX';
    expect(obfuscateMessage(input)).toBe(expected);
  });

  it('should handle custom patterns', () => {
    const options: ObfuscationOptions = {
      customPatterns: [{ pattern: /secret/g, replacement: '[REDACTED]' }]
    };
    const input = 'The secret code is 123';
    const expected = 'The [REDACTED] code is 123';
    expect(obfuscateMessage(input, options)).toBe(expected);
  });

  it('should respect options to disable obfuscation', () => {
    const options: ObfuscationOptions = {
      creditCards: false,
      emails: false
    };
    const input = 'Card 4111111111111111 and user@test.com';
    expect(obfuscateMessage(input, options)).toBe(input);
  });

  it('should show last digits for credit cards when configured', () => {
    const options: ObfuscationOptions = {
      creditCardsShowLast: 4
    };
    const input = 'Card 4111111111111111';
    const expected = 'Card XXXX XXXX XXXX 1111';
    expect(obfuscateMessage(input, options)).toBe(expected);
  });

  describe('Brazilian data obfuscation', () => {
    it('should obfuscate CPF by default', () => {
      const input = 'User CPF is 123.456.789-01';
      const expected = 'User CPF is XXX.XXX.XXX-XX';
      expect(obfuscateMessage(input)).toBe(expected);
    });

    it('should obfuscate CNPJ by default', () => {
      const input = 'Company CNPJ is 12.345.678/0001-23';
      const expected = 'Company CNPJ is XX.XXX.XXX/XXXX-XX';
      expect(obfuscateMessage(input)).toBe(expected);
    });

    it('should obfuscate Brazilian phone numbers by default', () => {
      const input = 'Call +55 11 99999-9999 or (21) 8888-8888';
      const expected = 'Call +55 XX XXXXX-XXXX or (XX) XXXX-XXXX';
      expect(obfuscateMessage(input)).toBe(expected);
    });

    it('should respect options to disable Brazilian obfuscation', () => {
      const options: ObfuscationOptions = {
        regions: {
          brazil: {
            cpf: false,
            cnpj: false,
            phones: false,
            boleto: false,
          },
        },
      };
      const input = 'CPF 123.456.789-01, CNPJ 12.345.678/0001-23, Phone +55 11 99999-9999, Boleto 123456789012345678901234567890123456789012345678';
      expect(obfuscateMessage(input, options)).toBe(input);
    });

    it('should handle CPF without separators', () => {
      const input = 'CPF 12345678901';
      const expected = 'CPF XXX.XXX.XXX-XX';
      expect(obfuscateMessage(input)).toBe(expected);
    });

    it('should handle CNPJ without separators', () => {
      const input = 'CNPJ 12345678000123';
      const expected = 'CNPJ XX.XXX.XXX/XXXX-XX';
      expect(obfuscateMessage(input)).toBe(expected);
    });

    it('should obfuscate Boleto codes by default', () => {
      const input = 'Boleto: 123456789012345678901234567890123456789012345678';
      const expected = 'Boleto: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      expect(obfuscateMessage(input)).toBe(expected);
    });
  });
});