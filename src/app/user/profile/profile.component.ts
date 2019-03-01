import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../core/global.service';
import { EventsService } from '../../events/shared/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  userEvents = [];
  constructor(private globalService: GlobalService, private eventsService: EventsService, private router: Router) { }

  ngOnInit() {
    if (this.globalService.getIsLogged()){
      this.globalService.getUser().subscribe(val => {
        this.user = val;
      })
    }
    this.getEventsByUserId();
  }

  getEventsByUserId() {
    this.eventsService.getEventsByUserId(this.user.key).subscribe(val => {
      this.filterEvents(val);
    })
  }

  filterEvents(events) {
    this.userEvents = events.map(event => {
      const data = event.payload.val();
      const key = event.payload.key;
      return {key, data}
    })
  }

  reservationAlert() {
    alert("You can't reserve place on your own event");
  }

  logOut() {
    this.globalService.setUser(null);
    this.globalService.setIsLogged(false);
    this.router.navigate(['/events']);
  }

}
