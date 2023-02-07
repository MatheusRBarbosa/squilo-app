import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toast: any;
  private defaultOptions: ToastOptions = {
    duration: 10000,
    position: 'bottom',
    color: 'primary',
  };

  constructor(private toastController: ToastController) {}

  /**
   *
   */
  show = (options: ToastOptions | string) => {
    const toast = this.instance(options);
    from(toast)
      .pipe(finalize(() => (this.toast = null)))
      .subscribe((toast) => toast.present());

    return toast;
  };

  /**
   *
   */
  private instance = async (
    options: ToastOptions | string
  ): Promise<HTMLIonToastElement> => {
    if (!this.toast) {
      const opts =
        typeof options === 'string'
          ? { ...this.defaultOptions, message: options }
          : { ...this.defaultOptions, ...options };
      const toast = await this.toastController.create(opts);
      this.toast = toast;
      return toast;
    }

    return this.toast;
  };
}
