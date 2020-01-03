import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginDialogService } from 'src/app/Auth/login/login-dialog.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostTaskDialogService } from '../../dialogs/post-task-dialog/post-task-dialog.service';
@Component({
  selector: 'taskina-banner',
  templateUrl: './bannerSection.component.html',
  styleUrls: ['./style.scss']
})
export class BannerSectionComponent implements OnInit {
  @ViewChild('slide') owlSlider: ElementRef;

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
  nextSlide() {
    let el = this.owlSlider.nativeElement;
    let nextButton = el.querySelector('div.owl-next') as HTMLElement;
    nextButton.click();
  }
  previousSlide() {
    let el = this.owlSlider.nativeElement;
    let prevButton = el.querySelector('div.owl-prev') as HTMLElement;
    prevButton.click();
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

  loginDialog() {
    this.loginDialogSvc.showDialog('Log in to your account');
    if (this.authServc.isLoggedIn) {
      this.postTaskSvc.showDialog('Tell us what you need done?');
    }

  }

  constructor(private authServc: AuthService,
    private postTaskSvc: PostTaskDialogService,
    private loginDialogSvc: LoginDialogService) { }
  ngOnInit() {
  }

}
