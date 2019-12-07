import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { IUserAuth } from 'src/utils/user.auth.interface';
import { Subscription } from 'rxjs';
import { ConversationService } from './conversation/conversation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnDestroy {

  users: Array<IUserAuth> = [];
  admin: IUserAuth;
  activeUser: string;
  private readonly subs = new Subscription();


  @HostListener('window:unload')
  unloadHandler() {
    this.authService.signout();
  }

  constructor(
    private convService: ConversationService,
    private authService: AuthService,
    private router: Router,
    ) {
    this.users = this.authService.getUsers();
    this.admin = this.authService.getAdmin();
    this.subs.add(this.authService.usersListener.subscribe(users => this.users = users));
    this.subs.add(this.authService.authenticationState.subscribe(admin => this.admin = admin));
    this.subs.add(this.convService.redirectionClicked.subscribe(active => this.activeUser = active));
  }

  ngOnDestroy(): void {
    this.authService.signout();
    this.subs.unsubscribe();
  }

  redirect(user: IUserAuth): void {
    this.convService.redirectionClicked.next(user.connectionId);
    this.router.navigate(['chat', 'conversation', user.connectionId]);
  }

}
