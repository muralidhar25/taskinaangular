import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../services/loader.service';
import { LoaderState } from '../../services/loader';


@Component({
    selector: 'taskina-loader',
    templateUrl: "./taskina-loader.component.html",
})

export class TaskinaLoaderComponent {
    show = false;
    private subscription: Subscription;
    constructor(
        private loaderService: LoaderService
    ) { }
    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}