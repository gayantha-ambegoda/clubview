import { Club } from "./club"

export class Team {
    id: number = 0
    name : string = ''
    memberType : string = ''
    birthYear : number = 0
    clubId : number = 0
    club : Club = new Club()
}
