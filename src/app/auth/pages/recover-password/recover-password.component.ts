import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {

  recoverPassword: FormGroup;
  loading: boolean = false;

  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) { 
    this.recoverPassword = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  invalidCamp(campo: string) {
    return this.recoverPassword.get(campo)?.invalid
      && this.recoverPassword.get(campo)?.touched
  }

  getClassCSS(campo: string): string {
    return (this.recoverPassword.get(campo)?.invalid && this.recoverPassword.get(campo)?.touched)
      ? "form-control is-invalid"
      : "form-control";
  }

  get emailErrorMsg(): string {
    const errors = this.recoverPassword.get('email')?.errors;

    if (errors?.['required']) {
      return 'El correo es requerido';
    } else if (errors?.['pattern']) {
      return 'El correo es invalido';
    } 

    return '';
  }

  recover() {
    const email = this.recoverPassword.value.email;

    this.loading = true;
    this.authService.resetEmail(email).then(resp => {

      this.toastr.info('Le enviamos un correo para restablecer su contarseña', 'Recuperar Password');
      this.router.navigate(['/auth/login']);
      
    }).catch(error => {
      this.loading = false;
      this.toastr.error(this.authService.codeError(error.code), 'Error');
    });
  }
}
