import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './Servicios/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./Access/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./Access/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./Access/principal/principal.module').then( m => m.PrincipalPageModule),
    canActivate:[authGuard]
  },  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'mantenedor',
    loadChildren: () => import('./admin/mantenedor/mantenedor.module').then( m => m.MantenedorPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./admin/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./admin/modificar/modificar.module').then( m => m.ModificarPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
