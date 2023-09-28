import { RequestHandler } from 'express';
import { logger } from 'firebase-functions/v2';

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  logger.info({
    request: {
      params: {
        ...req.params,
        ...req.query,
        ...req.headers,
      },
      body: req.body,
      ip: req.ip,
    },
  });
  next();
  logger.info({
    response: {
      body: res.get('data'),
      headers: res.getHeaders(),
      statusCode: res.statusCode,
    },
  });
};
