import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { Reservation } from '../models/reservation';
import { ReservationListService } from '../services/reservationList.service';
import { SharingDataRService } from '../services/sharing-datar.service';

@Component({
  selector: 'reservation-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './reservation-app.component.html',
  styleUrls: ['./reservation-app.component.css']
})
export class ReservationAppComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(
    private router: Router,
    private service: ReservationListService,
    private sharingData: SharingDataRService) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(reservations => this.reservations = reservations);
    this.addReservation();
    this.removeReservation();
  }

  addReservation() {
    this.sharingData.newReservationEventEmitter.subscribe(reservation => {
      if (reservation.id > 0) {
        this.reservations = this.reservations.map(u => (u.id == reservation.id) ? { ...reservation } : u);
      } else {
        this.reservations = [... this.reservations, { ...reservation, id: new Date().getTime() }];
      }
      this.router.navigate(['/reservations'], { state: { reservations: this.reservations } });
      Swal.fire({
        title: "Guardado!",
        text: "Reservacion guardada con exito!",
        icon: "success"
      });
    })
  }

  removeReservation(): void {
    this.sharingData.idReservationEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado la reserva sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {
          this.reservations = this.reservations.filter(reservation => reservation.id != id);
          this.router.navigate(['/reservation/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/reservations'], { state: { resers: this.reservations } });
          });

          Swal.fire({
            title: "Eliminado!",
            text: "Reserva eliminada con exito.",
            icon: "success"
          });
        }
      });
    });
  }

}
