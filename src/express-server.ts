import { logger } from 'firebase-functions/v2';
import server from './server';

const PORT = 3001;
server.listen(PORT, () => {
  logger.info(`Server is listening on ${PORT}.`);
});
