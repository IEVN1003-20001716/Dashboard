import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from './usuarios';


@Pipe({
  name: 'usuarioFilter',
  standalone: true
})
export class UsuarioFilterPipe implements PipeTransform {
  transform(value: Usuario[], args: string): Usuario[] {
    let filter: string = args ? args.toLocaleLowerCase() : '';
    
    // Retorna usuarios que coincidan con id, nombre, correo o rol
    return filter ? value.filter((usuario: Usuario) =>
      usuario.id.toLocaleLowerCase().includes(filter) ||
    usuario.nombre.toLocaleLowerCase().includes(filter) ||
    usuario.correo.toLocaleLowerCase().includes(filter) ||
    usuario.rol.toLocaleLowerCase().includes(filter)
    ) : value;
  }
}