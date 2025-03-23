import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http : HttpClient) { }


  SaveBooking(booking : Booking){
    return this.http.post('Booking/Save',booking);
  }

  GetByPart(part : number){
    return this.http.get<Booking[]>(`Booking/GetByPart/${part}`);
  }
}
