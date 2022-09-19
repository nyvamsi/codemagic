import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DgpsclientPageRoutingModule } from './dgpsclient-routing.module';

import { DgpsclientPage } from './dgpsclient.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DgpsclientPageRoutingModule
  ],
  declarations: [DgpsclientPage]
})
export class DgpsclientPageModule {}
