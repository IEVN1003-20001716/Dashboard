import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UsuariosApiService } from '../regisapi.service';
import { Usuario } from '../regis';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './eliminar.component.html',
  styles: ``
})
export default class EliminarregisComponent implements OnInit {
  userName: string = '';
  regUsuario: Usuario = {
    userName: '',
    email: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    public usuarioService: UsuariosApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = this.route.snapshot.params['userName'];
    
    if (this.userName) {
      this.usuarioService.getUsuario(this.userName).subscribe({
        next: (response) => {
          if (response.exito && response.usuarior) {
            this.regUsuario = response.usuarior;
          } else {
            console.error('Usuario no encontrado');
            this.router.navigate(['/usuariosr']);
          }
        },
        error: (error) => {
          console.error('Error al cargar usuario:', error);
          this.router.navigate(['/usuariosr']);
        }
      });
    }
  }

  eliminar() {
    if (this.userName) {
      this.usuarioService.eliminarUsuario(this.userName).subscribe({
        next: (response) => {
          if (response.exito) {
            console.log('Usuario eliminado exitosamente');
            this.router.navigate(['/usuariosr']);
          } else {
            console.error('Error al eliminar usuario');
          }
        },
        error: (error) => {
          console.error('Error en la eliminación:', error);
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/usuariosr']);
  }
}