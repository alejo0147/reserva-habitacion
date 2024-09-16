import { Component } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { ReservationListService } from '../../services/reservationList.service';
import { SharingDataRService } from '../../services/sharing-datar.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'reservation',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './reservation.component.html'
})
export class ReservationComponent {

  title: string = 'Listado de reservas!';
  resers: Reservation[] = [];
  filteredResers: Reservation[] = [];
  searchDate: string = '';
  searchUserId: number | null = null;

  constructor(
    private service: ReservationListService,
    private sharingData: SharingDataRService,
    private router: Router) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.resers = this.router.getCurrentNavigation()?.extras.state!['reservations'];
    } else {
      this.service.findAll().subscribe(resers => this.resers = resers);
    }
  }

  onRemoveReservation(id: number): void {
    this.sharingData.idReservationEventEmitter.emit(id);
  }

  onSelectedReservation(reser: Reservation): void {
    this.router.navigate(['/reservations/edit', reser.id], {state: {reser}});
  }

  onSearch(): void {
    // Lógica de búsqueda en el frontend si es necesario, de lo contrario, usa el backend
    this.filteredResers = this.resers.filter(reservation => {
      const matchesDate = this.searchDate ? reservation.dateStart === this.searchDate || reservation.dateEnd === this.searchDate : true;
      const matchesUserId = this.searchUserId !== null ? reservation.client.id === this.searchUserId : true;
      return matchesDate && matchesUserId;
    });
  }

}
