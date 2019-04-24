import { Account } from './account';
import { Customer } from './customer';
import { Wallet } from './wallet';

export class WalletAccount {
  id;
  wallet: Wallet;
  account: Account;
  customer: Customer;
}
