import { Club } from "./club"

export class Field {
    id : number = 0
    name : string = ''
    address : string = ''
    description : string = ''
    facilities : string = ''
    deckType : string = ''
    hasLighting : boolean = false
    hasHeating : boolean = false
    clubId : number = 0
    club : Club = new Club()
}
