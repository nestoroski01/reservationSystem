import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from './global.service';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MaterialModule } from '../shared/material.module';
import { ListItemComponent } from './sidemenu/list-item/list-item.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    SidemenuComponent,
    ListItemComponent,
    HeaderComponent,
  ],
  exports: [
    SidemenuComponent,
    HeaderComponent,
  ],
  providers: [
    GlobalService
  ]
  
})
export class CoreModule { }
