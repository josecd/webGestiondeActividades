import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-util',
  templateUrl: './calendar-util.component.html',
  styleUrls: ['./calendar-util.component.scss']
})
// export class CalendarUtilComponent  {
 

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
export class CalendarUtilComponent {
  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
