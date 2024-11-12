import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { register } from 'swiper/element/bundle';

register();


interface Menu{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu:Menu[]=[
    {
      icon:'home-outline',
      name: 'Iniciar Sesión',
      redirecTo: 'inicio'
    },
    {
      icon:'qr-code-outline',
      name: 'Generar QR',
      redirecTo: '/tabs/qr'
    }, 
    {
      icon:'id-card-outline',
      name: 'Mis asistencias',
      redirecTo: '/tabs/asignaturas'
    }, 
    {
      icon:'person-outline',
      name: 'Mi Perfil',
      redirecTo: '/tabs/perfil'
    },   
    {
      icon:'settings-outline',
      name: 'Configuración',
      redirecTo: '/tabs/ajuste'
    },
    
   

    {
      icon:'document-text-outline',
      name: 'Justificar Asistencia',
      redirecTo: '/tabs/cargarimagen'
    },


    {
      icon:'exit-outline',
      name: 'Salir',
      redirecTo: '/tabs/sesion'
    },
  ]

  constructor() {}
}