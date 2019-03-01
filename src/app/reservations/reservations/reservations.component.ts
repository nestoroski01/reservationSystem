import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/global.service';
import { ReservationsService } from '../shared/services/reservations.service';
import { User } from 'src/app/user/shared/user.class';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  user: User;
  reservations = [];
  constructor(private global: GlobalService, private reservationsService: ReservationsService) { }

  ngOnInit() {
    this.global.getUser().subscribe(user => {
      this.user = user;
    });
    this.reservationsService.getReservations(this.user.key).subscribe(reservations => {
      this.reservations = reservations;
      console.log(reservations);
    })
  }

  approveReservation() {
    alert("Reservation approved !");
  }

  rejectReservation(reservation: any) {
    let index = this.reservations.indexOf(reservation)
    if(index > -1)
      this.reservations.splice(index, 1);
  }

}
