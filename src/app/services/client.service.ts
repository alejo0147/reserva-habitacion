import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private client: Client[] = [];

  private url: string = 'http://localhost:8009/client';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  findById(id: number): Observable<Client>{
    return this.http.get<Client>(`${this.url}/${id}`);
  }
}
