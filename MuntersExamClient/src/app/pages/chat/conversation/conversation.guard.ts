import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ConversationService } from './conversation.service';

@Injectable()
export class ConversationGuard implements CanActivate {

  constructor(
    private convService: ConversationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.convService.checkRoom(route.params.userId).then(() => true);
  }

}


