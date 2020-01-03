// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  siteDescription: "",
  siteTitle: "Taskina",
  production: false,
  siteUrl: null,
  siteApiUrl: null,
  intercomKey: null,
  storage: {
    auth: {
      accessToken: "access_token",
      profileId: "profileId",
      thumbnailImageName: "thumbnailImageName",
      loginWithTaskina: "loginWithTaskina",
      refreshtoken: "refresh_token",
      userName: "username",
      isOnTaskinaSite: "isOnTaskinaSite",
      currentProfileId: "currentProfileSysId",
      fullName: "fullname",
      firstName: "firstname",
      lastName: "lastname",
      userSlug: "userSlug",
      profile_pic_alt:"profile_pic_alt"
    }
  },
  social: {
    get googleOAuthId(){
      return  "347072397071-0gbosf8qe9pmsukdmcs4ocph2se8his0.apps.googleusercontent.com";
    },
    get facebookAppId(){
      return  "389314978383687";
    }
  },
  site: {
    get url() {
      return environment.siteUrl;
    },

    get api() {
      return environment.siteApiUrl;
    }
  },
  endpoints: {
    auth: {
      get login() {
        return `${environment.siteApiUrl}/auth/login`;
      },
      get logout() {
        return `${environment.siteApiUrl}/auth/logout`;
      },
      get forgotPassword() {
        return `${environment.siteApiUrl}/password/forgot`;
      },
      get signup() {
        return `${environment.siteApiUrl}/users/`;
      },
      get changePassword() {
        return `${environment.siteApiUrl}/password`;
      },
      get googleAuth() {
        return `${environment.siteApiUrl}/auth/google`;
      },
      get facebookAuth() {
        return `${environment.siteApiUrl}/auth/facebook`;
      }
    },

    profile: {
      get addprofileimage() {
        return `${environment.siteApiUrl}/users/image`;
      },
      get updateInfo() {
        return `${environment.siteApiUrl}/users/info`;
      },
      get updateLocation() {
        return `${environment.siteApiUrl}/data/suburb`;
      },
      get updateAddress() {
        return `${environment.siteApiUrl}/users/address`;
      },

      get updateSkills() {
        return `${environment.siteApiUrl}/users/services`;
      },
      get updateUserInfo() {
        return `${environment.siteApiUrl}/users/about`;
      },
      get updateUserDesc() {
        return `${environment.siteApiUrl}/users/about`;
      },
      get getskills() {
        return `${environment.siteApiUrl}/data/skills`;
      },
      get updateMobileNumber() {
        return `${environment.siteApiUrl}/users/mobile`;
      },
      get addBankAccount() {
        return `${environment.siteApiUrl}/users/bank_account`;
      },
      resendOTP(id: number) {
        return `${environment.siteApiUrl}/users/mobile/otp/resend`;
      },
      verifyOTP(id: number) {
        return `${environment.siteApiUrl}/users/mobile/otp/verify`;
      },

      get updateProfile(){
        return `${environment.siteApiUrl}/users`;
      },
      get userData(){
        
        return `${environment.siteApiUrl}/users/display`;
      }
    },

    tasks: {
      get taskTitle() {
        return `${environment.siteApiUrl}/tasks`;
      },
      tasksData(slug: string) {
        return `${environment.siteApiUrl}/tasks/${slug}/data`;
      },
      tasksBudget(slug: string) {
        return `${environment.siteApiUrl}/tasks/${slug}/budget`;
      },
      taskPosted(slug: string) {
        return `${environment.siteApiUrl}/tasks/${slug}/posted`;
      },
      taskDisplay(slug: string) {
        return `${environment.siteApiUrl}/tasks/${slug}`;
      },
      get taskLocation() {
        return `${environment.siteApiUrl}/data/suburb`;
      },
      get searchTasks() {
        return `${environment.siteApiUrl}/tasks`;
      },
      mineTasks(term: string, searchTerm: string) {
        return `${environment.siteApiUrl}/tasks/mine?filter_by=${term}`;
      },
      get getMyTasks() {
        return `${environment.siteApiUrl}/tasks`
      },
      get getCategories() {
        return `${environment.siteApiUrl}/data/categories`
      },
      cancelTask(slug: string) {
        return `${environment.siteApiUrl}/tasks/${slug}/cancel`
      },
      deleteTask(slug: string) {
        return `${environment.siteApiUrl}/tasks/${slug}`
      },
      followUnfollowTask(slug: string) {
        return `${environment.siteApiUrl}/tasks/${slug}/follow`
      },
      addAttachment(slug: string) {
        return `${environment.siteApiUrl}/tasks/${slug}/attachments`
      }
    },
    offer:{
      offerDetails(slug: string){
        return `${environment.siteApiUrl}/offers/${slug}`
      },
          
      addComment(slug:string){
        return `${environment.siteApiUrl}/offers/${slug}/comments`
      }
    },
    card:{
      get userCard(){
        return `${environment.siteApiUrl}/users/card`
      }
    }
    
  }
};
