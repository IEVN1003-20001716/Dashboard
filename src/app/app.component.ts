import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./registernousado/register.component";
import RegistradosComponent from './registrados/registrados/registrados.component';
import UsuariosAdminComponent from './usuarios/usuarios/usuarios.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HomeComponent, 
    HeaderComponent, 
    LoginComponent, 
    RegisterComponent, 
    RegistradosComponent,
    UsuariosAdminComponent,
    CommonModule, 
    
  ],
  template: `
    <app-header *ngIf="!isLoginPage()"></app-header>
    <div [ngClass]="{'sb-nav-fixed': !isLoginPage()}">
      <div id="layoutSidenav" *ngIf="!isLoginPage()">
        <app-home></app-home>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
