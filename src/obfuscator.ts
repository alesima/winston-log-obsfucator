/**
 * Utility functions for obfuscating sensitive data in log messages
 */

/**
 * Utility functions for obfuscating sensitive data in log messages
 */

import { obfuscateCreditCards } from './credit-cards';
import { obfuscateSSN } from './ssn';
import { obfuscateEmails } from './emails';
import { obfuscatePhones } from './phones';
import { obfuscateCPF } from './brazil/cpf';
import { obfuscateCNPJ } from './brazil/cnpj';
import { obfuscateBrazilianPhones } from './brazil/phones';
import { obfuscateBoleto } from './brazil/boleto';

/**
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && typeof result[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key], source[key]);
    } else if (source[key] !== undefined) {
      result[key] = source[key];
    }
  }
  return result;
}

export interface ObfuscationOptions {
  /** Whether to obfuscate credit card numbers */
  creditCards?: boolean;
  /** Number of digits to show at the end of credit card numbers (0 to mask all) */
  creditCardsShowLast?: number;
  /** Whether to obfuscate social security numbers */
  ssn?: boolean;
  /** Number of digits to show at the end of SSN (0 to mask all) */
  ssnShowLast?: number;
  /** Whether to obfuscate email addresses */
  emails?: boolean;
  /** Number of characters to show at the start of email addresses (0 to mask all) */
  emailsShowFirst?: number;
  /** Whether to obfuscate phone numbers */
  phones?: boolean;
  /** Number of digits to show at the end of phone numbers (0 to mask all) */
  phonesShowLast?: number;
  /** Whether to obfuscate UUIDs */
  uuid?: boolean;
  /** Number of digits to show at the end of UUIDs (0 to mask all) */
  uuidShowLast?: number;
  /** Custom patterns to obfuscate */
  customPatterns?: Array<{ pattern: RegExp; replacement: string }>;
  /** Region-specific obfuscation options */
  regions?: {
    /** Brazilian data obfuscation options */
    brazil?: {
      /** Whether to obfuscate CPF (Brazilian individual taxpayer ID) */
      cpf?: boolean;
      /** Number of digits to show at the end of CPF (0 to mask all) */
      cpfShowLast?: number;
      /** Whether to obfuscate CNPJ (Brazilian company ID) */
      cnpj?: boolean;
      /** Number of digits to show at the end of CNPJ (0 to mask all) */
      cnpjShowLast?: number;
      /** Whether to obfuscate Brazilian phone numbers */
      phones?: boolean;
      /** Number of digits to show at the end of Brazilian phone numbers (0 to mask all) */
      phonesShowLast?: number;
      /** Whether to obfuscate Boleto codes */
      boleto?: boolean;
      /** Number of digits to show at the end of Boleto codes (0 to mask all) */
      boletoShowLast?: number;
    };
  };
}

/**
 * Default obfuscation options
 */
const DEFAULT_OPTIONS: ObfuscationOptions = {
  creditCards: true,
  creditCardsShowLast: 0,
  ssn: true,
  ssnShowLast: 0,
  emails: true,
  emailsShowFirst: 0,
  phones: true,
  phonesShowLast: 0,
  uuid: false,
  uuidShowLast: 0,
  customPatterns: [],
  regions: {
    brazil: {
      cpf: true,
      cpfShowLast: 0,
      cnpj: true,
      cnpjShowLast: 0,
      phones: true,
      phonesShowLast: 0,
      boleto: true,
      boletoShowLast: 0,
    },
  },
};

/**
 * Obfuscates sensitive data in a log message
 * @param message The log message to obfuscate
 * @param options Obfuscation options
 * @returns The obfuscated message
 */
export function obfuscateMessage(message: string, options: ObfuscationOptions = {}): string {
  const opts = deepMerge(DEFAULT_OPTIONS, options);
  let obfuscated = message;

  // Region-specific obfuscation first (more specific patterns)
  if (opts.regions?.brazil?.cpf) {
    obfuscated = obfuscateCPF(obfuscated, opts.regions?.brazil?.cpfShowLast);
  }

  if (opts.regions?.brazil?.cnpj) {
    obfuscated = obfuscateCNPJ(obfuscated, opts.regions?.brazil?.cnpjShowLast);
  }

  if (opts.regions?.brazil?.phones) {
    obfuscated = obfuscateBrazilianPhones(obfuscated, opts.regions?.brazil?.phonesShowLast);
  }

  if (opts.regions?.brazil?.boleto) {
    obfuscated = obfuscateBoleto(obfuscated, opts.regions?.brazil?.boletoShowLast);
  }

  if (opts.creditCards) {
    obfuscated = obfuscateCreditCards(obfuscated, opts.creditCardsShowLast);
  }

  if (opts.ssn) {
    obfuscated = obfuscateSSN(obfuscated, opts.ssnShowLast);
  }

  if (opts.emails) {
    obfuscated = obfuscateEmails(obfuscated, opts.emailsShowFirst);
  }

  if (opts.phones) {
    obfuscated = obfuscatePhones(obfuscated, opts.phonesShowLast);
  }

  if (opts.customPatterns) {
    for (const { pattern, replacement } of opts.customPatterns) {
      obfuscated = obfuscated.replace(pattern, replacement);
    }
  }

  return obfuscated;
}