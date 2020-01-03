import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/services/loader.service';
import { ViewTaskService } from "./view-task-page.service";

@Component({
  selector: "taskina-view-task",
  templateUrl: "./view-task-page.component.html",
  styleUrls: ["./view-task-page.component.scss"]
})

export class ViewTaskComponent implements OnInit, OnDestroy {

  isMap: boolean = false;
  taskData: Object;
  taskList: any;
  slug: string;
  location: string = null;
  taskFilter: string;
  showBid: boolean = false;
  loading: boolean = true;
  searchTerm: string = "";
  filterRequest: any = {};
  filterApplied: string;

  constructor(
    private viewTaskSvc: ViewTaskService,
    private route: Router,
    private ctor: ActivatedRoute,
    private loaderService: LoaderService
  ) {
  

  }
  ngOnInit() {
    this.filterObserver();

    combineLatest(this.ctor.queryParams, this.ctor.paramMap)
    .subscribe(result => {
      this.loaderService.show();
      const taskFilter = result[1]["params"]["task-filter"];
      this.searchTerm = result[0]['search_term'];

      if (this.taskFilter != taskFilter) {
        this.loading = true;
        this.taskFilter = taskFilter;
        if (this.taskFilter) {
          this.getTask(this.taskFilter);
        }
      }

      this.slug = this.ctor.snapshot.paramMap.get("slug");
      if( this.slug ) {
        this.displayTask(this.slug);
      }
    });

  }

  filterObserver() {
    this.viewTaskSvc.filterObservable$.subscribe(data=> {
      this.loaderService.show();
      this.filterRequest = JSON.parse(data);
      this.getTask("filter");
    });
  }
  onMapChanged(val: boolean) {
    this.isMap = val;
  }
  getTask(term) {
  
    if (term == 'filter') {
      this.filterRequest.search = this.searchTerm;
      this.slug = null;
      this.viewTaskSvc.searchTasks(this.filterRequest).subscribe(res => {
        this.afterSubscription(res);
      });
    }else if (term == 'browse') {
      this.filterRequest.search = this.searchTerm;
      this.viewTaskSvc.searchTasks(this.filterRequest).subscribe(res => {
        this.afterSubscription(res);
      });
    }
    else {
      this.viewTaskSvc.mineTasks(term, this.searchTerm).subscribe(res => {
        this.afterSubscription(res);
      });
    }
  }

  afterSubscription(res: any) {

    this.taskList = res.result;
    if (this.taskList.length == 0) {
      this.loading = false;
      this.taskData = null;
    } else {
      if (this.slug) {
        this.displayTask(this.slug);
      } else if (this.taskList[0]) {
        this.slug = this.taskList[0].slug;
        this.route.navigate(['/tasks/', this.taskFilter, this.slug],
          { queryParams: { search_term: this.searchTerm } });
      }
    }
    this.loaderService.hide();
  }

  displayTask(slug: string) {
    this.viewTaskSvc.taskDisplay(slug).subscribe(res => {
      this.taskData = res;
      this.loading = false;
      this.loaderService.hide();
      this.setShowBid(res.created_by.slug);
    },
      err => {
        this.loaderService.hide();
        this.loading = false;
        console.log(err);
      }
    )
  }

  setShowBid(posted_by_slug) {
    if (posted_by_slug == localStorage.getItem(environment.storage.auth.userSlug)) {
      this.showBid = true;
    }
  }

  ngOnDestroy() { }
}
