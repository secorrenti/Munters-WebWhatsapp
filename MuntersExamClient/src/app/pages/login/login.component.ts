import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChooseAvatarDialogComponent } from 'src/app/dialogs/choose-avatar/choose-avatar.component';
import { AuthService } from 'src/app/auth.service';
import { STATUSCODE } from 'src/utils/statuscodes';
import { IUserAuth } from 'src/utils/user.auth.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  myForm = new FormGroup({
    nickname: new FormControl(null, Validators.required),
    avatar: new FormControl(null, Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  onSubmit() {
    const values: IUserAuth = this.myForm.value;
    this.authService.signin(values)
      .then(res => {
        if (res === STATUSCODE.created) {
          this.router.navigateByUrl('/chat');
        }
      });
  }

  openImages() {
    const dialogRef = this.dialog.open(ChooseAvatarDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.myForm.controls.avatar.setValue(result);
      this.myForm.updateValueAndValidity();
    });
  }

}
