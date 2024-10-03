import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Reservation } from '../../models/reservation';
import { Client } from '../../models/client';
import { Service } from '../../models/service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  @Input() reservations: Reservation[] = [];
  @Input() clients: Client[] = [];
  @Input() services: Service[] = [];
}
