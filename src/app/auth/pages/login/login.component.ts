import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onClick() {
    
  }
  
  onSubmit() {
    this.authService.login(this.formLogin.value.email, this.formLogin.value.password)
    .then(resp => {
      console.log(resp);
      this.router.navigate(['/404'])
      // if (resp.user.email == this.formReg.value.email) {
      // }
    })
    .catch(error => console.log(error));
  }
}


