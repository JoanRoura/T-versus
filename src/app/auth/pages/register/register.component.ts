import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;
  user!: User;

  constructor(private authService: AuthService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(data: any) {
    
       
  //   this.authService.register(this.formReg.value.email, this.formReg.value.password)
  //     .then(resp => {
  //       console.log(resp);
  //       this.router.navigate(['/auth/login'])
  //       // if (resp.user.email == this.formReg.value.email) {
  //       // }
  //     })
  //     .catch(error => console.log(error));
  
    this.authService.registerWhitFirebase(this.user)
      .subscribe( data => {
        console.log(data)
        
      })
  }



}
