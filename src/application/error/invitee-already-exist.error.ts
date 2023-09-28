import { BaseApplicationError } from './base-application.error';

export class InviteeAlreadyExist extends BaseApplicationError {
  name: string;
  message: any;
  statusCode: number;

  private constructor(message: any) {
    super();
    this.message = message;
    this.name = 'ValidationError';
    this.statusCode = 400;
  }

  static create(inviteePhone: string, inviteeEmail: string) {
    return new InviteeAlreadyExist(`Invitee with email ${inviteeEmail}, and phone ${inviteePhone} alrady exist.`);
  }
}
