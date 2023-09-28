import { InviteeCreatorInterface } from '../../../application/interface/invitee-creator.port';
import { writeInviteeOperation } from '../operation/add-invitee-for-sheet.operation';
import * as isInviteeAlreadyExist from '../operation/is-invitee-already-exist.operation';

export const inviteeCreatorForGoogleSheet = (): InviteeCreatorInterface => ({
  async execute(message) {
    const { phone, email } = message;
    await isInviteeAlreadyExist.isAlreadyExist({ email, phone });

    await writeInviteeOperation(message);
  },
});
