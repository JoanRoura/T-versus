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

  loginUser!: FormGroup;
  email: any;
  password: any;

  constructor(private authService: AuthService, private router: Router) {
    this.loginUser = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  login() {
    this.email = this.loginUser.value.email;
    this.password = this.loginUser.value.password;    

    this.authService.login(this.email, this.password)
      .then(resp => {
        this.router.navigate(['/tournaments/home'])
        // console.log(resp.user.getIdToken);

        // if (resp.user.emailVerified) {
        //   this.router.navigate(['/tournaments/home'])
        // }
      })
      .catch(error => console.log(error));
  }
}


