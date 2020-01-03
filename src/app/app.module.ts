import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/no-auth.guard";
import { AuthService } from "./services/auth.service";
import { MyHttpInterceptor } from "./guards/my-http-interceptor";
import { AuthTokenInterceptor } from "./guards/auth-token.interceptor";
import { ServerOfflineInterceptor } from "./guards/server-offline.interceptor";

// Imports of ngxbootstrap
import { ModalModule } from "ngx-bootstrap";
import { AccordionModule } from "ngx-bootstrap";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { ErrorPageComponent } from "./shared/components/error-page/error-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppConfigService } from "./app-config.service";
import { ViewTaskModule } from "./view-task-page/view-task-page.module";
import { LoaderService } from "./shared/services/loader.service";
import { PostTaskDialogService } from "./shared/dialogs/post-task-dialog/post-task-dialog.service";
import { ProfileModule } from "./profile/profile.module";
import { ProfileService } from "./profile/profile.service";
import {
  HashLocationStrategy,
  Location,
  LocationStrategy
} from "@angular/common";
// import { DatePipe} from '@angular/common';

import { SocialLoginModule } from "./Auth/social/sociallogin.module";
import { AuthServiceConfig } from "./Auth/social/social.auth.service";
import { FacebookLoginProvider } from "./Auth/social/providers/facebook-login-provider";
import { GoogleLoginProvider } from "./Auth/social/providers/google-login-provider";
import { environment } from "../environments/environment";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.social.googleOAuthId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.social.facebookAppId)
  }
]);

export function provideConfig() {
  return config;
}

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

const ServerOfflineInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServerOfflineInterceptor,
  multi: true
};

const AuthTokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenInterceptor,
  multi: true
};

const MyHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MyHttpInterceptor,
  multi: true
};
const AppConfigServiceProvider = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFn,
  multi: true,
  deps: [AppConfigService]
};

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent

    //  UpdateProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ViewTaskModule,
    ProfileModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    SocialLoginModule,
    ModalModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    NoAuthGuard,
    AppConfigService,
    AppConfigServiceProvider,
    ServerOfflineInterceptorProvider,
    AuthTokenInterceptorProvider,
    MyHttpInterceptorProvider,
    LoaderService,
    PostTaskDialogService,
    ProfileService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
