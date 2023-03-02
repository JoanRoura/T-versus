import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerUser: FormGroup;
  // Si en comptes de fero en variables vols fer ho amb un objecta ho has de fer amb el user.
  user!: User;

  username: any;
  email: any;
  password: any;
  borndate: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {

    this.registerUser = this.fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      borndate: [null, Validators.required]
    })
  }

  ngOnInit(): void {

  }

  register() {
    this.username = this.registerUser.value.username;
    this.email = this.registerUser.value.email;
    this.password = this.registerUser.value.password;
    this.borndate = this.registerUser.value.borndate;

    // console.log(this.borndate, this.username, this.password, this.email);

    this.authService.register(this.email, this.password)
      .then(resp => {
        console.log(resp);

        this.router.navigate(['/auth/verify-mail'])

        this.authService.createUser(this.username, this.email, this.password, this.borndate)
          .subscribe(resp => {
            console.log(resp);
          })

      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(this.firebaseError(error.code), 'Error');
      });



    this.authService.updateUser('sC9CfNqHMFbKY3sbPlr7', this.username, this.email, this.password, this.borndate)
      .subscribe(resp => {
        console.log(resp);
      });

    // this.router.navigate(['/auth/login'])
  }

  firebaseError(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El usuario ya existe'
      case 'auth/weak-password':
        return 'La contraseña es muy debil'
      case 'auth/invalid-email':
        return 'Correo invalido'
      default:
        return 'Error desconocido'
    }
  }
}
