import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostTaskDialogService } from 'src/app/shared/dialogs/post-task-dialog/post-task-dialog.service';
import { LoginDialogService } from '../../Auth/login/login-dialog.service';
import { SignupDialogService } from '../../Auth/signup/signup-dialog.service';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'taskina-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../shared/styles/auth.scss']
})
export class HeaderComponent implements OnInit {
  public isToggle = false;
  constructor(public authServc: AuthService,
    private route: Router,
    private loginDialogSvc: LoginDialogService,
    private signupDialogSvc: SignupDialogService,
    private postTaskSvc: PostTaskDialogService,
    public tasksvc: TaskService ) { }

  public get isLoggedIn() {
    return this.authServc.isLoggedIn;
  }

  logout() {
    this.authServc.logout();
    this.route.navigate(['/']);
  }
  ngOnInit() {
  }
  toggle(valid: boolean) {
    this.isToggle = valid;
  }

  loginDialog() {
    this.loginDialogSvc.showDialog('Log in to your account');
    if (this.authServc.isLoggedIn) {
      this.postTaskSvc.showDialog('Tell us what you need done?');
    }

  }

  signupDialog() {
    this.signupDialogSvc.showDialog('Join Us');
  }

  postTaskDialog() {
    if (this.authServc.isLoggedIn) {
      this.postTaskSvc.showDialog('Tell us what you need done?');
    }
    else {
      localStorage.setItem('dialogToshow', 'postTask');
      this.loginDialog();
    }

  }
  browseTask() {
    if (this.authServc.isLoggedIn) {
      this.route.navigateByUrl('/browse-tasks');
    }
    else {
      localStorage.setItem('dialogToshow', 'browseTask');
      this.loginDialog();
    }
  }

  getcategory(){
    this.tasksvc.getCategories().subscribe(r => {
    
    })
  }
}
