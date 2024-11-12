import { Injectable } from '@angular/core';
import { Usuario } from 'src/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario: Usuario = {
    nombre: '',
    sede: '',
    carrera: '',
    imagen: ''  
  };

  constructor() { }


  getUsuario(): Usuario {
    return this.usuario;
  }


  actualizarUsuario(usuario: Usuario): void {
    this.usuario = usuario;
  }

 
  actualizarImagen(imagenBase64: string): void {
    this.usuario.imagen = imagenBase64;
  }
}