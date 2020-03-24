import app from './app';
import MongoConnection from './db/mongo/connection';
import logger from './logger';
import config from './config/config';

const mongoConnection = new MongoConnection(config.MONGO_URL);

if (config.MONGO_URL == undefined) {
  logger.log({
    level: 'error',
    message: 'MONGO_URL not specified in environment',
  });
  process.exit(1);
  process.stdin.emit('SIGINT');
} else {
  mongoConnection.connect(() => {
    app.listen(app.get('port'), (): void => {
      logger.info(`*\t🌏 Express server started at http://localhost:${app.get('port')}\t\t*`);
      if (config.isDevelopment) {
        logger.debug(`*\t⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/__VERSION__/dev/api-docs\t*`);
      }
    });
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('\nGracefully shutting down');
  mongoConnection.close((err) => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err,
      });
    }
    process.exit(0);
  });
});
