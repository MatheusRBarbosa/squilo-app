// import { Injectable } from '@angular/core';
// import { Token, User } from '@squilo/domain';
// import { Store, StoreConfig } from '@datorama/akita';

// export interface AccountState {
//   token?: Token;
//   user?: User;
// }

// const initialAccountState = (): AccountState => {
//   return {
//     token: '',
//     user: undefined,
//   };
// };

// @Injectable({ providedIn: 'root' })
// @StoreConfig({ name: 'account', resettable: true })
// export class AccountStore extends Store<AccountState> {
//   constructor() {
//     super(initialAccountState());
//   }

//   /**
//    *
//    */
//   setToken = (token: Token) => this.update({ token });

//   /**
//    *
//    */
//   setUser = (user: User) => this.update({ user });
// }
