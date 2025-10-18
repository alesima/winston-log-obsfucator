import * as winston from 'winston';
import { obfuscateFormat } from './index';

describe('obfuscateFormat', () => {
  it('should obfuscate message in winston info', () => {
    const format = obfuscateFormat();
    const info = { level: 'info', message: 'Payment with card 4111 1111 1111 1111' };
    const result = format.transform(info) as winston.Logform.TransformableInfo;
    expect(result.message).toBe('Payment with card **** **** **** ****');
  });

  it('should obfuscate additional fields', () => {
    const format = obfuscateFormat();
    const info = {
      level: 'info',
      message: 'Log message',
      userId: '123-45-6789',
      email: 'test@example.com'
    };
    const result = format.transform(info) as winston.Logform.TransformableInfo;
    expect(result.userId).toBe('XXX-XX-XXXX');
    expect(result.email).toBe('****@example.com');
  });
});