import { Component } from '@angular/core';
import { Waiter } from './waiter.handler';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent {

  display = false;

  constructor() {
    Waiter.handler.subscribe(display => this.display = display);
  }

}
