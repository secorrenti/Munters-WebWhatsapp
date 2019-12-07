import { UserAuth } from 'src/utils/user.auth.interface';
import { IUserMessage } from 'src/app/models/user-message.model';


export interface IConversationModel {

  name: string;
  owner: UserAuth;
  guest: UserAuth;
  messages: Array<IUserMessage>;

}
