import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { Service } from '../models/service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private service: Service[] = [];

  private url: string = 'http://localhost:8009/service';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.url);
  }

  findById(id: number): Observable<Service>{
    return this.http.get<Service>(`${this.url}/${id}`);
  }

}
