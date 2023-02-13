import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { Vault } from '@squilo/domain';
import { ApiFacade } from '@squilo/services';
import { tap } from 'rxjs';
import { VaultComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'squilo-vault-list-page',
  templateUrl: './vault-list.page.html',
  styleUrls: ['vault-list.page.scss'],
  imports: [IonicModule, CommonModule, VaultComponent],
})
export class VaultListPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  currentVaultModal!: Vault;
  vaultList!: Vault[];

  constructor(private api: ApiFacade) {}

  /**
   *
   */
  ngOnInit(): void {
    this.api.vault
      .getAll()
      .pipe(tap((vaultList) => (this.vaultList = vaultList)))
      .subscribe();
  }

  /**
   *
   */
  t = () => {
    console.log(this.vaultList);
  };

  /**
   *
   */
  handleClickInfo = (vault: Vault) => {
    console.log(vault);
    this.modal.present();
    this.currentVaultModal = vault;
  };
}
