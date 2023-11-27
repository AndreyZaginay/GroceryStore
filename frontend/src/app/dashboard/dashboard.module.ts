import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/firebase/auth.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [UsersService, AuthService]
})
export class DashboardModule { }
