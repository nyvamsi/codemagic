import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Mapv2Page } from './mapv2.page';

const routes: Routes = [
  {
    path: '',
    component: Mapv2Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Mapv2PageRoutingModule {}
