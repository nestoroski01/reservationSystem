import { Component, OnInit } from '@angular/core';
import {EventsService} from './shared/events.service';
import { ReservationsService } from 'src/app/reservations/shared/services/reservations.service';
import { GlobalService } from '../core/global.service';
import { Router } from '@angular/router';
import { Event } from './shared/event.class';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  today: Date = new Date();
  week: Array<Date> = [];
  todayEvents;
  constructor(private eventService: EventsService,
              private reservationService: ReservationsService,
              private globalService: GlobalService,
              private router: Router) { }


  ngOnInit() {
    this.initializeWeek();
    this.eventService.getEventsByDate(new Date()).subscribe( events => {
      this.getEventsByDate(events); 
    })
  }

  private initializeWeek(): void {
    for (let i = 0; i < 7; i++) {
      const temp = new Date();
      temp.setDate(this.today.getDate() + i);
      this.week.push(temp);
    }
  }
  
  onTabChange(date): void {
    this.eventService.getEventsByDate(this.week[date.index]).subscribe(events => {
      this.getEventsByDate(events);
    });
  }

  getEventsByDate(events) {
    this.todayEvents = events.map(event => {
      const data = event.payload.val();
      const key = event.payload.key;
      return {key, data}
    })
  }

  addReservation(event) {
    if(this.globalService.getIsLogged()) {
      this.globalService.getUser().subscribe(user => {
        if(event.data.userID != user.key) {
          this.reservationService.addReservation(event, user);
          alert("Succesfully reserved a place for you!");     
        }     
        else
          alert("Can't reserve on your own event!");
      })
    } else {
      this.router.navigate(['/login']);
    }
  }
}
