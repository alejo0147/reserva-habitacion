import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private client: Client[] = [{
    id: 1,
    fullName: 'Alejandro Parias Moreno',
    email: 'alejandroparmo@mail.com',
  },
  {
    id: 2,
    fullName: 'Adriana Maria Moreno',
    email: 'adrimoreno@mail.com',
  }];

  constructor() { }

  findAll(): Observable<Client[]> {
    return of(this.client);
  }
}
