import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent {

    @Input() progres = 50;
    @Input() btnClass = 'btn btn-primary';

    @Output() percentageSon: EventEmitter<number> = new EventEmitter();


  get getpercentage() {
    return `${this.progres}%`;
  }

  changeValue( data: number) {
    if (this.progres >= 100 && data >= 0) {
      this.percentageSon.emit(100);
      return this.progres = 100 ;
    }
    if (this.progres <= 0 && data < 0) {
      this.percentageSon.emit(0);
      return this.progres = 0 ;
    }

    this.progres += data;
    this.percentageSon.emit(this.progres);

  }

  onChange(data: number) {

    if ( data >= 100 ) {
      this.progres = 100;
    } else if (data <= 0 ) {
        this.progres = 0;
    } else {
      this.progres = data;
    }
  }
}
