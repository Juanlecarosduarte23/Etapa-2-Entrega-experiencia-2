import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargarimagenPageRoutingModule } from './cargarimagen-routing.module';

import { CargarimagenPage } from './cargarimagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargarimagenPageRoutingModule
  ],
  declarations: [CargarimagenPage]
})
export class CargarimagenPageModule {}
