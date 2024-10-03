import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataRService } from '../../services/sharing-datar.service';
import { Reservation } from '../../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { CommonModule, DatePipe } from '@angular/common';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-reserve-form',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './reserve-form.component.html',
})
export class ReserveFormComponent implements OnInit {
  reser: Reservation;
  client: Client;
  service: Service;
  clients: Client[] = [];
  services: Service[] = [];
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataRService,
    private reservationService: ReservationService,
    private clientService: ClientService,
    private serviceService: ServiceService
  ) {
    this.reser = new Reservation();
    this.client = new Client();
    this.service = new Service();
  }

  ngOnInit(): void {
    // Cargar clientes y servicios al inicio
    this.clientService.findAll().subscribe((clients) => (this.clients = clients));
    this.serviceService.findAll().subscribe((services) => (this.services = services));

    this.sharingData.selectReservationEventEmitter.subscribe((reser) => (this.reser = reser));

    //  Obtener los parámetros de la ruta (app.routes.ts) editar por id
    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.reservationService.findById(id).subscribe((reser) => {
          console.log(`Este es el id de la reservación ${id}`)
          this.reser = reser;
          console.log(reser.clientId)
          console.log(reser)
        });
        this.isEditing = true;
      } else {
        this.isEditing = false;
      }
    });
  }

  onSubmit(reservationForm: NgForm): void {
    if (reservationForm.valid) {
      this.sharingData.newReservationEventEmitter.emit(this.reser);
      console.log(`${this.reser.clientId} Acá estamos reserve form`);
    }
    reservationForm.reset();
    reservationForm.resetForm();
  }

  onClear(reservationForm: NgForm): void {
    this.reser = new Reservation();
    reservationForm.reset();
    reservationForm.resetForm();
  }
}
