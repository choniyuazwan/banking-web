import { Account } from './account';
import { Customer } from './customer';
import { TransactionType } from './transaction-type';

export class Transaction {
  id;
  type: TransactionType;
  accountDebit: Account;
  accountCredit: Account;
  amount;
  date;
  customer: Customer;
}
