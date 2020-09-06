import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    // this.intervalObservable(()
    // .pipe(
    //   retry(2))
    // .subscribe(
    //   valor => console.log('Sub:', valor),
    //   err => console.warn(err),
    //    // tslint:disable-next-line: no-console
    //    () => console.info(' Obs Terminado') );

    this.intervalSubs = this.retornaIntervalo().subscribe( console.log );
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval(100)
            .pipe(
              // take(10),
              map( valor => valor + 1), // 0 => 1
              filter( valor => ( valor % 2 === 0 ) ? true : false ),
            );
  }
  intervalObservable() {

    let i = -1;
    return new Observable ( observer => {

      const inter = setInterval( () => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(inter);
          observer.complete();
        }
        if ( i === 2 ) {
          observer.error('i ha llegado a 2');
        }
      }, 1000 );
    });
  }

}
