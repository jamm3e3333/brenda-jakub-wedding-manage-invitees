import Ajv from 'ajv';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { Request, Response } from 'express';
import { ValidationError } from './error/validation.error';

/* eslint-disable max-len, no-control-regex */
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const PHONE_NUMBER_REGEX = /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;
/* eslint-enable max-len, no-control-regex */

const ajv = new Ajv();

ajv.addKeyword({
  keyword: 'isEmail',
  validate: (_schema: boolean, data: any) => {
    if (typeof data === 'string') {
      return EMAIL_REGEX.test(data);
    }
    return false;
  },
});

ajv.addKeyword({
  keyword: 'isPhoneNumber',
  validate: (_schema: boolean, data: any) => {
    if (typeof data === 'string') {
      return PHONE_NUMBER_REGEX.test(data);
    }
    return false;
  },
});

export interface RequestValidation {
    bodySchema?: SomeJSONSchema
    paramsSchema?: SomeJSONSchema,
}

const executeValidatoinError = (error: any, res: Response) => {
  res.status(422);
  throw ValidationError.create(error);
};

export const validateRequest =
    (data: RequestValidation, req: Request, res: Response) => {
      if (data.bodySchema) {
        const compiledBody = ajv.compile(data.bodySchema);
        compiledBody(req.body);
        if (compiledBody.errors?.length ) {
          return executeValidatoinError(compiledBody.errors, res);
        }
      }
      if (data.paramsSchema) {
        const compiledParams = ajv.compile(data.paramsSchema);
        compiledParams(req.params);
        if (compiledParams.errors?.length) {
          return executeValidatoinError(compiledParams.errors, res);
        }
      }
      return;
    };
