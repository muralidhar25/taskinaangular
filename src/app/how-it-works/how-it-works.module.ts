import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HowItWorksRoutingModule } from './how-it-works-routing.module';
import { HowItWorksComponent } from './how-it-works.component';



@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    HowItWorksRoutingModule,
    SharedModule
  ],
  declarations: [
    HowItWorksComponent
  ],
  exports: [ 
    HowItWorksComponent 
  ],
  providers: [

  ]
})
export class HowItWorksModule {}
