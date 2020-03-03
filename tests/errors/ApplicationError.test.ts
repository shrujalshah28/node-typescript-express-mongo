import { ApplicationError } from '../../src/errors';

describe('ApplicationError test suite', () => {
  test('sets default error message', () => {
    const error = new ApplicationError();
    expect(error.message).toBe('Internal server error');
  });

  test('sets 500 as default status code', () => {
    const message = 'error message';
    const error = new ApplicationError(message);
    expect(error.status).toBe(500);
  });

  test('sets default error code', () => {
    const error = new ApplicationError();
    expect(error.code).toBe('INTERNAL_SERVER_ERROR');
  });

  test('sets correct message', () => {
    const message = 'error message';
    const error = new ApplicationError(message);
    expect(error.message).toBe(message);
  });

  test('sets correct status', () => {
    const message = 'error message';
    const status = 400;
    const error = new ApplicationError(message, status);
    expect(error.status).toBe(status);
  });

  test('sets correct code', () => {
    const message = 'error message';
    const status = 400;
    const code = 'BAD_REQUEST';
    const error = new ApplicationError(message, status, code);
    expect(error.code).toBe(code);
  });
});
