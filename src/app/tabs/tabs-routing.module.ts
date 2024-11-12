import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AutorizadoGuard } from '../guards/autorizado.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      
       
     
     
      {
        path: 'ajuste',
        loadChildren: () => import('../ajuste/ajuste.module').then( m => m.AjustePageModule),
        canActivate:[AutorizadoGuard]
      },

    
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
        canActivate:[AutorizadoGuard]
      },
     

      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then((m) => m.HomePage),
        canActivate:[AutorizadoGuard]
      },
      {
        path: 'sesion',
        loadChildren: () => import('../sesion/sesion.module').then( m => m.SesionPageModule),
        canActivate:[AutorizadoGuard]
      },

   
     
      {
        path: 'asignaturas',
        loadChildren: () => import('../asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule),
        canActivate:[AutorizadoGuard]
      },

      

      {
        path: 'cargarimagen',
        loadChildren: () => import('../cargarimagen/cargarimagen.module').then( m => m.CargarimagenPageModule)
      },
      {
        path: 'qr',
        loadChildren: () => import('../qr/qr.module').then( m => m.QrPageModule)
      },
    
     
     

     
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
