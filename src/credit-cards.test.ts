import { obfuscateCreditCards } from './credit-cards';

describe('obfuscateCreditCards', () => {
  it('should obfuscate credit card numbers completely by default', () => {
    const input = 'Card 4111111111111111 approved';
    const expected = 'Card **** **** **** **** approved';
    expect(obfuscateCreditCards(input)).toBe(expected);
  });

  it('should show last 4 digits when configured', () => {
    const input = 'Card 4111111111111111 approved';
    const expected = 'Card XXXX XXXX XXXX 1111 approved';
    expect(obfuscateCreditCards(input, 4)).toBe(expected);
  });

  it('should show last 2 digits when configured', () => {
    const input = 'Card 4111111111111111 approved';
    const expected = 'Card XXXX XXXX XXXX XX11 approved';
    expect(obfuscateCreditCards(input, 2)).toBe(expected);
  });

  it('should not obfuscate numbers that are not credit card length', () => {
    const input = 'Number 123456789 approved';
    expect(obfuscateCreditCards(input)).toBe(input);
  });

  it('should handle multiple credit cards', () => {
    const input = 'Cards 4111111111111111 and 5555555555554444';
    const expected = 'Cards **** **** **** **** and **** **** **** ****';
    expect(obfuscateCreditCards(input)).toBe(expected);
  });

  it('should handle credit cards with spaces and dashes', () => {
    const input = 'Card 4111-1111-1111-1111 approved';
    const expected = 'Card **** **** **** **** approved';
    expect(obfuscateCreditCards(input)).toBe(expected);
  });
});