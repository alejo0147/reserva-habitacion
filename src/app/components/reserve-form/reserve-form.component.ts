import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataRService } from '../../services/sharing-datar.service';
import { Reservation } from '../../models/reservation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reserve-form.component.html'
})
export class ReserveFormComponent {

  reser: Reservation;

  constructor(
    private router: Router,
    private sharingData: SharingDataRService) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.reser = this.router.getCurrentNavigation()?.extras.state!['reser'];
    } else {
      this.reser = new Reservation();
    }
  }

  onSubmit(reservationForm: NgForm): void {
    if (reservationForm.valid) {
      this.sharingData.newReservationEventEmitter.emit(this.reser);
      console.log(this.reser);
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
