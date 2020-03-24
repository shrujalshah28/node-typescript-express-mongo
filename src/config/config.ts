import nodeURL from 'url';

import { CleanEnv, str, port, url, cleanEnv, makeValidator, num } from 'envalid';

type Environment = {
  NODE_ENV: string;
  PORT: number;
  MONGO_URL: string;
  SECRET_HEX: string;
  ACCESS_TOKEN_LIFETIME_MIN: number;
  BCRYPT_N_ROUNDS: number;
  WHITELIST_ORIGINS: string[];
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_PORT: number;
  SMTP_HOST: string;
  SMTP_FROM_EMAIL: string;
};

const strHex64 = makeValidator<string>((x) => {
  if (/^[0-9a-f]{64}$/.test(x)) {
    return x;
  }
  throw new Error('Expected a hex-character string of length 64');
});

const origins = makeValidator<string[]>((x: string) => {
  let origins: string[];
  try {
    origins = JSON.parse(x);
  } catch (error) {
    throw new Error(`Invalid urls: "${x}"`);
  }
  return origins.map((origin, index) => {
    try {
      new nodeURL.URL(origin);
      return origin;
    } catch (e) {
      throw new Error(`Invalid url at position [${index}]: "${origin}"`);
    }
  });
}, 'origins');

export type Config = Readonly<Environment & CleanEnv>;

const config: Config = cleanEnv<Environment>(process.env, {
  NODE_ENV: str({ choices: ['production', 'test', 'development'] }),
  PORT: port(),
  MONGO_URL: url(),
  SECRET_HEX: strHex64(),
  ACCESS_TOKEN_LIFETIME_MIN: num(),
  BCRYPT_N_ROUNDS: num(),
  WHITELIST_ORIGINS: origins(),
  SMTP_USER: str(),
  SMTP_PASS: str(),
  SMTP_PORT: num(),
  SMTP_HOST: str(),
  SMTP_FROM_EMAIL: str(),
});

export default config;
