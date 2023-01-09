import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loading: any;

  /**
   * Creates an instance of LoadingService.
   */
  constructor(private loadingCtrl: LoadingController) {}

  /**
   * Exibe o loading com delay
   */
  show = (opts: LoadingOptions | string) => {
    const loading = this.instance(opts);
    from(loading).subscribe((loading) => loading.present());

    return loading;
  };

  /**
   *
   */
  dismiss = () => {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  };

  /**
   * Singleton de Loading
   */
  private instance = async (
    opts: LoadingOptions | string
  ): Promise<HTMLIonLoadingElement> => {
    if (!this.loading) {
      const loading = await this.loadingCtrl.create(
        typeof opts === 'string' ? { message: opts } : { ...opts }
      );
      this.loading = loading;
      return loading;
    }

    return this.loading;
  };
}
