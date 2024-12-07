import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuarios';
 // Necesitarás crear esta interfaz

//

@Injectable({
  providedIn: 'root'
})
export class UsuariosApiService {
  private apiUrl = 'http://localhost:5000'; // Ajusta según tu configuración

  constructor(private http: HttpClient) { }

  getAdministradores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  getAdministrador(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }

  agregarAdministrador(admin: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, admin);
  }

  actualizarAdministrador(id: string, admin: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, admin);
  }

  eliminarAdministrador(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }
}