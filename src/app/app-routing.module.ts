import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'events', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ])
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
