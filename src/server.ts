import * as express from 'express';
import {
  controllerWithReqValidation,
  createInviteeController,
  errorController,
  healthCheckController,
} from './ui/controller';
import { loggerMiddleware } from './ui/middleware/logger.middleware';
import { createInviteeSchema } from './ui/schema/request/create-invitee.request.dto';
import * as cors from 'cors'

const serverCors = cors({
  origin: 'https://www.jbwedding.info',
})

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(serverCors);
server.all('/hello', healthCheckController);
server.post('/invitee', controllerWithReqValidation({ bodySchema: createInviteeSchema }, createInviteeController));
server.use(errorController);

export default server;
