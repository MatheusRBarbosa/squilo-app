import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { Vault } from '@squilo/domain';
import { ApiFacade } from '@squilo/services';
import { tap } from 'rxjs';
import { VaultComponent } from '../../components';
import { NavbarComponent } from '../../../shared';

@Component({
  standalone: true,
  selector: 'squilo-transaction-list-page',
  templateUrl: './transaction-list.page.html',
  styleUrls: ['transaction-list.page.scss'],
  imports: [IonicModule, CommonModule, VaultComponent, NavbarComponent],
})
export class TransactionListPage implements OnInit {
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
    this.currentVaultModal = vault;
    this.modal.present();
  };
}
