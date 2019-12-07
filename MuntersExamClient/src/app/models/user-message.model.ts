import { IConversationModel } from '../pages/chat/conversation/conversation.model';



export interface IMessageDictionary {
  [key: string]: IConversationModel;
}


export interface IUserMessage {
  id: number;
  text: string;
  sender: string;
  isReaded: boolean;
}


export class UserMessage implements IUserMessage {
  public isReaded = false;
  constructor(
    public id: number,
    public text: string,
    public sender: string,
  ) { }
}


export interface IGeneralUserMessage extends IUserMessage {
  id: number;
  text: string;
  sender: string;
  isReaded: boolean;
  nickname: string;
}


