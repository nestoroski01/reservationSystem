import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../shared/event.class';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: any;

  @Output() addReservation: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitAddReservation() {
    this.addReservation.emit(this.event);
  }

}
