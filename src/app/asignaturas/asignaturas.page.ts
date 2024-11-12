import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../services/registros.service'; 
import { Registros } from 'src/interfaces/registros';  
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {



  nombre: string = '';
  descripcion: string = '';
  asignatura: string = '';
  fecha: string = '';  
  profesor: string = '';
  qrData: string = ''; 
  rut: string = '';
  correo: string = '';
  imagenBase64: string = ''; 


  registros: Registros[] = [];
  registroSeleccionado: Registros | null = null;  


  alertaMensaje: string = '';  
  alertaTipo: string = '';     
  alertaVisible: boolean = false; 

  constructor(
    private registrosService: RegistrosService,  
    private alertCtrl: AlertController  
  ) {}

  ngOnInit() {
    this.obtenerRegistros(); 
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


  cargarRegistro(): void {
    if (!this.nombre || !this.descripcion || !this.asignatura || !this.profesor || !this.rut || !this.correo || !this.imagenBase64) {
      alert('Por favor, ingresa todos los datos (nombre, descripción, asignatura, fecha, profesor, RUT, correo y la imagen).');
      return;
    }

    const fechaLocal = new Date().toLocaleString();

    const nuevoRegistro: Registros = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      asignatura: this.asignatura,
      fecha: fechaLocal, 
      profesor: this.profesor,
      qrData: this.qrData, 
      rut: this.rut,
      correo: this.correo,
      imagenBase64: this.imagenBase64, 
    };

    this.registrosService.cargarRegistro(nuevoRegistro).subscribe(
      response => {
        console.log('Registro cargado con éxito:', response);
        this.obtenerRegistros(); 
        this.mostrarAlerta('Registro cargado con éxito', 'success');
      },
      error => {
        console.error('Error al cargar el registro:', error);
        this.mostrarAlerta('Hubo un error al cargar el registro. Intenta nuevamente.', 'error');
      }
    );
  }


  obtenerRegistros(): void {
    this.registrosService.obtenerRegistros().subscribe(
      (registros: Registros[]) => {
        this.registros = registros; 
      },
      error => {
        console.error('Error al obtener los registros:', error);
      }
    );
  }

  seleccionarRegistro(registro: Registros): void {
    this.registroSeleccionado = { ...registro };  
    this.imagenBase64 = registro.imagenBase64;
    this.nombre = registro.nombre;
    this.descripcion = registro.descripcion;
    this.asignatura = registro.asignatura;
    this.fecha = registro.fecha;
    this.profesor = registro.profesor;
    this.qrData = registro.qrData;
    this.rut = registro.rut;
    this.correo = registro.correo;
  }



  actualizarRegistro(): void {
    if (!this.registroSeleccionado) {
      alert('No has seleccionado un registro para actualizar.');
      return;
    }

    if (!this.nombre || !this.descripcion || !this.asignatura ||  !this.profesor || !this.rut || !this.correo || !this.imagenBase64) {
      alert('Por favor, ingresa todos los datos (nombre, descripción, asignatura, fecha, profesor, RUT, correo y la imagen).');
      return;
    }
    const fechaLocal = new Date().toLocaleString();
    const registroActualizado: Registros = {
      id: this.registroSeleccionado.id,  
      nombre: this.nombre,
      descripcion: this.descripcion,
      asignatura: this.asignatura,
      fecha: fechaLocal, 
      profesor: this.profesor,
      qrData: this.qrData,
      rut: this.rut,
      correo: this.correo,
      imagenBase64: this.imagenBase64,  
    };

    this.registrosService.actualizarRegistro(registroActualizado).subscribe(
      response => {
        console.log('Registro actualizado con éxito:', response);
        this.obtenerRegistros();  
        this.mostrarAlerta('Registro actualizado con éxito', 'success');
        this.limpiarCampos();  
      },
      error => {
        console.error('Error al actualizar el registro:', error);
        this.mostrarAlerta('Hubo un error al actualizar el registro. Intenta nuevamente.', 'error');
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
    this.nombre = '';
    this.descripcion = '';
    this.asignatura = '';
    this.fecha = '';
    this.profesor = '';
    this.qrData = '';
    this.rut = '';
    this.correo = '';
    this.registroSeleccionado = null;  
  }

  eliminarRegistro(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.registrosService.eliminarRegistro(id).subscribe(
        () => {
       
          this.registros = this.registros.filter(registro => registro.id !== id);
          this.mostrarAlerta('Registro eliminado con éxito', 'success');
        },
        (error) => {
          console.error('Error al eliminar el registro', error);
          this.mostrarAlerta('Hubo un error al eliminar el registro. Intenta nuevamente.', 'error');
        }
      );
    }
  }
}