import { Subject } from 'rxjs';

type Constructor<T = {}> = new (...args: any[]) => T;
export function disposable<TBase extends Constructor>(Base: TBase) {
  /**
   *
   *
   */
  abstract class Disposable extends Base {
    public destroyed$$ = new Subject();

    /**
     *
     *
     */
    dispose() {
      if (this.destroyed$$) {
        this.destroyed$$.next({});
        this.destroyed$$.complete();
      }
    }
  }

  return Disposable;
}
