import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { environment } from '../../../environments/environment';
import { ITaskResponse, PostTaskDialogService } from "../../shared/dialogs/post-task-dialog/post-task-dialog.service";

@Component({
  selector: "taskina-dashboard-header",
  templateUrl: "./dashboard-header.html",
  styleUrls: ["./dashboard-header.scss"]
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {

  thumbnailImageName = localStorage.getItem(environment.storage.auth.thumbnailImageName);
  profile_pic_alt = localStorage.getItem(environment.storage.auth.profile_pic_alt);


  @Output() data = new EventEmitter();
  search_term: string;
  allTasks: ITaskResponse[];
  filteredTasks: any;
  loggedInUser = {
    first_name: localStorage.getItem(environment.storage.auth.firstName),
    last_name: localStorage.getItem(environment.storage.auth.lastName),
    profile_pic: localStorage.getItem(environment.storage.auth.thumbnailImageName)
  };
  constructor(
    private authServc: AuthService,
    private route: Router,
    private postTaskSvc: PostTaskDialogService,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document, ) {
    this.document.body.classList.add('blue-bg');
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: ParamMap) => {
        this.search_term = params["search_term"];
    });

  }
  public get isLoggedIn() {
    return this.authServc.isLoggedIn;
  }

  logout() {
    this.authServc.logout();
    this.route.navigate(["/"]);
  }
  postTaskDialog() {
    this.postTaskSvc.showDialog("Tell us what you need done?");
  }

  performFilter(event) {
    if (this.search_term) {
      this.search_term = this.search_term.toLocaleLowerCase();
    } else {
      this.search_term = '';
    }
    /*if (this.route.url.indexOf('/tasks/') != -1 && this.route.url.indexOf('/tasks/browse') == -1) { 
      //todo deepak
      if (this.route.url.indexOf('/tasks/posted') != -1) {
        this.route.navigate(['/tasks/', 'posted'], { queryParams: { search_term: this.search_term } });
      } else if (this.route.url.indexOf('/tasks/assigned') != -1) {
        this.route.navigate(['/tasks/', 'assigned'], { queryParams: { search_term: this.search_term } });
      }  else if (this.route.url.indexOf('/tasks/pending') != -1) {
        this.route.navigate(['/tasks/', 'pending'], { queryParams: { search_term: this.search_term } });
      } else if (this.route.url.indexOf('/tasks/completed') != -1) {
        this.route.navigate(['/tasks/', 'completed'], { queryParams: { search_term: this.search_term } });
      } else {
        this.route.navigate(['/tasks/', 'all'], { queryParams: { search_term: this.search_term } });
      }
    //this.data.emit(this.search_term);
    } else {
      this.route.navigate(['/browse-tasks/'], { queryParams: { search_term: this.search_term } });
    }*/
    this.route.navigate(['/browse-tasks/'], { queryParams: { search_term: this.search_term } });
  }

  ngOnDestroy() {
    this.document.body.classList.remove('blue-bg');
  }
}

