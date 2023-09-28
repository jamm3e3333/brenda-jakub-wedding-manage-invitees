import { CreateInviteeCommand } from './create-invitee.command';
import {
  inviteeCreatorForGoogleSheet,
} from '../../../infrastructure/google-sheet/service/invitee-creator-for-g-sheet.service';
import * as createInviteeService from '../../service/invitee-creator.service';


export const createInviteeHandler = async (command: CreateInviteeCommand): Promise<void> => {
  await createInviteeService.service(
    inviteeCreatorForGoogleSheet()
  ).execute(command);
};
