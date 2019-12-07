import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HubService } from 'src/app/hub.service';
import { RoomHubSection } from 'src/utils/hub/room.hub.section';
import { IUserMessage, IMessageDictionary, IGeneralUserMessage } from 'src/app/models/user-message.model';
import { Subject } from 'rxjs';
import { IConversationModel } from './conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {

  private readonly hub = new RoomHubSection();
  private messages: IMessageDictionary = {};
  redirectionClicked = new Subject<string>();
  messageListener = new Subject();
  generalListener = new Subject<IGeneralUserMessage>();


  constructor(
    private hubService: HubService,
    private authService: AuthService,
  ) {
    this.listeners();
    this.hubService.activateListeners.subscribe(() => this.listeners());
  }


  getMessages(userId: string): Array<IUserMessage> {
    const key = this.bindKey(userId);
    return this.messages[key] ? this.messages[key].messages : [];
  }


  checkRoom(userId: string): Promise<void> {
    return this.hubService.hubConnection.invoke(this.hub.fns.CheckRoom, userId)
      .then((res: IConversationModel) => {
        if (!this.messages[res.name]) {
          res.messages = [];
          this.messages[res.name] = res;
        }
      });
  }


  addMessage(userId: string, message: IUserMessage) {
    return this.hubService.hubConnection.invoke(this.hub.fns.AddMessage, this.bindKey(userId), message);
  }


  AddMessageToGeneral(message: IUserMessage) {
    return this.hubService.hubConnection.invoke(this.hub.fns.AddMessageToGeneral, message);
  }


  allMessagesReaded(userId: string): void {
    this.hubService.hubConnection.invoke(this.hub.fns.AllMessagesReaded, this.bindKey(userId));
  }

  deleteConversation(userId: string) {
    delete this.messages[this.bindKey(userId)];
  }


  bindKey(userId: string) {
    const adminId = this.authService.getAdmin().connectionId;
    const key = [adminId, userId].sort();
    return key[0] + '___SEPARATOR___' + key[1];
  }


  private listeners() {

    if (this.hubService.hubConnection) {

      this.hubService.hubConnection.on(this.hub.on.ShareGroupNameReaded,
        (groupName: string) => {
          if (this.messages[groupName]) {
            for (const message of this.messages[groupName].messages) {
              message.isReaded = true;
            }
            this.messageListener.next();
          }
        });

      this.hubService.hubConnection.on(this.hub.on.ShareRoomToUser,
        (res: IConversationModel) => {
          if (!this.messages[res.name]) {
            res.messages = [];
            this.messages[res.name] = res;
          }
        });

      this.hubService.hubConnection.on(this.hub.on.ShareRoomMessage,
        (groupName: string, message: IUserMessage) => {
          this.messages[groupName].messages.push(message);
          this.messageListener.next();
        });

      this.hubService.hubConnection.on(this.hub.on.ShareGeneralMessage,
        (message: IGeneralUserMessage) => {
          const user = this.authService.getUsers().find(row => row.connectionId === message.sender);
          message.nickname = user.nickname;
          this.generalListener.next(message);
        });

    }

  }



}



