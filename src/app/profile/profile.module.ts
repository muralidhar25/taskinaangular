import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DatepickerModule, BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SharedModule } from "../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileService } from "../services/profile.service";
import { ReactiveFormsModule } from "@angular/forms";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { SkillsComponent } from "./skills/skills.component";
import { BadgeComponent } from "./badge/badge.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { PaymentMethodsComponent } from "./payment-method/payment-method.component";
import { PaymentMethodsService } from "./payment-method/payment-methods.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DatepickerModule,
    BsDatepickerModule
  ],
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    SkillsComponent,
    BadgeComponent,
    PaymentMethodsComponent
  ],
  exports: [
    ProfileComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    SkillsComponent,
    BadgeComponent
  ],
  providers: [ProfileService, PaymentMethodsService]
})
export class ProfileModule {}
