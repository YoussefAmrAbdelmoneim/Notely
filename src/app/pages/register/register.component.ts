import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { UserService } from '../../core/services/user/user.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly userService=inject(UserService);
  private readonly router=inject(Router);
 registerForm:FormGroup = new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3) ,Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  age:new FormControl(null,[Validators.required])
 }); 
 
 submitForm()
 {
  if(this.registerForm.valid)
  {
     this.userService.signUp(this.registerForm.value).subscribe({
    next:(res) => {
    this.router.navigate(['/login']);
    }
  })
  }
 else{
  this.registerForm.markAllAsTouched();
 }
 }
}
