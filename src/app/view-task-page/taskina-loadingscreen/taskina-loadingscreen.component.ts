import { Component, Input, Output } from "@angular/core";


import { Router } from "@angular/router";

@Component({
    selector: "taskina-loadingscreen",
    templateUrl: "./taskina-loadingscreen.component.html"
})
export class TaskinaLoadingscreen {

    @Input() taskFilter: string;
    constructor(
        private route: Router
    ) { }

    ngOnChanges() {
    }
}
