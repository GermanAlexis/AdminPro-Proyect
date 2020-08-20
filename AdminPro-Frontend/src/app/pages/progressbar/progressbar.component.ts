import { Component } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
})
export class ProgressbarComponent {
  progress1 = 15;
  progress2 = 35;

  get getprogress1() {
    return `${this.progress1}%`;
  }

  get getprogress2() {
    return `${this.progress2}%`;
  }

}
