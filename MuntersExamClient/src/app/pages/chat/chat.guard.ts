import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Injectable()
export class ChatGuard implements CanActivate, CanDeactivate<void> {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    const admin = this.authService.getAdmin();
    if (!admin) {
      this.router.navigate(['./login']);
      return false;
    }
    return true;
  }

  canDeactivate(): Promise<boolean> {
    return this.authService.signout().then(() => true);
  }

}
