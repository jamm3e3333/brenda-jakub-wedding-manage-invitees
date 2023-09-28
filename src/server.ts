import * as express from 'express';
import {
  controllerWithReqValidation,
  createInviteeController,
  errorController,
  healthCheckController,
} from './ui/controller';
import { loggerMiddleware } from './ui/middleware/logger.middleware';
import { createInviteeSchema } from './ui/schema/request/create-invitee.request.dto';

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.all('/hello', healthCheckController);
server.post('/invitee', controllerWithReqValidation({ bodySchema: createInviteeSchema }, createInviteeController));
server.use(errorController);

export default server;
