import { Token, User } from '@squilo/domain';

export interface AccountState {
  token?: Token;
  user?: User;
}
