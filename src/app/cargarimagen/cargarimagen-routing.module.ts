import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargarimagenPage } from './cargarimagen.page';

const routes: Routes = [
  {
    path: '',
    component: CargarimagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargarimagenPageRoutingModule {}
