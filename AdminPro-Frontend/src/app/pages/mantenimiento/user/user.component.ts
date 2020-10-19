import { Component, OnInit } from '@angular/core';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  public totalUser: number;
  public users: User[] = [];
  public current: number;
  constructor( private userservice: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.userservice.loadUser(0).subscribe(
      ({total, users}) => {
        this.users = users;
        this.totalUser = total;
      });
  }
  pageCurrent(valor: number) {

    this.current += valor;

    if ( this.current < 0) {
      this.current = 0;
    } else if (this.current >= this.totalUser) {
      this.current -= valor;
    }

    this.loadUsers();

  }

}
