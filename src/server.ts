import app from './app';
import logger from './config/logger';

const PORT = 5200;

app.listen(PORT, () => {
  logger.info(`listening on port: ${PORT}`);
});
