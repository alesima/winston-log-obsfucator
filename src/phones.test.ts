import { obfuscatePhones } from './phones';

describe('obfuscatePhones', () => {
  it('should obfuscate US phone numbers completely by default', () => {
    const input = 'Call (555) 123-4567';
    const expected = 'Call (XXX) XXX-XXXX';
    expect(obfuscatePhones(input)).toBe(expected);
  });

  it('should show last 4 digits when configured', () => {
    const input = 'Call (555) 123-4567';
    const expected = 'Call (XXX) XXX-4567';
    expect(obfuscatePhones(input, 4)).toBe(expected);
  });

  it('should show last 2 digits when configured', () => {
    const input = 'Call (555) 123-4567';
    const expected = 'Call (XXX) XXX-XX67';
    expect(obfuscatePhones(input, 2)).toBe(expected);
  });

  it('should obfuscate phone numbers without parentheses', () => {
    const input = 'Call 555-123-4567';
    const expected = 'Call (XXX) XXX-XXXX';
    expect(obfuscatePhones(input)).toBe(expected);
  });

  it('should handle multiple phone numbers', () => {
    const input = 'Calls (555) 123-4567 and 888-999-0000';
    const expected = 'Calls (XXX) XXX-XXXX and (XXX) XXX-XXXX';
    expect(obfuscatePhones(input)).toBe(expected);
  });
});