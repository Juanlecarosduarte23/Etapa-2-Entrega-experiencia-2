import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-ajuste',
  templateUrl: './ajuste.page.html',
  styleUrls: ['./ajuste.page.scss'],
})
export class AjustePage  {

  constructor(private menucontroller:MenuController) {}

  mostrarMenu(){
    this.menucontroller.open('first');
  }

}