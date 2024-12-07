import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../regis';
import { Router, RouterLink } from '@angular/router';
import { UsuariosApiService } from '../regisapi.service';
 
@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.component.html',
  styles: ``,
})
export default class AgregarRegisComponent implements OnInit {
  formGroup!: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    public usuariosApi: UsuariosApiService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
 
  onSubmit(): void {
    if(this.formGroup.valid) {
      const nuevoUsuario: Usuario = {
        userName: this.formGroup.get('userName')?.value,
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value
      };
 
      this.usuariosApi.agregarNuevoUsuario(nuevoUsuario).subscribe({
        next: (response) => {
          if(response.exito == 1) {
            alert('Usuario agregado exitosamente');
            this.router.navigate(['/usuariosr']);
          } else {
            alert('Error al agregar usuario: ' + response.mensaje);
          }
        },
        error: (error) => {
          alert('Error en el servidor: ' + error.message);
        }
      });
    }
  }
}