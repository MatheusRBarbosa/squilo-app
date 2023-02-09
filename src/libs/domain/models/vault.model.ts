import { Model } from './model';
import { VaultType } from './vaultType.model';

export class Vault extends Model {
  name!: string;
  description!: string;
  total!: number;
  typeId!: number;
  type!: VaultType;
}
