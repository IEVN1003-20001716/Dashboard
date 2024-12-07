import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginApiService } from '../login/loginapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginApiService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const usuario = this.loginService.getUsuarioActual();
    const requiredRoles = route.data['roles'] as Array<string>;

    if (!usuario) {
      this.router.navigate(['/login']);
      return false;
    }

    if (requiredRoles && !requiredRoles.includes(usuario.rol)) {
      this.router.navigate(['/Dashboard']); // Redirige a una ruta por defecto
      return false;
    }

    return true;
  }
}
