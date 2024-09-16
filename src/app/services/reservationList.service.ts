import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reservation } from '../models/reservation';
import { Client } from '../models/client';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ReservationListService {

  private reservation: Reservation[] = [{
    id: 1,
    dateReservation: '2024-08-14',
    dateStart: '2024-08-15',
    dateEnd: '2024-08-20',
    client: {
      id: 1,
      fullName: 'Andres Ruiz',
      email: 'andres@mail.com'
    },
    service: {
      id: 1,
      name: 'Sencilla',
      description: 'Description of Service 1'
    }
  },
  {
    id: 2,
    dateReservation: '2024-08-14',
    dateStart: '2024-08-17',
    dateEnd: '2024-08-25',
    client: {
      id: 2,
      fullName: 'Pepa Doe',
      email: 'pepa.doe@mail.com'
    },
    service: {
      id: 2,
      name: 'Doble',
      description: 'Description of Service 2'
    }
  }];

  constructor() { }

  findAll(): Observable<Reservation[]> {
    return of(this.reservation);
  }
  
}
