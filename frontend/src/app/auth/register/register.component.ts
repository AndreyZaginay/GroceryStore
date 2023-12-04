import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRegisterCredentials } from '@entities/user';
import { AuthService } from '@services/firebase/auth.service';
import { UsersService } from '@services/users.service';
import { confirmPasswordValidator } from '@validators/auth.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly usersService = inject(UsersService);
  
  registerForm!: FormGroup;
  error: string | undefined;

  get registerFormEmail(): AbstractControl {
    return this.registerForm.get('email') as FormControl;
  }

  get registerFormPassword(): AbstractControl {
    return this.registerForm.get('password') as FormControl;
  }

  get registerFormConfirmPass(): AbstractControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const { confirmPassword, ...credentials } = this.registerForm.getRawValue();   
    this.authService.signUp(credentials as UserRegisterCredentials).subscribe({ 
      next: (user) => {
        this.usersService.setUser(user.uid, { email: user.email as string})
      },
      error: e => this.error = e.message,
      complete: () => {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  initRegisterForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator])
    })
  }
}
