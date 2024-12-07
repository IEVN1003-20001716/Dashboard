import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './regis';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApiService {
  private apiURL = 'http://127.0.0.1:5000/usuariosr';
 
  constructor(private http: HttpClient) { }
 
  // Obtener todos los usuarios
  public getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }
 
  // Obtener un usuario específico
  public getUsuario(userName: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${userName}`);
  }
 
  // Modificar usuario
  public modificarUsuario(userName: string, datos: Usuario): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${userName}`, {
      email: datos.email,
      password: datos.password
    });
  }
 
  // Eliminar usuario
  public eliminarUsuario(userName: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${userName}`);
  }
 
  // Agregar usuario
  public agregarNuevoUsuario(datos: Usuario): Observable<any> {
    return this.http.post<any>(this.apiURL, datos);
  }
}