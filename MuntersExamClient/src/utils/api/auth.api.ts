import { environment } from 'src/environments/environment';




export class AuthApi {

  private readonly prefix = 'api/auth';


  public login(): string {
    return `${environment.baseUrl + this.prefix}/login`;
  }

}


