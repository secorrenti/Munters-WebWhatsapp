import { Subject } from 'rxjs';

export class Waiter {

  public static handler = new Subject<boolean>();

  static show(): void {
    Waiter.handler.next(true);
  }

  static hide(): void {
    Waiter.handler.next(false);
  }

}
