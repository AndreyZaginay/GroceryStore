import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/firebase/auth.service';

import { confirmPasswordValidator } from 'src/app/shared/validators/auth.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{
  
  registerForm!: FormGroup;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  register(): void {
    this.authService.signUp(this.registerForm.getRawValue());
  }

  initRegisterForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, confirmPasswordValidator)
  }
}
