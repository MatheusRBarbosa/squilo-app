import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApiFacade } from '@squilo/services';
import { Vault } from '@squilo/domain';
import { tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'squilo-vault-list-page',
  templateUrl: './vault-list.page.html',
  styleUrls: ['vault-list.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class VaultListPage implements OnInit {
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
}
