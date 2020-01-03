import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { SkillsComponent } from "./skills/skills.component";
import { BadgeComponent } from "./badge/badge.component";
import { ProfileResolverService } from "./profile-resolver.service";
import { PaymentMethodsComponent } from "./payment-method/payment-method.component";
const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    children: [
      {
        path: "",
        children: [
          { path: "", redirectTo: "update-account", pathMatch: "full" },
          { path: "change-password", component: ChangePasswordComponent },
          {
            path: "update-account",
            component: UpdateProfileComponent,
            resolve: { account: ProfileResolverService }
          },
          { path: "skills", component: SkillsComponent },
          { path: "badge", component: BadgeComponent },
          { path: "payment-method", component: PaymentMethodsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileResolverService]
})
export class ProfileRoutingModule {}
