import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../regis';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UsuariosApiService } from '../regisapi.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './editar.component.html',
  styles: ``
})
export default class EditarRegisComponent implements OnInit {
  formGroup!: FormGroup;
  userName: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public usuariosApi: UsuariosApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.userName = this.route.snapshot.params['userName'];
    
    if (this.userName) {
      this.usuariosApi.getUsuario(this.userName).subscribe({
        next: (response) => {
          if (response && response.exito) {
            this.formGroup.patchValue({
              email: response.usuarior.email,
              password: response.usuarior.password
            });
          } else {
            alert('Error: ' + response.mensaje);
            this.router.navigate(['/usuariosr']);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error al cargar usuario');
          this.router.navigate(['/usuariosr']);
        }
      });
    }
  }

  modificar() {
    if (this.formGroup.valid) {
      const usuarioActualizado: Usuario = {
        userName: this.userName,
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value
      };

      this.usuariosApi.modificarUsuario(this.userName, usuarioActualizado).subscribe({
        next: (response) => {
          if (response.exito) {
            alert(response.mensaje);
            this.router.navigate(['/usuariosr']);
          } else {
            alert('Error: ' + response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error al actualizar usuario');
        }
      });
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }
}