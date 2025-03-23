export class Booking {
    id : number = 0
    fieldPartId : number = 0
    date : string  = new Date().toISOString()
    startTime : string = new Date().toISOString()
    endTime : string = new Date().toISOString()
    status : string = ''
    userId : number = 0
}
