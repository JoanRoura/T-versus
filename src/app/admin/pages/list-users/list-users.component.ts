import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';

import { AuthService } from '../../../auth/services/auth.service';

import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';
import { Table } from 'primeng/table';


registerLocaleData(localeEs, 'es-ES');

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  loading: boolean = true;

  users!: AuthUser[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.listUsers()
      .subscribe((users) => {
        this.users = users;
        this.loading = false;
      });
  }


  clear(table: Table) {
    table.clear();
  }
}
