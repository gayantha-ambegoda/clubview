import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UiComponentModule } from '../../ui-component/ui-component.module';
import { addDays,addHours,addMinutes,startOfDay } from 'date-fns'
import { FieldsService } from '../../services/fields.service';
import { Field } from '../../models/fields';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FieldPartsService } from '../../services/field-parts.service';
import { FieldPart } from '../../models/field-part';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking.service';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-fields',
  imports: [
    UiComponentModule,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,MatSelectModule,MatToolbarModule,
    ReactiveFormsModule,MatCheckboxModule,MatTimepickerModule,MatDatepickerModule,MatCardModule,MatSidenavModule,
    MatIconModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.css'
})
export class FieldsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute)
  private readonly fieldService = inject(FieldsService)
  private readonly fieldPartService = inject(FieldPartsService)
  private readonly bookingService = inject(BookingService)
  selectedField : number = 0
  calendarEvents : CalendarEvent[] = []
  fielddetails : Field = new Field()
  fieldParts : FieldPart[] = []
  bookingsForPart : Booking[] = []


  partName = new FormControl('')
  isAutoApprove = new FormControl(false)
  selectedPart = new FormControl(0)
  bookingDate = new FormControl(new Date())
  startTime = new FormControl(new Date())
  endTime = new FormControl(new Date())

  ngOnInit(): void {
    this.selectedField = Number(this.route.snapshot.paramMap.get('id'));
    this.fieldService.GetField(this.selectedField).subscribe({
      next:(response)=>{
        this.fielddetails = response
      },error:(error) => {
        console.error(error)
      }
    })
    this.GetFieldParts()
    this.calendarEvents.push({
      start: addHours(startOfDay(new Date('2025-03-20T12:30:00.000Z')), new Date('2025-03-20T12:30:00.000Z').getHours()),
      end: addHours(startOfDay(new Date('2025-03-20T16:30:00.000Z')), new Date('2025-03-20T16:30:00.000Z').getHours()),
      title: 'And another',
      color: {primary: '#e3bc08', secondary: '#FDF1BA'}
    })
  }

  onSelectChange(){
    this.GetBookingsByPart()
  }
  ProcessBookingsToCalendar(){
    console.log(this.bookingsForPart[0].date)
    console.log(this.bookingsForPart[0].date)
    this.calendarEvents = []
    this.bookingsForPart.forEach(booking => {
      this.calendarEvents.push({
        start: addMinutes(addHours(startOfDay(new Date(booking.date)), new Date(booking.startTime).getHours()),new Date(booking.startTime).getMinutes()),
        end: addMinutes(addHours(startOfDay(new Date(booking.date)), new Date(booking.endTime).getHours()), new Date(booking.endTime).getMinutes()),
        title: booking.id.toString(),
        color: {primary: '#e3bc08', secondary: '#FDF1BA'}
      })
    });
  }
  GetBookingsByPart(){
    var partDet = this.selectedPart.value;
    if (partDet != null) {
      this.bookingService.GetByPart(partDet).subscribe({
        next: (response) => {
          this.bookingsForPart = response.map(booking => {
            // Convert UTC date and time to local time
            const localStartTime = new Date(booking.startTime + 'Z'); // Append 'Z' to treat as UTC
            const localEndTime = new Date(booking.endTime + 'Z'); // Append 'Z' to treat as UTC
            console.log(localStartTime);
            console.log(booking.startTime);
            return {
              id: booking.id,
              fieldPartId: booking.fieldPartId,
              status: booking.status,
              userId: booking.userId,
              date: booking.date, // Keep as string
              startTime: localStartTime.toISOString(),
              endTime: localEndTime.toISOString()
            };
          });
          this.ProcessBookingsToCalendar();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  GetFieldParts(){
    this.fieldPartService.GetFieldParts(this.selectedField).subscribe({
      next:(response)=>{
        this.fieldParts = response
      }, error:(error)=>{
        console.error(error)
      }
    })
  }

  CreatePart(){
    this.fieldPartService.CreatePart({
      id: 0,
      name: this.partName.value,
      autoApprove: this.isAutoApprove.value,
      fieldId: this.selectedField,
      field: this.fielddetails
    } as FieldPart).subscribe({
      next:(response)=>{
        console.log(response)
        this.GetFieldParts()
      }, error:(error)=>{
        console.error(error)
      }
    })
  }

  BookNow(){
    var bookYr: number = this.bookingDate.value?.getFullYear() ?? 2025;
    var bookMth: number = this.bookingDate.value?.getMonth() ?? 3;
    var bookDay: number = (this.bookingDate.value?.getDate() ?? 2) + 1;

    var startTime = new Date(
      bookYr,
      bookMth,
      bookDay,
      this.startTime.value?.getHours() ?? 0,
      this.startTime.value?.getMinutes() ?? 0
    ).toISOString();

    var endTime = new Date(
      bookYr,
      bookMth,
      bookDay,
      this.endTime.value?.getHours() ?? 0,
      this.endTime.value?.getMinutes() ?? 0
    ).toISOString();

    var request = {
      id: 0,
      fieldPartId: this.selectedPart.value,
      date: new Date(bookYr, bookMth, bookDay).toISOString(),
      startTime: startTime,
      endTime: endTime,
      status: 'Pending',
      userId: 0
    } as Booking;

    console.log(request);
    this.bookingService.SaveBooking(request).subscribe({
      next: (response) => {
      this.GetBookingsByPart();
      },
      error: (error) => {
      console.error(error);
      }
    });
  }
}
