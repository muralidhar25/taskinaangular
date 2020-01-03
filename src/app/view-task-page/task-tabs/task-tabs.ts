import { Component, Input, Output } from "@angular/core";


import { Router } from "@angular/router";
import { SubjectSubscriber } from "rxjs/internal/Subject";
import { IDisplayTask } from '../view-task-page.service';

@Component({
    selector: "task-tabs",
    templateUrl: "./task-tabs.component.html"
})
export class TaskTabsComponent {

    @Input() taskFilter: string;
    constructor(
        private route: Router
    ) { }

    ngOnChanges() {
    }
}
