import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Peticion } from './peticion';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  private apiUrl = 'http://127.0.0.1:8000/api/peticiones';

  constructor(private http: HttpClient) { }

  // Get all peticiones
  index(): Observable<Peticion[]> {
    return this.http.get<Peticion[]>(this.apiUrl);
  }

  // Create a new peticion
  create(peticion: Peticion): Observable<Peticion> {
    return this.http.post<Peticion>(this.apiUrl, peticion);
  }

  // Edit an existing peticion
  edit(id: number, peticion: Peticion): Observable<Peticion> {
    return this.http.put<Peticion>(`${this.apiUrl}/${id}`, peticion);
  }
  
  // View a single peticion
  view(id: number): Observable<Peticion> {
    return this.http.get<Peticion>(`${this.apiUrl}/${id}`);
  }

}