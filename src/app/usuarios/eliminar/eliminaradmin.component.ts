import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UsuariosApiService } from '../usuariosapi.service';
import { Usuario } from '../usuarios';

// interface Admin {
//   id: string;
//   nombre: string;
//   correo: string;
//   contrasena: string;
//   rol: string;
// }

@Component({
  selector: 'app-eliminar-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './eliminaradmin.component.html',
  styles: ``
})
export default class EliminarAdminComponent implements OnInit {
  adminId: string = '';
  usuario: Usuario = {
    id: '',
    nombre: '',
    correo: '',
    contrasena: '',
    rol: ''
  };

  constructor(
    private route: ActivatedRoute,
    public usuarioService: UsuariosApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminId = this.route.snapshot.params['id'];
    
    if (this.adminId) {
      this.usuarioService.getAdministrador(this.adminId).subscribe({
        next: (response) => {
          if (response.exito && response.usuario) {
            this.usuario = response.usuario;
          } else {
            console.error('Administrador no encontrado');
            this.router.navigate(['/usuario']);
          }
        },
        error: (error) => {
          console.error('Error al cargar administrador:', error);
          this.router.navigate(['/usuario']);
        }
      });
    }
  }

  eliminar() {
    if (this.adminId) {
      this.usuarioService.eliminarAdministrador(this.adminId).subscribe({
        next: (response) => {
          if (response.exito) {
            console.log('Administrador eliminado exitosamente');
            this.router.navigate(['/usuario']);
          } else {
            console.error('Error al eliminar administrador');
          }
        },
        error: (error) => {
          console.error('Error en la eliminación:', error);
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/usuario']);
  }
}