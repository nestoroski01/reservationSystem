import { Injectable } from '@angular/core';
import { User } from '../user/shared/user.class';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalService {

  private user: BehaviorSubject<User> = new BehaviorSubject(null);
  user$ = this.user.asObservable();
  private isLogged: boolean = false;

  constructor() { 
  }

  /**
   * 
   * @param user 
   */
  setUser(user: User): void {
    this.user.next(user);
  }

  /**
   * Returns the user
   */
  getUser(): Observable<User> {
    return this.user$;
  }

  /**
   * Sets isLogged value. 
   * @param isLogged 
   */
  setIsLogged(isLogged: boolean): void {
    this.isLogged = isLogged;
  }

  getIsLogged(): boolean {
    return this.isLogged;
  }
}
