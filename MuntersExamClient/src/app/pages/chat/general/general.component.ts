import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserMessage, IGeneralUserMessage } from 'src/app/models/user-message.model';
import { IUserAuth } from 'src/utils/user.auth.interface';
import { ConversationService } from '../conversation/conversation.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: [
    './../conversation/conversation.component.scss',
  ]
})
export class GeneralComponent implements OnDestroy, AfterViewChecked {

  private readonly subs = new Subscription();
  @ViewChild('page', { static : false }) page: ElementRef;

  admin: IUserAuth;
  messages: Array<IGeneralUserMessage> = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private convService: ConversationService,
    ) {
    this.admin = this.authService.getAdmin();
    this.subs.add(this.convService.generalListener.subscribe(message => this.update(message)));
  }

  ngAfterViewChecked(): void {
    this.page.nativeElement.scrollTop = this.page.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  addMessage(text: string): void {
    this.convService.AddMessageToGeneral(new UserMessage(Date.now(), text, this.admin.connectionId));
  }

  close() {
    this.router.navigate(['chat', 'room']);
    this.convService.redirectionClicked.next('');
  }

  private update(message: IGeneralUserMessage): void {
    const messages = this.messages;
    messages.push(message);
    const now = Date.now();
    this.messages = messages.filter(row => now - row.id < 3600000);
  }

}
