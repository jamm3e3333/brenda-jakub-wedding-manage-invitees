export interface CreateInviteeMessage {
        name: string;
        surname: string;
        phone: string;
        email: string;
        isAttending: boolean;
        personDescription?: string;
        foodRestriction?: string;
        questionOrComment?: string;
}

export interface InviteeCreatorInterface {
    execute(message: CreateInviteeMessage): Promise<void>
}

