import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private service: Service[] = [{
    id: 1,
    name: 'Sencilla',
    description: 'Habitación con una sola cama sencilla para máximo 2 personas'
  },
  {
    id: 2,
    name: 'Doble',
    description: 'Habitación con una sola cama Doble para máximo 2 personas'
  }];

  constructor() { }

  findAll(): Observable<Service[]> {
    return of(this.service);
  }
}
