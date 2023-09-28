import { logger } from 'firebase-functions/v2';
import { InviteeAlreadyExist } from '../../../application/error/invitee-already-exist.error';
import { CreateInviteeMessage } from '../../../application/interface/invitee-creator.port';
import { getAuthForSheet, getSheet } from '../service/authorize-sheet.service';

type InviteeIdentity = Pick<CreateInviteeMessage, 'email' | 'phone'>

const checkDuplicitInvitee = (invitees: any[][], inviteeToBeCreated: InviteeIdentity): void => {
  for (const invitee of invitees) {
    if (invitee.find((value) => value === inviteeToBeCreated.email || value === inviteeToBeCreated.phone)) {
      logger.debug('Invitee alrady exist', { inviteeToBeCreated });
      throw InviteeAlreadyExist.create(inviteeToBeCreated.phone, inviteeToBeCreated.email);
    }
  }
};

export const isAlreadyExist = async (invitee: InviteeIdentity) => {
  const sheet = getSheet();
  const { data: { values } } = await sheet.spreadsheets.values.get({
    ...getAuthForSheet(),
    range: 'Sheet1',
  });
  const [_header, ...inviteesArray] = values as any[][];

  checkDuplicitInvitee(inviteesArray, invitee);
};
