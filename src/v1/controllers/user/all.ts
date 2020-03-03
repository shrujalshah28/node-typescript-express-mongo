import { RequestHandler } from 'express';

import handleErrorMiddleware from '../../../middleware/handle-error';
import User from '../../../models/User';
import { IQueryRequest } from '../../../interfaces/request';

let all: RequestHandler = async (req: IQueryRequest<{ role?: string }>, res) => {
  let query = {};

  const role = req.query.role;
  if (role) {
    query = { ...query, role };
  }
  const users = await User.find(query);
  res.send({ users });
};

all = handleErrorMiddleware(all);

export default all;
