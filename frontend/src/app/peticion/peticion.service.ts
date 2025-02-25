import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Peticion } from './peticion';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Cambia esto a la URL de tu backend

  constructor(private http: HttpClient) { }

  // Get all peticiones
  index(): Observable<Peticion[]> {
    return this.http.get<Peticion[]>(`${this.apiUrl}/peticiones`);
  }

  // Get a single peticion by ID
  view(id: number): Observable<Peticion> {
    return this.http.get<Peticion>(`${this.apiUrl}/peticiones/${id}`);
  }

  // Create a new peticion
  create(peticion: Peticion): Observable<Peticion> {
    return this.http.post<Peticion>(`${this.apiUrl}/peticiones`, peticion);
  }

  // Edit a peticion by ID
  edit(id: number, peticion: Peticion): Observable<Peticion> {
    return this.http.put<Peticion>(`${this.apiUrl}/peticiones/${id}`, peticion);
  }

  // Delete a peticion by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/peticiones/${id}`);
  }

  // Sign a peticion by ID
  sign(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/peticiones/firmar/${id}`, {});
  }
}