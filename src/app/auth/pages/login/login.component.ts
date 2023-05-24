import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginUser: FormGroup;
  loading: boolean = false;

  // Patterns 
  usernamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService, 
    private fb: FormBuilder) {
      
      this.loginUser = this.fb.group({
        email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
        password: [null, Validators.required]
      });
  }

  invalidCamp(campo: string) {
    return this.loginUser.get(campo)?.invalid
      && this.loginUser.get(campo)?.touched
  }

  getClassCSS(campo: string): string {
    return (this.loginUser.get(campo)?.invalid && this.loginUser.get(campo)?.touched)
      ? "form-control is-invalid"
      : "form-control";
  }

  get emailErrorMsg(): string {
    const errors = this.loginUser.get('email')?.errors;

    if (errors?.['required']) {
      return 'El correo es requerido';
    } else if (errors?.['pattern']) {
      return 'El correo es invalido';
    } 

    return '';
  }

  get passwordErrorMsg(): string {
    const errors = this.loginUser.get('password')?.errors;

    if (errors?.['required']) {
      return 'La contraseña es requerida';
    }  
    
    return '';
  }

  login() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;    

    this.loading = true;
    this.authService.login(email, password)
      .then(resp => {

        console.log();
      
        if (resp.user?.emailVerified) {
          this.router.navigate(['/tournaments/main']);
        } else if (email === "admin@gmail.com" && password === "admin123") {
          this.router.navigate(['/admin/home-admin']);
        } else {
          this.router.navigate(['/auth/verify-mail']);
        }
      })
      .catch(error =>  {
        this.loading = false;
        this.toastr.error(this.authService.codeError(error.code), 'Error');
      });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(resp => {
        this.router.navigate(['/tournaments/main']);   
      })
      .catch(error => console.log(error));
  }
}


