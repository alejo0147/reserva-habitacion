import { Routes } from '@angular/router';
import { ReservationComponent } from './components/reservation/reservation.component'; 
import { ReserveFormComponent } from './components/reserve-form/reserve-form.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/reservations' // Redirige a la página de reservas por defecto
    },
    {
        path: 'reservations',
        component: ReservationComponent, // El componente para listar reservas
    },
    {
        path: 'reservations/create',
        component: ReserveFormComponent, // El componente para crear una nueva reserva
    },
    {
        path: 'reservations/edit/:id',
        component: ReserveFormComponent // El componente para editar una reserva existente
    }
];
