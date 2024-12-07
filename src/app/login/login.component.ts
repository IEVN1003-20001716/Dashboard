import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginApiService } from './loginapi.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    correo: '',
    contrasena: ''
  };
  error: string = '';

  constructor(
    private loginService: LoginApiService,
    private router: Router
  ) {}

  onSubmit() {
    this.loginService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.exito) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Credenciales inválidas';
        }
      },
      error: (error) => {
        this.error = 'Error al intentar iniciar sesión';
        console.error(error);
      }
    });
  }
}