import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HubService {

  hubConnection: signalR.HubConnection;
  activateListeners = new Subject<void>();

  startConnection(encryption: string): Promise<boolean> {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseUrl + 'ChatHubSection', {
        accessTokenFactory: () => encryption
      }).build();

    this.activateListeners.next();
    return this.hubConnection.start()
      .then(() => true)
      .catch(() => false);

  }

}
