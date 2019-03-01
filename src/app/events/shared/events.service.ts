import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Event } from './event.class';
import { User } from '../../user/shared/user.class';
import { map } from 'rxjs/operators';

@Injectable()
export class EventsService {
  url: string = '/events/';
  user: User;

  constructor(private db: AngularFireDatabase) {
  }

  addEvent(event: Event) {
    return new Promise((resolve, reject) => {
      this.db.list<Event>(this.url)
        .push(event)
        .then(data => resolve(data), err => reject(err));
    });
  }

  getEventsByDate(date: Date) {
    return this.db
    .list(this.url)
    .snapshotChanges()
    .pipe(map(items => {
      return items.filter( a => {
        const data = a.payload.val();
        const key = a.payload.key;
        if (this.checkDate(data, date))
          return { key, data };
        
      });
    }));
  }

  getEventsByUserId(userId: string) {
    return this.db
    .list(this.url)
    .snapshotChanges()
    .pipe(map(items => {
      return items.filter( a => {
        const data: any = a.payload.val();
        const key = a.payload.key;
        if (userId == data.userID)
          return {key, data};
      })
    }))
  }

  checkDate(event: any, date: Date): boolean {
    let startDate = new Date(event.dtStart);
    if(startDate.getDate() == date.getDate()){
      return true;
    }
    return false;
  }


}
