import {

  Injectable,
  ViewEncapsulation,
} from '@angular/core';
import { CalendarEventTitleFormatter } from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { addDays, addMinutes } from 'date-fns';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  
  
  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}

import { CalendarioService } from './../../../services/testeo/calendario/calendario.service';
import { Component, ChangeDetectionStrategy, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable, Subscription } from 'rxjs';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


import { registerLocaleData, formatDate } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import { MatDialog } from '@angular/material/dialog';

import { CrearEventoComponent } from 'src/app/modals/modal-calendario/crear-evento/crear-evento.component';
import { Router } from '@angular/router';
registerLocaleData(localeFr);
registerLocaleData(localeEs);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers:[
     CalendarEventTitleFormatter,
  ]
})
export class CalendarComponent implements OnInit {
  locale: string = 'es';

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  events: Array<CalendarEvent<{ id: number }>> = [];


  activeDayIsOpen: boolean = false;

  calenObs$: Observable<any>
  calenSubs: Subscription;

  clickedDate: Date;



  dragToCreateActive = false;

  weekStartsOn: 0 = 0;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    
    private http: HttpClient,
    private _calendario: CalendarioService,
    private cdr: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.fetchEvents();
  }
  ngOnDestroy() {
    if (this.calenSubs) {
    this.calenSubs.unsubscribe();
      
    }
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];
    this.calenObs$ = this._calendario.getCalendario();
    this.calenSubs = this.calenObs$.subscribe(res => {
      this.events = []
      res.forEach(element => {
        let inicia = new Date(element.start.toDate())
        let termina = new Date(element.end.toDate())

        this.events.push({
          start: inicia,
          end: termina,
          title: formatDate(new Date(inicia), 'h:mm a ', 'en') + " Actividad: " + element.title+ ' // ' + "Descripción:" +element.name,
          id: element._id,
          color:colors.blue,
          actions: [
          ]
        })
      });
    })

  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<any>[];
  }): void {
    console.log(events);
    
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<any>): void {
    console.log(event);
    this.viewDate = event.start;
    this.view = CalendarView.Day;
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  ///////////////////////////////


  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    this.router.navigate(['/crear-evento',segment.date.toISOString()]);
    
    // this.dialog.open(CrearEventoComponent, {
    //   width: '100%',
    //   // height:'100%',
    //   // disableClose: true,
    //   data :{
    //     segment,
    //     mouseDownEvent,
    //     segmentElement
    //   }
    // });
    // let id = new Date().toISOString();
    // const dragToSelectEvent: CalendarEvent = {
    //   id: id,
    //   title: 'New event',
    //   start: segment.date,
    //   // end: segment.date,
    //   meta: {
    //     tmpEvent: true,
    //   },
    // };
    // this.events = [...this.events, dragToSelectEvent];
    // console.log(this.events);
    
    // const segmentPosition = segmentElement.getBoundingClientRect();
    // this.dragToCreateActive = true;
    // const endOfView = endOfWeek(this.viewDate, {
    //   weekStartsOn: this.weekStartsOn,
    // });

    // fromEvent(document, 'mousemove')
    //   .pipe(
    //     finalize(() => {
    //       delete dragToSelectEvent.meta.tmpEvent;
    //       this.dragToCreateActive = false;
    //       this.refresh();
    //     }),
    //     takeUntil(fromEvent(document, 'mouseup'))
    //   )
    //   .subscribe((mouseMoveEvent: MouseEvent) => {
    //     const minutesDiff = ceilToNearest(
    //       mouseMoveEvent.clientY - segmentPosition.top,
    //       30
    //     );

    //     const daysDiff =
    //       floorToNearest(
    //         mouseMoveEvent.clientX - segmentPosition.left,
    //         segmentPosition.width
    //       ) / segmentPosition.width;

    //     const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
    //     if (newEnd > segment.date && newEnd < endOfView) {
    //       // this._calendario.updateEvent(dragToSelectEvent.id,newEnd)
    //       dragToSelectEvent.end = newEnd; 
    //       console.log(dragToSelectEvent.end);
                   
    //     }
    //     this.refresh();
    //   });
  }

   refresh() {
    this.events = [...this.events];
    console.log(this.events);
    
    this.cdr.detectChanges();
  }

  opdenCreateTaskOnline() {
    this.dialog.open(CrearEventoComponent, {
      width: '100%',
      // height:'100%',
      disableClose: true,
      
    });
  }
  

}