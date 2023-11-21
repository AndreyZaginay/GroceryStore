import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/firebase/auth.service';
import { confirmPasswordValidator } from 'src/app/shared/validators/auth.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  registerForm!: FormGroup;
  error: string | undefined = undefined;

  ngOnInit(): void {
    this.initRegisterForm();
  }

  register(): void {
    this.authService.signUp(this.registerForm.getRawValue()).subscribe({
      error: e => this.error = e.message,
      complete: () => this.router.navigate(['/auth/login'])
    });
  }

  initRegisterForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, confirmPasswordValidator)
  }
}
