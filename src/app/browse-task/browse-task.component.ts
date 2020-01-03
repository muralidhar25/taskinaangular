import { Component, Input } from "@angular/core";
import { LoaderService } from '../shared/services/loader.service';
import { ViewTaskService } from '../view-task-page/view-task-page.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: "taskina-browse-task",
  templateUrl: "./browse-task.component.html",
  styleUrls: ["./browse-task.component.scss"]
})
export class BrowseTaskComponent {
  @Input() taskFilter;
  @Input()
  title = "Browse Tasks !";
  list: any;
  taskList: any;
  filteredTasks: any;
  searchTerm: string;
  loading: boolean = true;
  filterRequest: any = {};
  filterApplied: string;

  // filteredTasks: any;
  constructor(
    private loaderService: LoaderService,
    private viewTaskSvc: ViewTaskService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.filterObserver();
    this.activatedRoute.queryParams.subscribe((params: ParamMap) => {
      if (this.searchTerm != params["search_term"]) {
        this.searchTerm = params["search_term"];
      }
      // this.filterApplied = params["filterApplied"];

      // if (this.filterApplied === "true") {
      //   this.filterRequest = JSON.parse(window.localStorage.getItem("filterRequest"));
      // } else {
      //   window.localStorage.removeItem("filterRequest");
      // }

      this.searchTask();
    });
  }

  filterObserver() {
    this.viewTaskSvc.filterObservable$.subscribe(data=> {
      this.filterRequest = JSON.parse(data);
      this.searchTask();
    });
  }

  searchTask() {
    console.log("come here searchTask method=================");
    this.loaderService.show();
    this.loading = true;
    this.filterRequest.search = this.searchTerm;
    this.viewTaskSvc.searchTasks(this.filterRequest).subscribe(res => {
      this.filteredTasks = res.result;
      this.loaderService.hide();
      this.loading = false;
    });
  }

}
