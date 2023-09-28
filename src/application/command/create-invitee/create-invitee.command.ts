export interface CreateInviteeCommand {
    name: string;
    surname: string;
    phone: string;
    email: string;
    isAttending: boolean;
    personDescription?: string;
    foodRestriction?: string;
    questionOrComment?: string;
}
