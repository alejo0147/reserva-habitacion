import { EventEmitter, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class SharingDataRService {

  private _newReservationEventEmitter: EventEmitter<Reservation> = new EventEmitter();

  private _idReservationEventEmitter = new EventEmitter();

  constructor() { }

  get newReservationEventEmitter(): EventEmitter<Reservation> {
    return this._newReservationEventEmitter;
  }

  get idReservationEventEmitter(): EventEmitter<number>{
    return this._idReservationEventEmitter;
  }

}
