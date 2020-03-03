import { Request } from 'express';

import { IUserDocument } from '../models/User';

export interface IQueryRequest<Q extends {}> extends Request {
  query: Q;
}
export interface IBodyRequest<B extends object> extends Request {
  body: B;
}

export interface IAuthenticateRequest<Q extends {} = {}, B extends object = {}> extends Request {
  query: Q;
  body: B;
  user: IUserDocument;
}
