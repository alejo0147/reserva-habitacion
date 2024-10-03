import { EventEmitter, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class SharingDataRService {

  private _newReservationEventEmitter: EventEmitter<Reservation> = new EventEmitter();

  private _idReservationEventEmitter = new EventEmitter();

  private _findReservationByIdEventEmitter = new EventEmitter();

  private _selectReservationEventEmitter = new EventEmitter();

  private _selectClientEventEmitter = new EventEmitter();

  constructor() { }

  get newReservationEventEmitter(): EventEmitter<Reservation> {
    return this._newReservationEventEmitter;
  }

  get idReservationEventEmitter(): EventEmitter<number>{
    return this._idReservationEventEmitter;
  }

  get selectReservationEventEmitter() {
    return this._selectReservationEventEmitter;
  }

  get selectClientEventEmitter() {
    return this._selectClientEventEmitter;
  }

  get findReservationByIdEventEmitter() {
    return this._findReservationByIdEventEmitter
  }

}
