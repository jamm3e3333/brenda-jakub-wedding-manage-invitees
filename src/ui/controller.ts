import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as logger from 'firebase-functions/logger';
import { createInviteeHandler } from '../application/command/create-invitee/create-invitee.handler';
import { BaseApplicationError } from '../application/error/base-application.error';
import { validateRequest, RequestValidation } from './ajv.validator';
import { ValidationError } from './error/validation.error';

export const healthCheckController: RequestHandler = (_req, res) => {
  res.status(200).send({ message: 'hello' });
};

export const createInviteeController: RequestHandler = async (req, _res, _next) => {
  await createInviteeHandler(req.body);
};

export const controllerWithReqValidation = <TData>(
  validationSchema: RequestValidation,
  controller: (req: Request, res: Response, next: NextFunction
) => Promise<TData> | TData) => async (req:Request, res: Response, next: NextFunction) => {
    try {
      validateRequest(validationSchema, req, res);

      const data = await controller(req, res, next);

      return res.status(201).send({ ...(data && data) });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(422);
      }
      return next(error);
    }
  };

export const errorController = ( error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { stack, ...loggableError } = error;

  logger.error({ error });

  const statusCode = (error as BaseApplicationError)?.statusCode ?
    (error as BaseApplicationError).statusCode :
    String(res.statusCode).startsWith('4') ?
      res.statusCode :
      500;

  res
    .status(statusCode)
    .send(loggableError);
};
