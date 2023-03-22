import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthUser } from '../../interfaces/auth-user.interface';
import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;

  registerUser: FormGroup;
  userdb!: AuthUser;

  // Patterns 
  usernamePattern: string = '([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,) {

    this.registerUser = this.fb.group({
      username: [null, [Validators.required, Validators.pattern(this.usernamePattern)]],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
      borndate: [null, Validators.required]
    })
  }

  ngOnInit(): void {

  }

  invalidCamp(campo: string) {
    return this.registerUser.get(campo)?.invalid
      && this.registerUser.get(campo)?.touched
  }

  getClassCSS(campo: string): string {
    return (this.registerUser.get(campo)?.invalid && this.registerUser.get(campo)?.touched)
      ? "form-control is-invalid"
      : "form-control";
  }

  get usernameErrorMsg(): string {
    const errors = this.registerUser.get('username')?.errors;

    if (errors?.['required']) {
      return 'El nombre de usuario es requerido';
    } else if (errors?.['pattern']) {
      return 'El nombre de usuario es invalido';
    }

    return '';
  }

  get emailErrorMsg(): string {
    const errors = this.registerUser.get('email')?.errors;

    if (errors?.['required']) {
      return 'El correo es requerido';
    } else if (errors?.['pattern']) {
      return 'El correo es invalido';
    }

    return '';
  }

  get passwordErrorMsg(): string {
    const errors = this.registerUser.get('password')?.errors;

    if (errors?.['required']) {
      return 'La contraseña es requerida';
    } else if (errors?.['minlength']) {
      return 'La contraseña debe tener 6 carcteres';
    }

    return '';
  }

  register() {

    const username = this.registerUser.value.username;
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const confirmPassword = this.registerUser.value.confirmPassword;
    const borndate = this.registerUser.value.borndate;

    if (password !== confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas deben ser las mismas ', 'Error');
      return;
    }

    this.loading = true;

    this.authService.register(email, password)
      .then(resp => {
        this.loading = false;
        // this.toastr.success('El usuario fue registrado con exito!', 'Usuario registrado');
        // this.router.navigate(['/auth/login'])
        
        this.userdb = {
          id: email,
          username: username,
          email: email,
          password: password,
          borndate: borndate
        }

        this.createUserDB();

        this.verifyMail();

        // Actualitza el usuari del Firestore
        // this.authService.updateUser(resp.user.uid, username, email, password, borndate)
        //   .subscribe(resp => {
        //     console.log(resp);
        //   });

      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.authService.codeError(error.code), 'Error');
      });

    this.router.navigate(['/auth/login'])
  }

  createUserDB() {
    this.authService.createUser(this.userdb)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  verifyMail() {
    this.authService.verifyMail()
      .then(() => {
        this.toastr.info('Le enviamos un correo electronico para su verificacion', 'Verificar correo');
        this.router.navigate(['/auth/login'])
      })
      .catch(error => console.log(error));
  }
}
