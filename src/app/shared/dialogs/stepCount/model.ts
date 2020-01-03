import { Output, EventEmitter, Input } from '@angular/core';
export class BaseStepComponent {
    @Output() onStepChanged = new EventEmitter<number>();
    @Input() step: number;
    maximumStep: number;
    ngOnInit() {
        this.maximumStep = parseInt(localStorage.getItem('maximumStepCount'), 10);
    }
    onNextStep() {
        this.nextStep();
    }

    onSkipStep() {
        this.skipStep();
    }

    onPrevstep() {
        this.prevStep();
    }
    protected nextStep() {
        if (this.step >= this.maximumStep) {
            this.onStepChanged.emit(-1);
        } else {
            this.onStepChanged.emit(1);
        }
    }
    protected skipStep() {
        if (this.step >= this.maximumStep) {
            this.onStepChanged.emit(-1);
        } else {
            this.onStepChanged.emit(1);
        }
    }
    protected prevStep() {
        if (this.step >= this.maximumStep) {
            this.onStepChanged.emit(-2);
        } else {
            this.onStepChanged.emit(-1);
        }
    }

}