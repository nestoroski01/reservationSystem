import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Reservation } from '../models/reservation';
import { map } from 'rxjs/operators';
import { Event } from '../../../events/shared/event.class';
import { User } from '../../../user/shared/user.class';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  url: string = '/reservations/'
  constructor(private db: AngularFireDatabase ) { }

  addReservation(event: any, user: User) {
    let newReservation: Reservation = {
      seen: false,
      eventId: event.key,
      eventTitle: event.data.title,
      eventHostId: event.data.userID,
      dateReserved: new Date().toString(),
      guest: user,
    }

   return this.db.list(this.url).push(newReservation);
  }

  getReservations(userId: string) {
    return this.db.list(this.url, data => data.orderByChild('eventHostId').equalTo(userId))
    .snapshotChanges()
    .pipe(map(items => {
      return items.map( a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return { key, data }
      });
    }));
  }
}
