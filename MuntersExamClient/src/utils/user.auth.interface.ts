

export interface IUserAuth {
  avatar: string;
  nickname: string;
  encryption: string;
  connectionId: string;
}


export class UserAuth implements IUserAuth {

  encryption: string;
  connectionId: string;

  constructor(
    public avatar: string,
    public nickname: string,
  ) { }

}



