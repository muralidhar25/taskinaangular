import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseTaskComponent } from './browse-task.component';

const routes: Routes = [{ path: "", component: BrowseTaskComponent }];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BrowseTaskRoutingModule {}
