import { Component, OnInit, OnChanges } from '@angular/core';
import { GlobalService } from '../global.service';
import { User } from '../../user/shared/user.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  user: User;
  constructor(private global: GlobalService) { }

  ngOnInit() {
      this.global.getUser().subscribe(user => {
        this.user = user;
        console.log(this.user);
      });
    }
}
