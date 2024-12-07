import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UsuariosApiService } from '../usuariosapi.service';


interface Admin {
  id: string;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: string;
}

@Component({
  selector: 'app-editar-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './editaradmin.component.html',
  styles: ``
})
export default class EditarAdminComponent implements OnInit {
  formGroup!: FormGroup;
  adminId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public usuariosApi: UsuariosApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [{value: '', disabled: true}],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required]
    });

    this.adminId = this.route.snapshot.params['id'];
    
    if (this.adminId) {
      this.usuariosApi.getAdministrador(this.adminId).subscribe({
        next: (response) => {
          if (response && response.exito) {
            this.formGroup.patchValue({
              id: response.usuario.id,
              nombre: response.usuario.nombre,
              correo: response.usuario.correo,
              contrasena: response.usuario.contrasena,
              rol: response.usuario.rol
            });
          } else {
            alert('Error: ' + response.mensaje);
            this.router.navigate(['/usuario']);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error al cargar administrador');
          this.router.navigate(['/usuario']);
        }
      });
    }
  }

  modificar() {
    if (this.formGroup.valid) {
      const adminActualizado: Admin = {
        id: this.adminId,
        nombre: this.formGroup.get('nombre')?.value,
        correo: this.formGroup.get('correo')?.value,
        contrasena: this.formGroup.get('contrasena')?.value,
        rol: this.formGroup.get('rol')?.value
      };

      this.usuariosApi.actualizarAdministrador(this.adminId, adminActualizado).subscribe({
        next: (response) => {
          if (response.exito) {
            alert(response.mensaje);
            this.router.navigate(['/usuario']);
          } else {
            alert('Error: ' + response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error al actualizar administrador');
        }
      });
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }
}