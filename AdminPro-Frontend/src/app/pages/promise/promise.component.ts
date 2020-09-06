import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styles: []
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.listUser()
    .then(usuarios => {
      console.log(usuarios);
    });
  }

  listUser() {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json())
      .then( body => resolve(body.data));
    });
  }
}
