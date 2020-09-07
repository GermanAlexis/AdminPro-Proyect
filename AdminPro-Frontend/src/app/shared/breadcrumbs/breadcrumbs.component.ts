import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Content } from '@angular/compiler/src/render3/r3_ast';

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
                       .subscribe( res => {
                        if ( this.title !== res.title) {
                          console.log('diferente soy ');
                          meta.removeTag(`name = ${ this.title }`);
                        }
                        this.title = res.title;
                        this.descrition = res.description;
                        console.log(res);
                        document.title = ` AdminPro - ${ res.title }`;
                        this.metaTags();

                      });
  }
  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  metaTags() {
    const metaTag: MetaDefinition = {
      name: this.title,
      content: this.descrition
    };
    this.meta.updateTag(metaTag);
  }

  dataRote() {
   return  this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd ) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd ) =>  event.snapshot.data )
      );
  }


}
