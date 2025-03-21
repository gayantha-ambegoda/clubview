import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UiComponentModule } from '../../ui-component/ui-component.module';
import { addDays,addHours,addMinutes,startOfDay } from 'date-fns'

@Component({
  selector: 'app-fields',
  imports: [
    UiComponentModule
  ],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.css'
})
export class FieldsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute)
  selectedField : number = 0
  calendarEvents : CalendarEvent[] = []

  ngOnInit(): void {
    this.selectedField = Number(this.route.snapshot.paramMap.get('id'));
    this.calendarEvents.push({
      start: addHours(startOfDay(new Date('2025-03-20T12:30:00.000Z')), new Date('2025-03-20T12:30:00.000Z').getHours()),
      end: addHours(startOfDay(new Date('2025-03-20T16:30:00.000Z')), new Date('2025-03-20T16:30:00.000Z').getHours()),
      title: 'And another',
      color: {primary: '#e3bc08', secondary: '#FDF1BA'}
    })
  }

}
