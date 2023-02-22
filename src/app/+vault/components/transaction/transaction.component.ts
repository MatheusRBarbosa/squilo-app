import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CurrencyPipe } from '@squilo/core';
import { Transaction } from '@squilo/domain';

@Component({
  standalone: true,
  selector: 'squilo-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  imports: [IonicModule, CommonModule, CurrencyPipe],
})
export class TransactionComponent {
  @Input()
  transaction!: Transaction;

  @Output()
  onClickTransaction$ = new EventEmitter<Transaction>();

  /**
   *
   */
  onClickTransaction = () => {
    this.onClickTransaction$.emit(this.transaction);
  };
}
