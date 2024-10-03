import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];
  private url: string = 'http://localhost:8009/reservation';

  constructor(private http: HttpClient) { }

  //  Listar todas las reservas
  findAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.url);
  }

  //  Traer por id de reserva
  findById(id: number): Observable<Reservation>{
    return this.http.get<Reservation>(`${this.url}/${id}`);
  }

  //  Crear reserva
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.url, reservation);
  }

  //  Modificar reserva
  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.url}/${reservation.id}`, reservation);
  }

  //  Eliminar reserva
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
