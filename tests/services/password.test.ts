import { Password } from '../../src/services/password';
import config from '../../src/config/config';

const password = 'password';
const hash = '$2b$10$FeMG1txVUv/M6d.DZXwc0eMftlzN/TERjTUaz7XM/ukw1rWYD696y';

describe('test password service', () => {
  let passwordService: Password;

  beforeAll(() => {
    passwordService = new Password(config);
  });

  test('should return hash password', async (done) => {
    const hash = await passwordService.hashPassword(password);
    expect(hash).not.toEqual(password);
    done();
  });

  test('should verify hash password', async (done) => {
    const result = await passwordService.comparePassword(password, hash);
    expect(result).toBeTruthy();
    done();
  });
});
