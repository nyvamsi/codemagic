import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DgpsclientPage } from './dgpsclient.page';

const routes: Routes = [
  {
    path: 'dgpsclient',
    component: DgpsclientPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'mapv2',
        loadChildren: () => import('../mapv2/mapv2.module').then(m => m.Mapv2PageModule)
      },
      {
        path: '',
        redirectTo: '/dgpsclient/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dgpsclient/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DgpsclientPageRoutingModule {}
