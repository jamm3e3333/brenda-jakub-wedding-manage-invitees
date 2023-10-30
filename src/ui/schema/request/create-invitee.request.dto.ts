import { SomeJSONSchema } from 'ajv/dist/types/json-schema';

export const createInviteeSchema: SomeJSONSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    surname: { type: 'string' },
    phone: { 'type': 'string' },
    email: { 'type': 'string', 'isEmail': true },
    isAttending: { type: 'boolean' },
    personDescription: { type: 'string' },
    foodRestriction: { type: 'string' },
    questionOrComment: { type: 'string' },

  },
  required: ['name', 'surname', 'phone', 'email', 'isAttending', 'personDescription'],
  additionalProperties: false,
};
