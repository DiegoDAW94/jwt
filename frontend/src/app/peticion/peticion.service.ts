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
  getPeticiones(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/peticiones?page=${page}`);
  }

  // Get a single peticion by ID
  view(id: number): Observable<Peticion> {
    return this.http.get<Peticion>(`${this.apiUrl}/peticiones/${id}`);
  }

  // Create a new peticion
  createPeticion(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/peticiones`, formData);
  }

  testUpdate(data: FormData): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/test-update', data);
  }

  updatePeticion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/peticiones/${id}`, data);
  }

changeState(id: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/peticiones/estado/${id}`, {});
}

  // Delete a peticion by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/peticiones/${id}`);
  }

  // Sign a peticion by ID
  sign(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/peticiones/firmar/${id}`, {});
  }

  getSignedPeticiones(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/misfirmas?page=${page}`);
  }

  getMyPeticiones(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/mispeticiones?page=${page}`);
  }
}