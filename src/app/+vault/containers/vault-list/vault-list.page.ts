import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { Vault } from '@squilo/domain';
import { ApiFacade } from '@squilo/services';
import { tap } from 'rxjs';
import { VaultComponent } from '../../components';
import { NavbarComponent } from '../../../shared';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'squilo-vault-list-page',
  templateUrl: './vault-list.page.html',
  styleUrls: ['vault-list.page.scss'],
  imports: [IonicModule, CommonModule, VaultComponent, NavbarComponent],
})
export class VaultListPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  currentVaultModal!: Vault;
  vaultList!: Vault[];

  constructor(private api: ApiFacade, private router: Router) {}

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

  /**
   *
   */
  handleClickVault = (vault: Vault) => {
    const extras: NavigationExtras = {
      state: {
        vault,
      },
    };

    this.router.navigate([`vault/${vault.id}/transactions`], extras);
  };
}
