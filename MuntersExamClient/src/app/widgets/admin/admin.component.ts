

import { Component, Input, OnDestroy } from '@angular/core';
import { IUserAuth } from 'src/utils/user.auth.interface';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ConversationService } from 'src/app/pages/chat/conversation/conversation.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnDestroy {

  private readonly subs = new Subscription();
  readonly general = 'general';
  activeRoute = true;
  @Input()
  admin: IUserAuth;
  constructor(
    private authService: AuthService,
    private convService: ConversationService,
    private router: Router
  ) {
    this.subs.add(this.convService.redirectionClicked.subscribe(active => {
      this.activeRoute = active === this.general;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  signout(): void {
    this.authService.signout()
      .then(() => this.router.navigate(['./login']));
  }

  getGeneral() {
    this.convService.redirectionClicked.next(this.general);
    this.router.navigate(['./general']);
  }
}
