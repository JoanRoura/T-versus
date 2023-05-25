import {Component, OnInit} from '@angular/core';
import { AuthUser } from '../../../auth/interfaces/auth-user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {user} from "@angular/fire/auth";
import {ConfirmationService} from "primeng/api";
import { MessageService } from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewProfileComponent{
  // username: string | undefined;
  // borndate: string | undefined;

  userProfile!: AuthUser;
  updateUser!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private router: Router
    ) {
    this.fb.group({
      username: [null,Validators.required],
      bornate: [null, Validators.required]
    })
  }


  get user() {
    return this.authService.getCurrentUser;
  }

  updateProfile(){

//FALTA UPDATEAR
    this.userProfile = {
      borndate: this.user.borndate,
      email:   this.user.email,
      username:  this.user.username,
      password:  this.user.password,
      tokens:   this.user.tokens,
      tournament_id: this.user.tournament_id,
      image:        this.user.image,
      isJoined:     this.user.isJoined
    }

    // @ts-ignore
    this.authService.updateUser(this.userProfile)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  ngOnInit() {
    // Obtenir el current user
    this.authService.getOneUser(this.user.email)
      .subscribe(user => {
        console.log(user.username);
        this.userProfile = user;
      })
  }

  discardChanges(){
    location.reload();
  }

  deleteAccount() {
    this.confirmationService.confirm({
      message: 'Cuidado, estas apunto de borrar tu cuenta permanentemente, perderás toda la información!. Estas seguro?',
      header: 'Borrar cuenta',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.deleteUser(this.user.email)
          .subscribe(user => {
          })
        this.router.navigate(['/auth/login'])
      }
    });
  }

}
