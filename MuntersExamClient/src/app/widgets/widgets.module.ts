
import { NgModule } from '@angular/core';
import { WarningComponent } from './warning/warning.component';
import { UsersLinksComponent } from './users-links/users-links.component';
import { CommonModule } from '@angular/common';
import { WaiterComponent } from './waiter/waiter.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

const declarations = [
  AdminComponent,
  UsersLinksComponent,
  WarningComponent,
  WaiterComponent,
];

const imports = [
  CommonModule,
  RouterModule,
];

const exports = [
  ...declarations,
];

@NgModule({
  declarations,
  imports,
  exports,
})
export class WidgetsModule { }
