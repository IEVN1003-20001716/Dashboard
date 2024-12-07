import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosApiService } from '../usuariosapi.service';

interface Admin {
  id: string;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: string;
}

@Component({
  selector: 'app-agregar-admin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregaradmin.component.html',
  styles: ``,
})
export default class AgregarAdminComponent implements OnInit {
  formGroup!: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    public usuariosApi: UsuariosApiService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }
 
  onSubmit(): void {
    if(this.formGroup.valid) {
      const nuevoAdmin: Admin = {
        id: this.formGroup.get('id')?.value,
        nombre: this.formGroup.get('nombre')?.value,
        correo: this.formGroup.get('correo')?.value,
        contrasena: this.formGroup.get('contrasena')?.value,
        rol: this.formGroup.get('rol')?.value
      };
 
      this.usuariosApi.agregarAdministrador(nuevoAdmin).subscribe({
        next: (response) => {
          if(response.exito == 1) {
            alert('Administrador agregado exitosamente');
            this.router.navigate(['/usuario']);
          } else {
            alert('Error al agregar administrador: ' + response.mensaje);
          }
        },
        error: (error) => {
          alert('Error en el servidor: ' + error.message);
        }
      });
    } else {
      alert('Por favor complete todos los campos requeridos correctamente');
    }
  }
}