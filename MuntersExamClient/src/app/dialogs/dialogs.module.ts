
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseAvatarDialogComponent } from './choose-avatar/choose-avatar.component';

const entryComponents = [
  ChooseAvatarDialogComponent
];

const declarations = [
  ...entryComponents
];

const imports = [
  CommonModule
];

const exports = [
  ...declarations,
];

@NgModule({
  entryComponents,
  declarations,
  imports,
  exports,
})
export class DialogsModule { }
