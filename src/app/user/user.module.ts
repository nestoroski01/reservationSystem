import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { UserService } from './shared/user.service';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from 'angularfire2';
import { ProfileComponent } from './profile/profile.component';
import { EventsModule } from '../events/events.module';
import { EventCardComponent } from '../events/event-card/event-card.component';
import { AuthGuard } from '../events/shared/auth.guard';
import { HashService } from './shared/hash.service';
@NgModule({
  imports: [
    EventsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent}
    ])
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  providers: [
    UserService,
    HashService
  ]
})
export class UserModule { }
