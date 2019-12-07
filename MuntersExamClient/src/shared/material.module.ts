
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

const imports = [
  MatFormFieldModule,
  MatRadioModule,
  MatSelectModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule
];

@NgModule({
  imports,
  exports: [
    imports,
  ],
})
export class LocalMaterialModule { }
