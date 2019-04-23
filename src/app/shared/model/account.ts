export class Account {
  accountNumber;
  accountName;
  balance;
  openDate;
  customer: { [x: string]: string; }[];
}
