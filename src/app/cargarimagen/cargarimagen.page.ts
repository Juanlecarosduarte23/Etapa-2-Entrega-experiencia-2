import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../services/imagen.service';
import { Imagen } from 'src/interfaces/imagen';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cargarimagen',
  templateUrl: './cargarimagen.page.html',
  styleUrls: ['./cargarimagen.page.scss'],
})
export class CargarimagenPage implements OnInit {

  imagenBase64: string = '';  
  nombreImagen: string = '';
  descripcion: string = '';
  asignatura: string = '';  
  profesor: string = '';    
  fecha: string = '';       
  imagenes: Imagen[] = [];  
  imagenSeleccionada: Imagen | null = null;  


  alertaMensaje: string = ''; 
  alertaTipo: string = '';    
  alertaVisible: boolean = false; 

  constructor(private imagenService: ImagenService, private alertController: AlertController) {}

  ngOnInit() {
    this.obtenerImagenes(); 
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
      this.imagenBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

 
  cargarImagen(): void {
    if (!this.nombreImagen || !this.descripcion || !this.imagenBase64 || !this.asignatura || !this.profesor) {
      alert('Por favor, ingresa todos los datos (nombre, descripción, asignatura, profesor y la imagen).');
      return;
    }


    const fechaLocal = new Date().toLocaleString();

    const nuevaImagen: Imagen = {
      base64: this.imagenBase64,
      nombre: this.nombreImagen,
      descripcion: this.descripcion,
      asignatura: this.asignatura,
      profesor: this.profesor,
      fecha: fechaLocal, 
    };

    this.imagenService.cargarImagen(nuevaImagen).subscribe(
      response => {
        console.log('Imagen cargada con éxito:', response);
        this.obtenerImagenes(); 
        this.mostrarAlerta('Imagen cargada con éxito', 'success');
      },
      error => {
        console.error('Error al cargar la imagen:', error);
        this.mostrarAlerta('Hubo un error al cargar la imagen. Intenta nuevamente.', 'error');
      }
    );
  }


  obtenerImagenes(): void {
    this.imagenService.obtenerImagenes().subscribe(
      (imagenes: Imagen[]) => {
        this.imagenes = imagenes; 
      },
      error => {
        console.error('Error al obtener las imágenes:', error);
      }
    );
  }

  
  seleccionarImagen(imagen: Imagen): void {
    this.imagenSeleccionada = { ...imagen };  
    this.imagenBase64 = imagen.base64;        
    this.nombreImagen = imagen.nombre;
    this.descripcion = imagen.descripcion;
    this.asignatura = imagen.asignatura;
    this.profesor = imagen.profesor;
    this.fecha = imagen.fecha; 
  }


  actualizarImagen(): void {
    if (!this.imagenSeleccionada) {
      alert('No has seleccionado una imagen para actualizar.');
      return;
    }

    if (!this.nombreImagen || !this.descripcion || !this.imagenBase64 || !this.asignatura || !this.profesor) {
      alert('Por favor, ingresa todos los datos (nombre, descripción, asignatura, profesor y la imagen).');
      return;
    }

  
    const fechaLocal = new Date().toLocaleString();

    const imagenActualizada: Imagen = {
      id: this.imagenSeleccionada.id, 
      base64: this.imagenBase64,
      nombre: this.nombreImagen,
      descripcion: this.descripcion,
      asignatura: this.asignatura,
      profesor: this.profesor,
      fecha: fechaLocal, 
    };

    this.imagenService.actualizarImagen(imagenActualizada).subscribe(
      response => {
        console.log('Imagen actualizada con éxito:', response);
        this.obtenerImagenes(); 
        this.mostrarAlerta('Imagen actualizada con éxito', 'success');
        this.limpiarCampos();  
      },
      error => {
        console.error('Error al actualizar la imagen:', error);
        this.mostrarAlerta('Hubo un error al actualizar la imagen. Intenta nuevamente.', 'error');
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
    this.imagenBase64 = '';
    this.nombreImagen = '';
    this.descripcion = '';
    this.asignatura = '';
    this.profesor = '';
    this.fecha = '';
    this.imagenSeleccionada = null;  
  }

  
  eliminarImagen(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
      this.imagenService.eliminarImagen(id).subscribe(
        () => {
         
          this.imagenes = this.imagenes.filter(imagen => imagen.id !== id);
          this.mostrarAlerta('Imagen eliminada con éxito', 'success');
        },
        (error) => {
          console.error('Error al eliminar la imagen', error);
          this.mostrarAlerta('Hubo un error al eliminar la imagen. Intenta nuevamente.', 'error');
        }
      );
    }
  }


 
  
}






