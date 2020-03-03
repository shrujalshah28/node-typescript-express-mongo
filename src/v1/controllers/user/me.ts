import { RequestHandler } from 'express';

import handleErrorMiddleware from '../../../middleware/handle-error';
import { IAuthenticateRequest } from '../../../interfaces/request';

let me: RequestHandler = async (req: IAuthenticateRequest, res) => {
  const user = req.user;

  res.send({ user });
};

me = handleErrorMiddleware(me);

export default me;
