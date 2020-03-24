import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import { ApplicationError, NotFoundError } from './errors';
import routes from './routes';
import config from './config/config';

const app = express();

app.use(
  cors({
    origin: config.WHITELIST_ORIGINS,
    credentials: true,
  }),
);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('port', config.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.use(routes);
app.use((req, res, next) =>
  next(new NotFoundError('We are unable to locate requested API resource', 404, 'API_ENDPOINT_NOT_FOUND')),
);

app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || 500).json({
    error: config.isDevelopment ? err : undefined,
    message: err.message,
  });
});

export default app;
