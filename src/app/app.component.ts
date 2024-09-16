import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReservationAppComponent } from './components/reservation-app.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReservationAppComponent, DatePipe],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'reservation-app';
}
