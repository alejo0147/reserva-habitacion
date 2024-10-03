import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { SharingDataRService } from '../services/sharing-datar.service';
import { ClientService } from '../services/client.service';
import { ServiceService } from '../services/service.service';
import { Client } from '../models/client';
import { Service } from '../models/service';

@Component({
  selector: 'reservation-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './reservation-app.component.html',
  styleUrls: ['./reservation-app.component.css'],
})
export class ReservationAppComponent implements OnInit {
  //  F
  reservations: Reservation[] = [];

  //  N
  clients: Client[] = [];
  services: Service[] = [];

  constructor(
    //  F
    private router: Router,
    private reservationService: ReservationService,
    private sharingData: SharingDataRService,
    //  N
    private clientService: ClientService,
    private serviceService: ServiceService
  ) {
    //  N
    this.clientService.findAll().subscribe((clients) => (this.clients = clients));
    this.serviceService.findAll().subscribe((services) => (this.services = services));
  }

  ngOnInit(): void {
    this.findById();
    this.loadReservations();
    this.loadClients();
    this.loadServices();
    this.addReservation();
    this.removeReservation();
  }

  findById(){
    this.sharingData.findReservationByIdEventEmitter.subscribe(id => {
      console.log(`Ingreso a la raíz para buscar por id`)
      const reservation = this.reservations.find(reservation => reservation.id == id);

      this.sharingData.selectReservationEventEmitter.emit(reservation);
    })
  }

  // Método para cargar todas las reservas
  private loadReservations(): void {
    this.reservationService.findAll().subscribe((reservations) => (this.reservations = reservations));
  }

  // Método para cargar todos los clientes
  private loadClients(): void {
    this.clientService.findAll().subscribe((clients) => (this.clients = clients));
  }

  // Método para cargar todos los servicios
  private loadServices(): void {
    this.serviceService.findAll().subscribe((services) => (this.services = services));
  }

  // Método para manejar el agregar o actualizar una reserva
  addReservation(): void {
    this.sharingData.newReservationEventEmitter.subscribe((reservation) => {
      console.log(reservation.dateEnd)
      if (reservation.id != 0) {
        console.log(`${reservation.id} -- ${reservation.clientId}`)
        this.reservationService.updateReservation(reservation).subscribe(reservationUpdate =>{
          console.log(`Nueva fecha inicial ${reservationUpdate.dateStart}`)
          this.reservations = this.reservations.map(
            r => (r.id == reservationUpdate.id)? {...reservationUpdate} : r);
        });
      } else{
        console.log(`Acá está ${reservation.clientId} ${reservation.serviceId}`)
      }
      this.router.navigate(['/reservations']);
      console.log(reservation.id)
      Swal.fire({
        title: "Guardado!",
        text: "Usuario guardado con exito!",
        icon: "success"
      });
    })
  }

  // Método para manejar la eliminación de reservas
  removeReservation(): void {
    this.sharingData.idReservationEventEmitter.subscribe((id) => {
      console.log(`${id} este es el id desde raíz reservation-app.component`);

      Swal.fire({
        title: '¿Está seguro de que quiere eliminar?',
        text: 'Esta acción eliminará la reserva del sistema.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.reservationService.deleteReservation(id).subscribe(() => {
            // Filtrar solo la reserva que corresponde al id recibido
            this.reservations = this.reservations.filter(reservation => {
              console.log(`Comparando reserva ${reservation.id} con id ${id}`);
              return reservation.id !== id;
            });

            // Navegar para refrescar la vista
            this.router.navigate(['/reservations/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/reservations']);
            });

            // Mostrar mensaje de éxito
            Swal.fire({
              title: "Eliminado!",
              text: "Usuario eliminado con éxito.",
              icon: "success"
            });
          });
        }
      });
    });
  }


}
