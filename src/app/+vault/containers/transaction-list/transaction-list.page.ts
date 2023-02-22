import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, IonModal } from '@ionic/angular';
import { Transaction, Vault } from '@squilo/domain';
import { ApiFacade } from '@squilo/services';
import { tap } from 'rxjs';
import { NavbarComponent } from '../../../shared';
import { TransactionComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'squilo-transaction-list-page',
  templateUrl: './transaction-list.page.html',
  styleUrls: ['transaction-list.page.scss'],
  imports: [IonicModule, CommonModule, TransactionComponent, NavbarComponent],
})
export class TransactionListPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  currentTransaction!: Transaction;
  transactions!: Transaction[];
  currentVault!: Vault;

  constructor(private api: ApiFacade, private router: Router) {}

  /**
   *
   */
  ngOnInit(): void {
    const state: any = this.router.getCurrentNavigation()?.extras.state;
    this.currentVault = state.vault;

    this.api.transaction
      .getAll(`${this.currentVault.id}/transaction`)
      .pipe(tap((transactions) => (this.transactions = transactions)))
      .subscribe();
  }

  /**
   *
   */
  // handleClickInfo = (vault: Vault) => {
  //   this.currentVaultModal = vault;
  //   this.modal.present();
  // };
}
