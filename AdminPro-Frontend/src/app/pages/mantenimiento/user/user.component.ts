import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';


import { User } from '../../../models/user.model';
import { SearchService } from '../../../services/search.service';
import { UserService } from '../../../services/user.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit, OnDestroy {
  public totalUser: number;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public current: number;
  public loadAlert = true;

  public Subs: Subscription;
  constructor(
    private userservice: UserService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ) {}
  ngOnDestroy(): void {
    this.Subs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.Subs = this.modalImageService.newImage
    .pipe(
      delay (100)
      )
    .subscribe( img => this.loadUsers() );
  }
  loadUsers() {
    this.loadAlert = true;
    this.userservice.loadUser(0).subscribe(({ total, users }) => {
      this.users = users;
      this.usersTemp = users;
      this.totalUser = total;
      this.loadAlert = false;
    });
  }

  pageCurrent(valor: number) {
    this.current += valor;

    if (this.current < 0) {
      this.current = 0;
    } else if (this.current >= this.totalUser) {
      this.current -= valor;
    }

    this.loadUsers();
  }

  searchCollection(termino: string) {
    if (termino.length === 0) {
      return (this.users = this.usersTemp);
    }

    this.searchService
      .searchCollection('users', termino)
      .subscribe((resultado: User[]) => {
        this.users = resultado;
      });
  }

  deleteUser(user: User) {

    if (user.uid === this.userservice.uid) {
      return Swal.fire('Error', 'no puede hacer esta accion', 'info');
    }

    Swal.fire({
      title: 'Estas Seguro?',
      text: `Esta por eliminar al usuario ${ user.name + user.lastName }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
       if (result.value) {
           this.userservice.deleteUser(user)
               .subscribe(
                  resp => {
                         this.loadUsers();
                         Swal.fire(
                            'Eliminado',
                            `${ user.name } has sido eliminado`,
                            'success'
                          );
              });
            }
          }
      );
  }

  changeRole( user: User) {
    this.userservice.changeRole(user).
    subscribe( resp => console.log(resp));
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user.uid, user.img );
  }
}
