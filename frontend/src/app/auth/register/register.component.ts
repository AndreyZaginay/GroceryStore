import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRegisterCredentials } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { confirmPasswordValidator } from 'src/app/shared/validators/auth.validator';

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
    const newUser: UserRegisterCredentials = {
      email: this.registerForm.getRawValue()['email'],
      password: this.registerForm.getRawValue()['password']
    };    
    this.authService.signUp(newUser).pipe(
    ).subscribe({ 
      next: (user) => {
        this.usersService.setUser(user.uid, { email: user.email as string })
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
