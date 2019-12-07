import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { STATUSCODE } from 'src/utils/statuscodes';
import { Waiter } from './widgets/waiter/waiter.handler';
import { API } from 'src/utils/api/API';
import { Subject } from 'rxjs';
import { IUserAuth } from 'src/utils/user.auth.interface';
import { HubService } from './hub.service';
import { ChatHubSection } from 'src/utils/hub/chat.hub.section';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly hub = new ChatHubSection();
  private users: Array<IUserAuth> = [];
  private user: IUserAuth;
  usersListener = new Subject<Array<IUserAuth>>();
  authenticationState = new Subject<IUserAuth>();
  deletedUserListener = new Subject<string>();

  constructor(
    private http: HttpClient,
    private hubService: HubService,
  ) {
    this.listeners();
    this.hubService.activateListeners.subscribe(() => this.listeners());
  }

  getAdmin(): IUserAuth {
    return this.user;
  }


  getUsers(): Array<IUserAuth> {
    return this.users;
  }


  signin(user: IUserAuth): Promise<STATUSCODE> {

    Waiter.show();
    return this.http.post<{ encryption: string }>(API.auth.login(), user)
      .toPromise()
      .then(res => this.hubService.startConnection(res.encryption))
      .then(() => this.hubService.hubConnection.invoke(this.hub.fns.GetConnections))
      .then(res => {
        this.users = res.users;
        this.user = res.user;
        return STATUSCODE.created;
      })
      .catch(err => {
        let message = '';
        switch (err.status) {
          case STATUSCODE.forbidden:
            message = 'שם משתמש תפוס, בחר אחד אחר.';
            break;
          default:
            message = 'ישנה בעיית התחברות,ודא שהשרת רץ לתרגיל הזה.';
            break;
        }
        alert(message);
        return err.status;
      })
      .finally(() => {
        Waiter.hide();
      });
  }


  signout(): Promise<void> {
    return this.hubService.hubConnection.stop();
  }


  private listeners() {

    if (this.hubService.hubConnection) {

      this.hubService.hubConnection.on(this.hub.on.ShareUserConnections,
        users => {
          this.users = users;
          this.usersListener.next(users);
        });

      this.hubService.hubConnection.on(this.hub.on.ShareDeletedUser,
        userId => {
          this.deletedUserListener.next(userId);
        });

    }
  }

}
