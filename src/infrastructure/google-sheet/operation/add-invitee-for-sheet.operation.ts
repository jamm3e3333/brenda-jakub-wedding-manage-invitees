import { CreateInviteeMessage } from '../../../application/interface/invitee-creator.port';
import { getAuthForSheet, getSheet } from '../service/authorize-sheet.service';

export const writeInviteeOperation = async (invitee: CreateInviteeMessage) => {
  const sheet = getSheet();

  await sheet.spreadsheets.values.append({
    ...getAuthForSheet(),
    range: 'Sheet1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          `${invitee.name} ${invitee.surname}`,
          invitee.email,
          invitee.phone,
          invitee.isAttending ? 'no' : 'yes',
          invitee.personDescription ?? '',
          invitee.foodRestriction ?? '',
          invitee.questionOrComment ?? '',
        ],
      ],
    },
  });
};
