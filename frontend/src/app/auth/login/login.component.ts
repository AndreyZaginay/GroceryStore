import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  loginForm!: FormGroup;
  error: string | undefined;

  ngOnInit(): void {
    this.initLoginForm();
  }

  login(): void {
    this.authService.signIn(this.loginForm.getRawValue()).subscribe({
      error: e => this.error = e.message,
      complete: () => this.router.navigate([''])
    });
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
}
