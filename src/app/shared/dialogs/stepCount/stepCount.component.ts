import { Component, ViewChild, OnDestroy, ElementRef, ɵConsole, Input } from '@angular/core';
import { BaseStepComponent } from './model';
// import { ngfModule, ngf } from 'angular-file';

@Component({
  selector: 'step-count',
  styleUrls: ['./style.scss'],
  templateUrl: './stepCount.component.html'
})
export class StepCountComponent {
  @Input() step: number;
  activeSteps: any;
  inActiveSteps: any;
  maximumStep: number;
  constructor(el: ElementRef) {
    this.maximumStep = parseInt(localStorage.getItem('maximumStepCount'), 10);
    this.dotsArray();

  }

  ngOnChanges() {
    this.maximumStep = parseInt(localStorage.getItem('maximumStepCount'), 10);
    this.dotsArray();
  }

  dotsArray() {
    this.activeSteps = Array(this.step)
      .fill(0)
      .map((x, i) => i);
    this.inActiveSteps = Array(this.maximumStep - this.activeSteps.length)
      .fill(0)
      .map((x, i) => i);
  }
}
