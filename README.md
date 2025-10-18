# Log Obfuscator

A Winston plugin for obfuscating sensitive data in log messages, including credit cards, SSNs, emails, phone numbers, UUIDs, and Brazilian data formats.

## Installation

```bash
npm install winston-log-obfuscator
```

## Usage

This package provides a Winston format that obfuscates sensitive data such as credit card numbers, social security numbers, emails, phone numbers, UUIDs, and Brazilian-specific data.

### Basic Usage

```typescript
import * as winston from 'winston';
import { obfuscateFormat } from 'winston-log-obfuscator';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    obfuscateFormat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

logger.info('Payment with card 4111 1111 1111 1111 approved');
// Output: Payment with card **** **** **** **** approved

logger.info('User SSN is 123-45-6789');
// Output: User SSN is XXX-XX-XXXX

logger.info('Contact user@example.com for support');
// Output: Contact ****@example.com for support

logger.info('Call (555) 123-4567');
// Output: Call (XXX) XXX-XXXX

logger.info('UUID: 123e4567-e89b-12d3-a456-426614174000');
// Output: UUID: XXXX****-****-****-****-************

logger.info('Brazilian CPF: 123.456.789-01');
// Output: Brazilian CPF: XXX.XXX.XXX-XX
```

### Configuration

You can customize which types of data to obfuscate and show partial data:

```typescript
import { obfuscateFormat } from 'winston-log-obfuscator';

const logger = winston.createLogger({
  format: winston.format.combine(
    obfuscateFormat({
      creditCards: true,
      creditCardsShowLast: 4, // Show last 4 digits
      ssn: true,
      ssnShowLast: 4,
      emails: false, // Disable email obfuscation
      phones: true,
      phonesShowLast: 4,
      uuid: true,
      uuidShowLast: 4,
      regions: {
        brazil: {
          cpf: true,
          cnpj: true,
          phones: true,
          boleto: true
        }
      },
      customPatterns: [
        { pattern: /secret/g, replacement: '[REDACTED]' }
      ]
    }),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()]
});
```

### Supported Formats

#### Phone Numbers
- `(123) 456-7890`
- `123-456-7890`

#### Social Security Numbers
- `123-45-6789` (with dashes)
- `123 45 6789` (with spaces)
- SSNs without separators are not obfuscated to avoid false positives

#### Brazilian Data
- CPF: `123.456.789-01` or `12345678901`
- CNPJ: `12.345.678/0001-23` or `12345678000123`
- Phone: `+55 11 99999-9999` or `(21) 8888-8888`
- Boleto: 47-digit codes

### Obfuscation Options

- `creditCards`: Obfuscate credit card numbers (default: true)
- `creditCardsShowLast`: Number of digits to show at the end (default: 0)
- `ssn`: Obfuscate Social Security Numbers (default: true)
- `ssnShowLast`: Number of digits to show at the end (default: 0)
- `emails`: Obfuscate email addresses (default: true)
- `emailsShowFirst`: Number of characters to show at the start (default: 0)
- `phones`: Obfuscate phone numbers (default: true)
- `phonesShowLast`: Number of digits to show at the end (default: 0)
- `uuid`: Obfuscate UUIDs (default: false)
- `uuidShowLast`: Number of digits to show at the end (default: 0)
- `customPatterns`: Array of custom regex patterns to obfuscate
- `regions.brazil.cpf`: Obfuscate Brazilian CPF numbers (default: true)
- `regions.brazil.cpfShowLast`: Number of digits to show at the end (default: 0)
- `regions.brazil.cnpj`: Obfuscate Brazilian CNPJ numbers (default: true)
- `regions.brazil.cnpjShowLast`: Number of digits to show at the end (default: 0)
- `regions.brazil.phones`: Obfuscate Brazilian phone numbers (default: true)
- `regions.brazil.phonesShowLast`: Number of digits to show at the end (default: 0)
- `regions.brazil.boleto`: Obfuscate Boleto codes (default: true)
- `regions.brazil.boletoShowLast`: Number of digits to show at the end (default: 0)

## API

### `obfuscateFormat(options?: ObfuscationOptions): winston.Logform.Format`

Creates a Winston format that obfuscates sensitive data.

### `ObfuscationOptions`

```typescript
interface ObfuscationOptions {
  creditCards?: boolean;
  creditCardsShowLast?: number;
  ssn?: boolean;
  ssnShowLast?: number;
  emails?: boolean;
  emailsShowFirst?: number;
  phones?: boolean;
  phonesShowLast?: number;
  uuid?: boolean;
  uuidShowLast?: number;
  customPatterns?: Array<{ pattern: RegExp; replacement: string }>;
  regions?: {
    brazil?: {
      cpf?: boolean;
      cpfShowLast?: number;
      cnpj?: boolean;
      cnpjShowLast?: number;
      phones?: boolean;
      phonesShowLast?: number;
      boleto?: boolean;
      boletoShowLast?: number;
    };
  };
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT