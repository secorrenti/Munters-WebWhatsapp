import { Component, OnInit, Input } from '@angular/core';
import { IUserMessage } from 'src/app/models/user-message.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUserAuth } from 'src/utils/user.auth.interface';
import { ConversationService } from 'src/app/pages/chat/conversation/conversation.service';

@Component({
  selector: 'app-users-links',
  templateUrl: './users-links.component.html',
  styleUrls: ['./users-links.component.scss']
})
export class UsersLinksComponent implements OnInit {

  private readonly subs = new Subscription();

  @Input() user: IUserAuth;
  admin: IUserAuth;
  lastMessages: IUserMessage;
  unread: number;

  constructor(
    private authService: AuthService,
    private convService: ConversationService
  ) {
    this.subs.add(this.authService.usersListener
      .subscribe(() => this.bind()));
    this.admin = this.authService.getAdmin();

    this.convService.messageListener.subscribe(() => this.bind());
  }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    const messages = this.convService.getMessages(this.user.connectionId);
    const guestMessages = messages.filter(row => row.sender === this.user.connectionId);
    this.lastMessages = guestMessages[guestMessages.length - 1];
    this.unread = guestMessages.filter(row => !row.isReaded).length;
  }


}
