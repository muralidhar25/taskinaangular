import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerSectionComponent } from "./components/banner-section/bannerSection.Component";
import { FeaturedCategoryComponent } from "./components/featured-category/featuredCategory.component";
import { RouterModule } from "@angular/router";
import { CarouselModule } from "ngx-owl-carousel-o";
import { DialogModule, SliderModule, OverlayPanelModule, InputSwitchModule } from "primeng/primeng";
import { ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/primeng";
import { RatingModule } from 'primeng/primeng';
import { FormsModule } from "@angular/forms";
import { DatepickerModule, BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { DatePipe } from '@angular/common';

//Layout Components
import { HeaderComponent } from "../layouts/header/header.component";
import { FooterComponent } from "../layouts/footer/footer.component";
import { ActionsHeaderComponent } from "../layouts/actions-header/actions-header";
import { DashboardHeaderComponent } from "../layouts/dashboard-header/dashboard-header";

//Component
import { LoginDialogComponent } from "../Auth/login/login-dialog.component";
import { SignupDialogComponent } from "../Auth/signup/signup-dialog.component";
import { ForgotDialogComponent } from "../Auth/forgot-password/dialog.component";
import { ErrorDialogComponent } from "./dialogs/error-dialog/dialog.component";
import { ActivitiesComponent } from "./components/activities/activities.component";
import { ProfileDialogComponent } from "./dialogs/Profile-dialog/profile.component";
import { UsingTaskinaComponent } from "./components/using-taskina/using-taskina.component";
import { TaskersComponent } from "./components/taskers/taskers.component";
import { OpportunitiesComponent } from "./components/opportunities/opportunities.component";
import { JoinTaskinaComponent } from "./components/join-taskina/join-taskina.component";
import { ConfirmationDialogComponent } from "./dialogs/confirmation-dialog/confirmation-dialog.component";
import { StepCountComponent } from "./dialogs/stepCount/stepCount.component";
import { AfterSignupComponent } from "../Auth/signup/after-signup/after-signup-dialog.component";


//POST TASK DIALOG COMPONENTS
import { PostTaskDialogComponent } from "./dialogs/post-task-dialog/post-task-dialog.component";
import { TellUsStepComponent } from "./dialogs/post-task-dialog/tell-us-step-1/tell-us-step-1.component";
import { SuggestHowMuchComponent } from "./dialogs/post-task-dialog/suggest-how-step-3/suggest-how-step-3.component";
import { SayWhereStepComponent } from "./dialogs/post-task-dialog/say-where-step-2/say-where-step-2.component";
import { TaskPostedStepComponent } from "./dialogs/post-task-dialog/task-posted-step-4/task-posted-step-4.component";
import { MakeAnOfferComponent } from '../view-task-page/make-an-offer/make-an-offer.component';

//PROFILE DIALOG COMPONENTS
import { ProfileUploadComponent } from "./dialogs/Profile-dialog/upload-image-step-1/upload-image-step-1.component";
import { ProfileSkillAddComponent } from "./dialogs/Profile-dialog/add-skills-step-2/add-skills-step-2.component";
import { ProfileMobileComponent } from "./dialogs/Profile-dialog/add-mobileno-step-3/add-mobileno-step-3.component";
import { ProfileTellUsMoreComponent } from "./dialogs/Profile-dialog/tellus-more-step-4/tellus-more-step-4.component";
import { ProfileGoodToGoComponent } from "./dialogs/Profile-dialog/good-to-go-step-6/good-to-go-step-6.component";
import { ProfileGettingPaidComponent } from "./dialogs/Profile-dialog/getting-paid-step-5/getting-paid-step-5.component";

//Services
import { LoginDialogService } from "../Auth/login/login-dialog.service";
import { SignupDialogService } from "../Auth/signup/signup-dialog.service";
import { ForgotDialogService } from "../Auth/forgot-password/dialog.service";
import { ProfileService } from "../services/profile.service";
import { ProfileDialogService } from "./dialogs/Profile-dialog/profile-dialog.service";
import { TaskService } from "../services/task.service";
import { ConfirmationDialogService } from "./dialogs/confirmation-dialog/confirmation-dialog.service";
import { AfterSignupService } from "../Auth/signup/after-signup/after-signup-dialog.service";
import { ErrorDialogService } from "./dialogs/error-dialog/error-dialog.service";
import { NgxMaskModule } from "ngx-mask";
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { TaskinaLoaderComponent } from './components/taskina-loader/taskina-loader.component';
import { MakeAnOfferDialogService } from '../view-task-page/make-an-offer/make-an-offer.service';
import { AvatarComponent } from './components/avatar/avatar.component';
import { TaskNorecordComponent } from './components/task-norecord/task-norecord';

let SHARED_MODULES = [
  BannerSectionComponent,
  FeaturedCategoryComponent,
  HeaderComponent,
  FooterComponent,
  LoginDialogComponent,
  SignupDialogComponent,
  ForgotDialogComponent,
  ErrorDialogComponent,
  ActivitiesComponent,
  UsingTaskinaComponent,
  TaskersComponent,
  OpportunitiesComponent,
  JoinTaskinaComponent,
  PostTaskDialogComponent,
  ProfileDialogComponent,
  TellUsStepComponent,
  SuggestHowMuchComponent,
  SayWhereStepComponent,
  TaskPostedStepComponent,
  ConfirmationDialogComponent,
  AfterSignupComponent,
  ProfileUploadComponent,
  ProfileSkillAddComponent,
  ProfileMobileComponent,
  ProfileTellUsMoreComponent,
  ProfileGettingPaidComponent,
  ProfileGoodToGoComponent,
  StepCountComponent,
  ActionsHeaderComponent,
  DashboardHeaderComponent,
  ReadMoreComponent,
  TaskinaLoaderComponent,
  MakeAnOfferComponent,
  AvatarComponent,
  TaskNorecordComponent
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CarouselModule,
    DialogModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    RatingModule,
    SliderModule,
    OverlayPanelModule,
    InputSwitchModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    
  ],
  declarations: [
    SHARED_MODULES
  ],
  exports: [
    SHARED_MODULES
  ],

  providers: [
    LoginDialogService,
    SignupDialogService,
    ForgotDialogService,
    HeaderComponent,
    ProfileDialogService,
    ProfileService,
    ConfirmationDialogService,
    ErrorDialogService,
    TaskService,
    AfterSignupService,
    MakeAnOfferDialogService,
    DatePipe
  ]
})
export class SharedModule { }
