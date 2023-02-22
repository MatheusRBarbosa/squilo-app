import { Model } from './model';

export class Transaction extends Model {
  vaultId!: number;
  value!: number;
  date!: Date;
  observation?: string;

  // Mapped Relations
}
