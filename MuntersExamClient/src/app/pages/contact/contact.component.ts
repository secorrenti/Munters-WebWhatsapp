import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
  <label>
    Correnti Sergio Efi: 0507856268
  </label>
  `,
  styles: [
    `
    :host label {
      padding: 10px 0;
      display: block;
      text-align: center;
      font-weight: 600;
    }
    `
  ]
})
export class ContactComponent {

}
