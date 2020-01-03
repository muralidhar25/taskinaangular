import { Component, OnInit, ElementRef } from '@angular/core';
import { BaseDialogComponent } from 'src/app/shared/dialogs/BaseDialogComponent';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { IConfirmOffer, ViewTaskService } from '../view-task-page.service';
import { ISubscription } from 'rxjs/Subscription';
import { MakeAnOfferDialogService } from './make-an-offer.service';
import { ProfileDialogService } from 'src/app/shared/dialogs/Profile-dialog/profile-dialog.service';
import { AuthService } from '../../../app/services/auth.service';
import { Subject } from "rxjs/Subject";
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'make-an-offer',
  templateUrl: './make-an-offer.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class MakeAnOfferComponent extends BaseDialogComponent<IConfirmOffer> {

   

  dialogSub: ISubscription;
  title: string;
  selectedFile:File;
  isLoaded: boolean;
  private showDialogSource = new Subject<string>();
  public showDialog$ = this.showDialogSource.asObservable();
  



  constructor(el: ElementRef, 
              private viewTaskSvc: ViewTaskService,
               private makeAnOfferSvc: MakeAnOfferDialogService,
              private profileSvc: ProfileDialogService,
              private authSvc: AuthService,
              private router: Router
              
              ) { 
    super(IConfirmOffer, el, null )
    this.dialogSub = this.makeAnOfferSvc.showDialog$.subscribe(title => {
      this.title = title;
      this.showDialog();

    });
  }
  showDialog1(title: string) {
  
    this.showDialogSource.next(title);
  }
 
  private get getProfileImg() {
     return this.authSvc.thumbnailImageName;
  }



  ngOnInit() {
 
  }

}
