import { Component, Input } from "@angular/core";
import { ITaskResponse } from 'src/app/shared/dialogs/post-task-dialog/post-task-dialog.service';
import { IDisplayTask, ViewTaskService } from '../view-task-page.service';

@Component({
    selector: "task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["../view-task-page.component.scss"]
})
export class TaskListComponent {

    @Input() taskList: ITaskResponse;
    @Input() taskData: IDisplayTask;
    @Input() taskFilter: string;
    @Input() slug: string;
    @Input() searchTerm: string;
    
    location: any;
    taskLists: any;

    pay_type: any;


    constructor(
        private viewTaskSvc: ViewTaskService,
    ) { }

    ngOnInit() { }

}
