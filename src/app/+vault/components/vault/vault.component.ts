import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CurrencyPipe } from '@squilo/core';
import { Vault, VaultTypeEnum } from '@squilo/domain';

@Component({
  standalone: true,
  selector: 'squilo-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.scss'],
  imports: [IonicModule, CommonModule, CurrencyPipe],
})
export class VaultComponent {
  @Input()
  vault!: Vault;

  @Output()
  onClickInfo$ = new EventEmitter<Vault>();

  constructor(private router: Router) {}

  get exceededLimit(): boolean {
    return (
      (this.vault.typeId == VaultTypeEnum.Quota ||
        this.vault.typeId == VaultTypeEnum.Bag) &&
      this.vault.total < 0
    );
  }

  /**
   *
   */
  onClickVault = () => {};

  /**
   *
   */
  onClickInfo = () => {
    this.onClickInfo$.emit(this.vault);
  };
}
