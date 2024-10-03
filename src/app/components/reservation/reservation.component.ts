import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { ReservationService } from '../../services/reservation.service';
import { SharingDataRService } from '../../services/sharing-datar.service';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ServiceService } from '../../services/service.service';
import { Client } from '../../models/client';
import { Service } from '../../models/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'reservation',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit{

  title: string = 'Listado de reservas!';
  resers: Reservation[] = [];
  clients: Client[] = [];
  services: Service[] = [];
  isEditing: boolean = false;
  filteredResers: Reservation[] = [];
  searchDate: string = '';
  searchUserId: string | null = null;

  constructor(
    private reservationService: ReservationService,
    private clientService: ClientService,
    private serviceService: ServiceService,
    private sharingData: SharingDataRService,
    private router: Router) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.resers = this.router.getCurrentNavigation()?.extras.state!['reservations'];
    } else {
      this.reservationService.findAll().subscribe(resers => this.resers = resers);
    }
  }
  ngOnInit(): void {
    this.loadClients();
    this.loadServices();
    this.getReservas();
  }


  getReservas(): void {
    this.reservationService.findAll().subscribe((resers) => {
      this.resers = resers.map((reserva) => {
        const nameClient = this.getClientName(reserva.clientId);
        const nameService = this.getServiceName(reserva.serviceId);

        if (!nameClient) {
          console.warn(
            `No se encontró el cliente para el ID: ${reserva.clientId}`
          );
        }

        return {
          ...reserva,
          nameService,
          nameClient: nameClient || 'Desconocido',
        };
      });
    });
  }

  onRemoveReservation(id: number): void {
    this.sharingData.idReservationEventEmitter.emit(id);
    console.log(`Este es el id para eliminar desde reservation.component ${id}`)
  }

  onSelectedReservation(reser: Reservation): void {
    this.router.navigate(['/reservations/edit', reser.id]);
    console.log(`${reser.id} --- ${reser.clientId}`)
  }

  loadClients(): void {
    this.clientService.findAll().subscribe((clients) => {
      this.clients = clients;
    });
  }

  loadServices(): void {
    this.serviceService.findAll().subscribe((services) => {
      this.services = services;
    });
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    console.log(client?.fullName + "ACCCCCCÁ")
    return client ? client.fullName : 'Desconocido';
  }

  getServiceName(serviceId: number): string {
    const service = this.services.find(s => s.id === serviceId);
    return service ? service.name : 'Desconocido';
  }

}
