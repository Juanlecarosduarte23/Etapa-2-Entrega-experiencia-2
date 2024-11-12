import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../services/perfil.service'; 
import { Perfil } from 'src/interfaces/perfil'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

 
  nombre: string = '';
  carrera: string = '';
  sede: string = '';
  telefono: string = '';
  direccion: string = '';
  base64: string = '';  


  perfiles: Perfil[] = [];
  perfilSeleccionado: Perfil | null = null;  

 
  alertaMensaje: string = '';  
  alertaTipo: string = '';     
  alertaVisible: boolean = false; 

  constructor(
    private perfilService: PerfilService, 
    private alertCtrol: AlertController  
  ) {}

  ngOnInit() {
    this.obtenerPerfiles(); 
  }

 
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertirImagenABase64(file);
    }
  }

 
  convertirImagenABase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  cargarPerfil(): void {
    if (!this.nombre || !this.carrera || !this.sede || !this.telefono || !this.direccion || !this.base64) {
      alert('Por favor, ingresa todos los datos (nombre, carrera, sede, teléfono, dirección y la imagen).');
      return;
    }

    const nuevoPerfil: Perfil = {
      nombre: this.nombre,
      carrera: this.carrera,
      sede: this.sede,
      telefono: this.telefono,
      direccion: this.direccion,
      base64: this.base64,  
    };

    this.perfilService.cargarPerfil(nuevoPerfil).subscribe(
      response => {
        console.log('Perfil cargado con éxito:', response);
        this.obtenerPerfiles(); 
        this.mostrarAlerta('Perfil cargado con éxito', 'success');
      },
      error => {
        console.error('Error al cargar el perfil:', error);
        this.mostrarAlerta('Hubo un error al cargar el perfil. Intenta nuevamente.', 'error');
      }
    );
  }


  obtenerPerfiles(): void {
    this.perfilService.obtenerPerfiles().subscribe(
      (perfiles: Perfil[]) => {
        this.perfiles = perfiles; 
      },
      error => {
        console.error('Error al obtener los perfiles:', error);
      }
    );
  }

 
  seleccionarPerfil(perfil: Perfil): void {
    this.perfilSeleccionado = { ...perfil };  
    this.base64 = perfil.base64;             
    this.nombre = perfil.nombre;
    this.carrera = perfil.carrera;
    this.sede = perfil.sede;
    this.telefono = perfil.telefono;
    this.direccion = perfil.direccion;
  }


  actualizarPerfil(): void {
    if (!this.perfilSeleccionado) {
      alert('No has seleccionado un perfil para actualizar.');
      return;
    }

    if (!this.nombre || !this.carrera || !this.sede || !this.telefono || !this.direccion || !this.base64) {
      alert('Por favor, ingresa todos los datos (nombre, carrera, sede, teléfono, dirección y la imagen).');
      return;
    }

    const perfilActualizado: Perfil = {
      id: this.perfilSeleccionado.id, 
      nombre: this.nombre,
      carrera: this.carrera,
      sede: this.sede,
      telefono: this.telefono,
      direccion: this.direccion,
      base64: this.base64,  
    };

    this.perfilService.actualizarPerfil(perfilActualizado).subscribe(
      response => {
        console.log('Perfil actualizado con éxito:', response);
        this.obtenerPerfiles();  
        this.mostrarAlerta('Perfil actualizado con éxito', 'success');
        this.limpiarCampos();  
      },
      error => {
        console.error('Error al actualizar el perfil:', error);
        this.mostrarAlerta('Hubo un error al actualizar el perfil. Intenta nuevamente.', 'error');
      }
    );
  }

 
  mostrarAlerta(mensaje: string, tipo: string): void {
    this.alertaMensaje = mensaje;
    this.alertaTipo = tipo;
    this.alertaVisible = true;

   
    setTimeout(() => {
      this.alertaVisible = false;
    }, 3000); 
  }

 
  limpiarCampos(): void {
    this.base64 = '';
    this.nombre = '';
    this.carrera = '';
    this.sede = '';
    this.telefono = '';
    this.direccion = '';
    this.perfilSeleccionado = null;  
  }


  eliminarPerfil(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este perfil?')) {
      this.perfilService.eliminarPerfil(id).subscribe(
        () => {
          
          this.perfiles = this.perfiles.filter(perfil => perfil.id !== id);
          this.mostrarAlerta('Perfil eliminado con éxito', 'success');
        },
        (error) => {
          console.error('Error al eliminar el perfil', error);
          this.mostrarAlerta('Hubo un error al eliminar el perfil. Intenta nuevamente.', 'error');
        }
      );
    }
  }
}
