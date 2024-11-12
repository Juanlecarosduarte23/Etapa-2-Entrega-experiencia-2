import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage {

  constructor(private toastController: ToastController, private alertController: AlertController) {}



  async limpiarSessionStorage() {
    sessionStorage.clear();
    const toast = await this.toastController.create({
      message: 'Se ha cerrado sesión correctamente',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
