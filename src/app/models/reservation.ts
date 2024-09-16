import { Client } from "./client";
import { Service } from "./service";

export class Reservation {

  id: number = 0;
  dateReservation!: String;
  dateStart!: String;
  dateEnd!: String;
  client!: Client;
  service!: Service;

}
