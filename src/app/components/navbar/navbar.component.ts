import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { User } from '../../models/user';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  //@Input() users: User[] = [];
  @Input() reservations: Reservation[] = [];
}
