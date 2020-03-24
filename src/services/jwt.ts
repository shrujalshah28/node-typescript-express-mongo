import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import moment from 'moment';

import { Config } from '../config/config';

export class JWT {
  constructor(private config: Config) {}

  public signPayload = async (payload: string | Buffer | object): Promise<string> =>
    new Promise((resolve, reject) => {
      const signOptions: SignOptions = {
        expiresIn: moment().add(this.config.ACCESS_TOKEN_LIFETIME_MIN, 'minutes').unix(),
      };
      try {
        const token = sign(payload, this.config.SECRET_HEX, signOptions);
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });

  public verifyToken = async (token: string): Promise<object | string> =>
    new Promise((resolve, reject) => {
      const verifyOptions: VerifyOptions = {};
      try {
        const payload = verify(token, this.config.SECRET_HEX, verifyOptions);
        resolve(payload);
      } catch (error) {
        reject(error);
      }
    });
}
