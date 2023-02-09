import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loading?: HTMLIonLoadingElement;

  /**
   * Creates an instance of LoadingService.
   */
  constructor(private loadingCtrl: LoadingController) {}

  /**
   * Exibe o loading com delay
   */
  show = async (opts: LoadingOptions | string) => {
    (await this.instance(opts)).present();
  };

  /**
   *
   */
  dismiss = () => {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = undefined;
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
