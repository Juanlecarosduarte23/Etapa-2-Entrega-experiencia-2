import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { BannerComponent } from '../banner/banner.component';
import { ApidatosService } from '../services/apidatos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, BannerComponent],
})
export class HomePage implements OnInit {


  posteos:any[]=[]       
  usuario:any;

  slides: any[] = [];
  
  constructor(private menucontroller: MenuController,
    private apidatos: ApidatosService) {
  }

  ngOnInit(): void {
    this.slides = [
      {banner: 'assets/check2.avif'},
      {banner: 'assets/qr.avif'},
      {banner: 'assets/duoc.jpeg'},
    ];

    this.usuario = sessionStorage.getItem('username');
    console.log(this.usuario);
  }
  
 
  
  mostrarMenu(){
    this.menucontroller.open('first');
  }



}
  

