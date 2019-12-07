import { Component, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserMessage, UserMessage } from 'src/app/models/user-message.model';
import { AuthService } from 'src/app/auth.service';
import { IUserAuth } from 'src/utils/user.auth.interface';
import { ConversationService } from './conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnDestroy, AfterViewChecked {

  private readonly subs = new Subscription();
  @ViewChild('page', { static : false }) page: ElementRef;
  admin: IUserAuth;
  messages: Array<IUserMessage> = [];
  guest: IUserAuth;

  constructor(
    router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private convService: ConversationService,
    ) {

    this.admin = this.authService.getAdmin();

    this.subs.add(this.route.params.subscribe(params => {
      this.guest = this.authService.getUsers().find(row => row.connectionId === params.userId);
      this.updateAll();
    }));

    this.subs.add(this.authService.deletedUserListener.subscribe(id => {
      if (this.guest.connectionId === id) {
        this.convService.deleteConversation(id);
        router.navigate(['./chat', 'room']);
      }
    }));

    this.subs.add(this.convService.messageListener.subscribe(() => this.updateAll()));
  }


  ngAfterViewChecked(): void {
    this.page.nativeElement.scrollTop = this.page.nativeElement.scrollHeight;
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  addMessage(text: string): void {
    this.convService.addMessage(this.guest.connectionId, new UserMessage(Date.now(), text, this.admin.connectionId));
  }


  private updateAll() {
    this.messages = this.convService.getMessages(this.guest.connectionId);
    let haveChanges = false;
    this.messages.map(message => {
      if (message.sender === this.guest.connectionId && !message.isReaded) {
        haveChanges = true;
        message.isReaded = true;
      }
    });
    if (haveChanges) {
      haveChanges = false;
      this.convService.allMessagesReaded(this.guest.connectionId);
    }
  }


}
