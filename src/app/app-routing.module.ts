import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/no-auth.guard";
import { ErrorPageComponent } from "./shared/components/error-page/error-page.component";
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        pathMatch: "full",
        loadChildren: "./home/home.module#HomeModule",
        canActivate: [NoAuthGuard]
      },
      {
        path: "how-it-works",
        loadChildren: "./how-it-works/how-it-works.module#HowItWorksModule",
        canActivate: [NoAuthGuard]
      },
      {
        path: "browse-tasks",
        loadChildren: "./browse-task/browse-task.module#BrowseTaskModule",
        canActivate: [AuthGuard]
      },
      {
        path: "dashboard",
        loadChildren: "./dashboard/dashboard.module#DashboardModule",
        canActivate: [AuthGuard]
      },
      {
        path: "tasks/:task-filter/:slug",
        loadChildren: "./view-task-page/view-task-page.module#ViewTaskModule",
        canActivate: [AuthGuard]
        // component: ViewTaskComponent,
        // resolve: {
        //   cres: PostTaskDialogService
        // }
      },
      {
        path: "tasks/:task-filter",
        loadChildren: "./view-task-page/view-task-page.module#ViewTaskModule",
        canActivate: [AuthGuard]
      },
      {
        path: "profile",
        loadChildren: "./profile/profile.module#ProfileModule",
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: "error_404",
    component: ErrorPageComponent
  },
  {
    path: "**",
    redirectTo: "error_404",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
