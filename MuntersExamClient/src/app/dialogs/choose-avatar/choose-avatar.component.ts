import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-avatar',
  template: `
    <img src="assets/avatars/{{image}}.jpg"
    alt="avatar" *ngFor="let image of images"
    (click)="close(image)">
  `,
  styles: [`
    :host {
      display: block;
      text-align: center;
    }
    img {
      width: 150px;
      margin: 10px;
      box-shadow: 0 14px 3px -5px rgba(0, 0, 0, 0.2);
    }
  `]
})
export class ChooseAvatarDialogComponent {

  images: Array<string> = [
    'H01', 'H02', 'H03', 'H04', 'H05', 'H06', 'H07', 'H08', 'H09', 'H10',
    'M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10',
  ];

  constructor(
    public dialogRef: MatDialogRef<ChooseAvatarDialogComponent>
  ) { }

  close(img: string): void {
    this.dialogRef.close(img);
  }

}
