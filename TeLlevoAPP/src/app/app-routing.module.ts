import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './Servicios/auth.guard';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./Access/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./Access/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./Access/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [authGuard]
  },


  {
    path: 'mantenedor',
    loadChildren: () => import('./admin/mantenedor/mantenedor.module').then(m => m.MantenedorPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./admin/modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./admin/modificar/modificar.module').then(m => m.ModificarPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule)
  },
  {
    path: 'actividad',
    loadChildren: () => import('./Access/actividad/actividad.module').then( m => m.ActividadPageModule)
  },

  

  

  

  /* {
    path: 'perfil',
    loadChildren: () => import('./Access/perfil/perfil.module').then( m => m.PerfilPageModule)
  }, */


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
