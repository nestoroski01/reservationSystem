import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../shared/services/reservations.service';
import { ReservationsComponent } from './reservations.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { AuthGuard } from '../../events/shared/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {path: 'reservations', children: [
        {path: '', canActivate: [AuthGuard], component: ReservationsComponent}
      ]}
    ])
  ],
  declarations: [ReservationsComponent],
})
export class ReservationsModule { }
