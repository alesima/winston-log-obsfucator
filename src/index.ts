import * as winston from 'winston';
import { obfuscateMessage, ObfuscationOptions } from './obfuscator';

/**
 * Creates a Winston format that obfuscates sensitive data
 * @param options Obfuscation options
 * @returns Winston format function
 */
export function obfuscateFormat(options: ObfuscationOptions = {}): winston.Logform.Format {
  return winston.format((info) => {
    if (typeof info.message === 'string') {
      info.message = obfuscateMessage(info.message, options);
    }

    // Also obfuscate any additional string fields
    for (const key in info) {
      if (typeof info[key] === 'string' && key !== 'level' && key !== 'timestamp') {
        info[key] = obfuscateMessage(info[key], options);
      }
    }

    return info;
  })();
}

export { ObfuscationOptions } from './obfuscator';