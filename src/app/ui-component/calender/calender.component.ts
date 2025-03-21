import { Component, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays,addHours,addMinutes,startOfDay } from 'date-fns'

@Component({
  selector: 'app-calender',
  standalone:false,
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {
  viewDate : Date = new Date();
  @Input()
  events : CalendarEvent[] = [];
}
