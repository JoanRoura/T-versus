import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerUser: FormGroup;
  user!: User;


  constructor(private authService: AuthService, 
              private router: Router,
              private fb: FormBuilder) {
      this.registerUser = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      })

  }
  ngOnInit(): void {
  }

  register() {
    this.user = {
      email: this.registerUser.value.email,
      password: this.registerUser.value.password
    }

    this.authService.registerWhitFirebase(this.user).subscribe( resp => {
      console.log(resp)
      this.router.navigate(['/404'])
    })
  }

  // onSubmit(data: any) {
    
       
  //   this.authService.register(this.formReg.value.email, this.formReg.value.password)
  //     .then(resp => {
  //       console.log(resp);
  //       this.router.navigate(['/auth/login'])
  //       // if (resp.user.email == this.formReg.value.email) {
  //       // }
  //     })
  //     .catch(error => console.log(error));
  
  //   this.authService.registerWhitFirebase(this.user)
  //     .subscribe( data => {
  //       console.log(data)
        
  //     })
  // }
}
