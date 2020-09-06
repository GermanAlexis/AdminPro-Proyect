import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent   implements OnDestroy {

  public title: string;
  public descrition: string;
  public titleSub$: Subscription;
  constructor(private router: Router, private meta: Meta) {
    this.titleSub$ = this.dataRote()
                       .subscribe( ({ title }) => {
                        this.title = title;
                        document.title = ` AdminPro - ${ title }`;
                      });
    console.log(this.title);

    const metaTag: MetaDefinition = {
      name: 'contenido ',
      content: this.title
    };

    this.meta.updateTag(metaTag);

  }
  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }



  dataRote() {
   return  this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd ) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd ) => event.snapshot.data )
    );
  }


}
