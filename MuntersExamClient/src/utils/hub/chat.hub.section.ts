import { IHubSection } from './hub.section';


enum ChatHubFns {
  GetConnections = 'GetConnections',
}

enum ChatHubListeners {
  ShareUserConnections = 'ShareUserConnections',
  ShareUserConnectionId = 'ShareUserConnectionId',
  ShareDeletedUser = 'ShareDeletedUser',
}

export class ChatHubSection implements IHubSection {
  public fns = ChatHubFns;
  public on = ChatHubListeners;
}

