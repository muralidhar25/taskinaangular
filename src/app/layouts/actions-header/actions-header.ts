import { Component, EventEmitter, Output } from "@angular/core";
import { AfterSignupService } from 'src/app/Auth/signup/after-signup/after-signup-dialog.service';
import { ViewTaskService } from 'src/app/view-task-page/view-task-page.service';

@Component({
  selector: "taskina-actions-header",
  templateUrl: "./actions-header.html",
  styleUrls: ["./actions-header.scss"]
})
export class ActionsHeaderComponent {
  @Output() onMapChanged = new EventEmitter<boolean>();
  searchedlist = [];

  priceRangeValues: number[] = [5, 9999];

  distanceRangeValues: number = 50;

  location: boolean = false;
  price: boolean = false;
  category: boolean = false;
  filterApplied: boolean = false;

  assigned: boolean = false;;
  type: number;
  remote: boolean = true;
  inperson: boolean = true;
  suburb: any = {};

  filterRequest = {
    assigned: false,
    min_price: 5,
    max_price: 9999,
    type: "",
    suburb: -1,
    distance: 50,
  }

  constructor(
    private viewTaskSvc: ViewTaskService,
    private afterSignupSvc: AfterSignupService) { }

  ngOnInit() { }

  toggleMap(e) {
    this.onMapChanged.emit(e.target.checked);
  }

  bothTypesSelectedOrNot(): boolean {
    return (this.remote && this.inperson || !this.remote && !this.inperson);
  }

  /**
   * This function sets the filter request before sending to the 
   * service in backend.
   */
  setFilterRequest() {

    this.filterRequest.assigned = !this.assigned;
    this.filterRequest.min_price = this.priceRangeValues[0];
    this.filterRequest.max_price = this.priceRangeValues[1];

    if (this.bothTypesSelectedOrNot()) {
      this.filterRequest.type = undefined;
    } else if (this.remote) {
      this.filterRequest.type = "1";
    } else if (this.inperson) {
      this.filterRequest.type = "0";
    }

    if (this.inperson) {

      this.filterRequest.distance = this.distanceRangeValues;
      if (this.suburb) {
        this.filterRequest.suburb = this.suburb.id;
      }
    }
    window.localStorage.setItem("filterRequest", JSON.stringify(this.filterRequest));

  }

  /**
   * This function will reset filters to their last state 
   * in case usr decided to cancel the filter.
   */
  resetModels() {
    this.assigned = !this.filterRequest.assigned;
    this.priceRangeValues[0] = this.filterRequest.min_price;
    this.priceRangeValues[1] = this.filterRequest.max_price;
    if (this.filterRequest.type == "1") {
      this.remote = true;
    } else if (this.filterRequest.type == "0") {
      this.inperson = true;
    } else {
      this.remote = true;
      this.inperson = true;
    }
    this.distanceRangeValues = this.filterRequest.distance;

  }

  filterTasks() {
    this.filterApplied = true;
    this.setFilterRequest();
    console.log(this.filterRequest);
    this.viewTaskSvc.nextFilterRequest(JSON.stringify(this.filterRequest));
    this.hideFilters();
  }

  /**
   * 
   * Show the filter you click on.
   * 
   * @param name 
   */
  showFilter(name) {
    this.hideFilters();
    if ('location' === name) {
      this.location = true;
    } else if ('price' === name) {
      this.price = true;
    } else if ('category' === name) {
      this.category = true;
    }
  }

  /**
   * This will clear all filters and set them to initial state.
   */
  clearAllFilters() {
    //Set everything to initial state
    this.assigned = false;
    this.remote = true;
    this.inperson = true;
    this.priceRangeValues = [5, 9999];
    this.distanceRangeValues = 50;
    this.suburb = {};
    this.filterTasks();
    this.filterApplied = false;
  }
  /**
   * Hide all opened filters and reset to previous state.
   */
  hideFilters() {
    this.resetModels();
    this.location = false;
    this.price = false;
    this.category = false;
  }

  ngOnDestroy() {
    //this.viewTaskSvc.filterSubject.unsubscribe();
  }

  searchSuburb(event) {

    let searchTerm = event.query;
    this.afterSignupSvc.searchAddress(searchTerm).subscribe(res => {
      let datas = JSON.parse(JSON.stringify(res));
      this.searchedlist = datas;
    });
  }
}
