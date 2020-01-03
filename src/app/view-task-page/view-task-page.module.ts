import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { TaskDetailComponent } from "./task-detail/task.detail.component";
import { TaskListComponent } from "./task-list/task.list.component";
import { MapComponent } from "./task-map/task-map.component";
import { TaskOfferComponent } from "./task-offer/task.offer.component";
import { TaskTabsComponent } from "./task-tabs/task-tabs";
import { TaskinaLoadingscreen } from "./taskina-loadingscreen/taskina-loadingscreen.component";
import { ViewTaskRoutingModule } from "./view-task-page-routing.module";
import { ViewTaskComponent } from "./view-task-page.component";
import { ViewTaskService } from "./view-task-page.service";
import { RatingModule } from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ViewTaskRoutingModule,
    SharedModule,
    RatingModule
  ],
  declarations: [
    ViewTaskComponent,
    TaskOfferComponent,
    TaskListComponent,
    TaskDetailComponent,
    MapComponent,
    TaskTabsComponent,
    TaskinaLoadingscreen
  ],
  exports: [
    ViewTaskComponent,
    TaskOfferComponent,
    TaskListComponent,
    TaskDetailComponent,
    MapComponent,
    TaskTabsComponent,
    TaskinaLoadingscreen
  ],
  providers: [ViewTaskService]
})
export class ViewTaskModule {}
