import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from './regis';
 
@Pipe({
  name: 'usuarioFilter',
  standalone: true
})
export class UsuarioFilterPipe implements PipeTransform {
  transform(value: Usuario[], args: string): Usuario[] {
    let filter: string = args ? args.toLocaleLowerCase() : '';
    // Retorna usuarios que coincidan con userName o email
    return filter ? value.filter((usuario: Usuario) =>
      usuario.userName.toLocaleLowerCase().includes(filter) ||
      usuario.email.toLocaleLowerCase().includes(filter)
    ) : value;
  }
}