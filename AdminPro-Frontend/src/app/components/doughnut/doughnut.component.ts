import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {

    // Doughnut
    // tslint:disable-next-line: no-input-rename
    @Input('labels') doughnutChartLabels: Label[] = [];
    // tslint:disable-next-line: no-input-rename
    @Input('data') doughnutChartData: MultiDataSet = [ ];
    public color: Color [] = [ { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }];

  constructor() { }

  ngOnInit(): void {
  }

}
