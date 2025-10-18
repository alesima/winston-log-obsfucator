import { obfuscateUUIDs } from './uuid';

describe('obfuscateUUIDs', () => {
  it('should obfuscate standard UUIDs', () => {
    const input = 'User ID: 123e4567-e89b-12d3-a456-426614174000';
    const expected = 'User ID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';
    expect(obfuscateUUIDs(input)).toBe(expected);
  });

  it('Should show last digits when configured', () => {
    const input = 'User ID: 123e4567-e89b-12d3-a456-426614174000';
    const expected = 'User ID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX4000';
    expect(obfuscateUUIDs(input, 4)).toBe(expected);
  });

  it('should obfuscate UUIDs in uppercase', () => {
    const input = 'User ID: 123E4567-E89B-12D3-A456-426614174000';
    const expected = 'User ID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';
    expect(obfuscateUUIDs(input)).toBe(expected);
  });

  it('should handle multiple UUIDs in the same string', () => {
    const input = 'IDs: 123e4567-e89b-12d3-a456-426614174000 and 987f6543-e21b-32d3-b456-123456789abc';
    const expected = 'IDs: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX and XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';
    expect(obfuscateUUIDs(input)).toBe(expected);
  });

  it('should not obfuscate invalid UUID formats', () => {
    const input = 'Invalid ID: 123e4567-e89b-12d3-a456-42661417400Z';
    expect(obfuscateUUIDs(input)).toBe(input);
  });
});