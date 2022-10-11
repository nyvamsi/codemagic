import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mapv2Page } from './mapv2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Mapv2PageRoutingModule } from './mapv2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Mapv2Page }]),
    Mapv2PageRoutingModule,
  ],
  declarations: [Mapv2Page]
})
export class Mapv2PageModule {}
