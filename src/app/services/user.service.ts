import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    email: 'andres@mail.com',
    password: '123456'
  },
  {
    id: 2,
    email: 'pepa.doe@mail.com',
    password: '123456'
  }];

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
