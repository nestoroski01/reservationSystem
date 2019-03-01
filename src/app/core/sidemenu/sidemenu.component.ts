import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { ReservationsService } from '../../reservations/shared/services/reservations.service';
interface Page {
  text: string;
  icon: string;
  link: string;
}
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],

})
export class SidemenuComponent implements OnInit {
  showText: boolean = false;
  pages: Page[] = [
    {text: 'Events', icon: 'calendar_today', link: '/events'},
    {text: 'Reservations', icon: 'notification_important', link: '/reservations'},
    {text: 'Add Event', icon: 'add', link: '/events/add'},
  ];

  constructor(private global: GlobalService) { }

  ngOnInit() {}

  toggleShowText(): void {
    this.showText = !this.showText;
  }
}
