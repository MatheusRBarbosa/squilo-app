import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'vaultCurrency', standalone: true })
export class CurrencyPipe implements PipeTransform {
  transform(value: number) {
    return `R$ ${value.toFixed(2)}`;
  }
}
