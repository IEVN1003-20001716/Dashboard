import { Routes } from "@angular/router";
 
export default [
  {
    path: 'listausuarios',
    loadComponent: () => import('./usuarios/usuarios.component')
  },
  {
    path: 'agregar',
    loadComponent: () => import('./agregar/agregaradmin.component')
  },
  {
    path: 'eliminar/:id',
    loadComponent: () => import('./eliminar/eliminaradmin.component')
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./editar/editaradmin.component')
  }
] as Routes;