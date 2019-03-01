import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  animations: [
    trigger('showTitle', [
      transition(':enter', [
        style({opacity:0}),
        animate('300ms ease-out', style({opacity:1})) 
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({opacity:0})) 
      ])
    ])
  ]
})
export class ListItemComponent implements OnInit {
  @Input() showText: boolean;
  @Input() text: string;
  @Input() icon: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
