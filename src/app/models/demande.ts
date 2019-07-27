import {User} from './user';

export class Demande {
    user: User;
    created_at: string;
    constructor(public type: string) {}
}
