import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioFilterPipe } from '../usuarios-admin.pipe';
import { CommonModule } from '@angular/common';
import { UsuariosApiService } from '../usuariosapi.service';
import { RouterLink, Router } from '@angular/router';
import { Usuario } from '../usuarios';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, UsuarioFilterPipe, CommonModule, RouterLink],
  templateUrl: './usuarios.component.html',
  styles: ``
})
export default class UsuariosComponent implements OnInit {
  muestraImg: boolean = true;
  listFilter: string = '';
  dataSource: Usuario[] = [];
 
  constructor(
    public usuariosApi: UsuariosApiService,
    private router: Router
  ) {}
 
  showImage(): void {
    this.muestraImg = !this.muestraImg;
  }
 
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosApi.getAdministradores().subscribe({
      next: response => {
        if(response && response.usuarios) {
          this.dataSource = response.usuarios;
        } else {
          alert('Error al cargar usuarios');
        }
      },
      error: error => {
        console.error('Error:', error);
        alert('Error al cargar usuarios');
      }
    });
  }

  editarUsuario(id: string): void {
    this.router.navigate(['/usuario/editar', id]);
  }
 
  eliminarUsuario(id: string, nombre: string): void {
    if(confirm(`¿Está seguro que desea eliminar al usuario ${nombre}?`)) {
      this.usuariosApi.eliminarAdministrador(id).subscribe({
        next: (response) => {
          if(response.exito === 1) {
            alert('Usuario eliminado exitosamente');
            this.cargarUsuarios();
          } else {
            alert('Error: ' + response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error al eliminar usuario');
        }
      });
    }
  }
}