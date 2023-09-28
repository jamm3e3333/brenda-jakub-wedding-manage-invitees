import { CreateInviteeMessage, InviteeCreatorInterface } from '../interface/invitee-creator.port';

export const service = (inviteeCreator: InviteeCreatorInterface): InviteeCreatorInterface => ({
  async execute(message: CreateInviteeMessage) {
    await inviteeCreator.execute(message);
  },
});
