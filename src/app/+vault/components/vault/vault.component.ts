import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output()
  onClickVault$ = new EventEmitter<Vault>();

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
  onClickVault = () => {
    this.onClickVault$.emit(this.vault);
  };

  /**
   *
   */
  onClickInfo = () => {
    this.onClickInfo$.emit(this.vault);
  };
}
