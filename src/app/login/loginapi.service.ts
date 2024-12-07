import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
 
export interface LoginResponse {
    mensaje: string;
    exito: boolean;
    usuario?: {
    id: number;
    nombre: string;
    contrasena: string;
    correo: string;
    rol: string; 
  };
}
 
@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private apiUrl = 'http://localhost:5000';
 
  constructor(private http: HttpClient) { }
 
  login(credentials: { correo: string; contrasena: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.exito && response.usuario) {
            response.usuario.rol = response.usuario.rol.toLowerCase();
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
          }
        })
      );
  }
 
  logout(): void {
    localStorage.removeItem('usuario');
  }
 
  isLoggedIn(): boolean {
    return localStorage.getItem('usuario') !== null;
  }
 
  getUsuarioActual(): any {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      return JSON.parse(usuario);
    }
    return null;
  }

  hasRole(roles: string[]): boolean {
    const usuario = this.getUsuarioActual();
    return usuario && roles.includes(usuario.rol);
  }
}