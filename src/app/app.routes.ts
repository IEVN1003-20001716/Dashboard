import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registernousado/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
//registrados
import EditarRegisComponent from './registrados/editar/editar.component';
import EliminarregisComponent from './registrados/eliminar/eliminar.component';
import AgregarRegisComponent from './registrados/agregar/agregar.component';
import RegistradosComponent from './registrados/registrados/registrados.component';

//usuarios admin
import UsuariosAdminComponent from './usuarios/usuarios/usuarios.component';
import EditarAdminComponent from './usuarios/editar/editaradmin.component';
import EliminarAdminComponent from './usuarios/eliminar/eliminaradmin.component';
import AgregarAdminComponent from './usuarios/agregar/agregaradmin.component';
export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { //rutas de registrados inicio
    path: 'usuariosr', 
    component: RegistradosComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'usuariosr/agregar', 
    component: AgregarRegisComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'usuariosr/editar/:id', 
    component: EditarRegisComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'usuariosr/eliminar/:id', 
    component: EliminarregisComponent,
    canActivate: [AuthGuard]
  },//rutas de registrados finalizo 
  //rutas de usuarios inicio 
  { 
    path: 'usuario', 
    component: UsuariosAdminComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'usuario/agregar', 
    component: AgregarAdminComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'usuario/editar/:id', 
    component: EditarAdminComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'usuario/eliminar/:id', 
    component: EliminarAdminComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
