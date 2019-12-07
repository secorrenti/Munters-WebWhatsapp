import { IHubSection } from './hub.section';


enum RoomHubFns {
  CheckRoom = 'CheckRoom',
  AddMessage = 'AddMessage',
  AllMessagesReaded = 'AllMessagesReaded',
  AddMessageToGeneral = 'AddMessageToGeneral',
}

enum RoomHubListeners {
  ShareRoomMessage = 'ShareRoomMessage',
  ShareRoomToUser = 'ShareRoomToUser',
  ShareGroupNameReaded = 'ShareGroupNameReaded',
  ShareGeneralMessage = 'ShareGeneralMessage',
}

export class RoomHubSection implements IHubSection {
  public fns = RoomHubFns;
  public on = RoomHubListeners;
}

