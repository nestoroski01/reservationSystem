import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { AddEventComponent } from './add-event/add-event.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { AuthGuard } from './shared/auth.guard';
import { EventsService } from './shared/events.service';
import { EventCardComponent } from './event-card/event-card.component';
import { ReservationsModule } from '../reservations/reservations/reservations.module';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild([
      {path: 'events', children: [
        { path: '', component: EventsComponent},
        { path: 'add', canActivate: [AuthGuard], component: AddEventComponent},
      ]}
    ]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EventsComponent,
    AddEventComponent,
    EventCardComponent,
  ],
  providers: [
    AuthGuard,
    EventsService,
  ],
  exports: [
    EventCardComponent
  ]
})
export class EventsModule { }
