import { hash, compare } from 'bcrypt';

import { Config } from '../config/config';

export class Password {
  constructor(private config: Config) {}

  public hashPassword = async (password: string | Buffer | object) => await hash(password, this.config.BCRYPT_N_ROUNDS);
  public comparePassword = async (password: string | Buffer | object, hash: string) => await compare(password, hash);
}
