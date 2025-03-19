import { User } from "./user";

export class Club {
    id: number = 0;
    name: string = '';
    shortName: string = '';
    description: string = '';
    logo: string = '';
    countryCode: string = '';
    status: number = 0;
}

export class ClubRequest{
    club : Club = new Club();
    user : User = new User()
}