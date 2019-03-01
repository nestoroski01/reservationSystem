import { Component } from '@angular/core';
import { GlobalService } from './core/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reservationSysem';
  constructor(private global: GlobalService ) {
    
  }
}
