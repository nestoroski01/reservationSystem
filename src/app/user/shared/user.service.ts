import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './user.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  url = '/users/';
  constructor(private db: AngularFireDatabase) { }

  addUser(user: any): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.list<User>(this.url)
      .push(user)
      .then(data => resolve(data), err => reject(err))
    })
  }

  loginAuth(user: any): Observable<any> {
    console.log(this
      .db
      .list(this.url, data => (data.orderByChild('email').equalTo(user.email) && data.orderByChild('password').equalTo(user.password)))
      .snapshotChanges()
      .pipe(map(items => {
        return items.map( a => {
          const data:any = a.payload.val();
          const key = a.payload.key;
          
          return { key, data }
        });
      })));
       return this
       .db
       .list(this.url, data => (data.orderByChild('email').equalTo(user.email) && data.orderByChild('password').equalTo(user.password)))
       .snapshotChanges()
       .pipe(map(items => {
         return items.map( a => {
           const data:any = a.payload.val();
           const key = a.payload.key;
           
           return { key, data }
         });
       }));
  }
}
