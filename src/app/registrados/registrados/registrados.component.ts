import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioFilterPipe } from '../registrados-filter.pipe';
import { CommonModule } from '@angular/common';
import { Usuario } from '../regis';
import { UsuariosApiService } from '../regisapi.service';
import { RouterLink, Router } from '@angular/router';
 
@Component({
  selector: 'app-regis',
  standalone: true,
  imports: [FormsModule, UsuarioFilterPipe, CommonModule, RouterLink],
  templateUrl: './registrados.component.html',
  styles: ``
})
export default class RegisComponent implements OnInit {
  muestraImg: boolean = true;
  listFilter: string = '';
  dataSource: Usuario[] = [];
 
  constructor(
    public usuarioService: UsuariosApiService,
    private router: Router
  ) {}
 
  showImage(): void {
    this.muestraImg = !this.muestraImg;
  }
 
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: response => {
        if(response && response.usuariosr) {
          this.dataSource = response.usuariosr;
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

  editarUsuario(userName: string): void {
    this.router.navigate(['/usuariosr/editar', userName]);
  }
 
  eliminarUsuario(userName: string): void {
    if(confirm(`¿Está seguro que desea eliminar al usuario ${userName}?`)) {
      this.usuarioService.eliminarUsuario(userName).subscribe({
        next: (response) => {
          if(response.exito) {
            alert(response.mensaje);
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