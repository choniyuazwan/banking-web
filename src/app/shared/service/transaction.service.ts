import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonResponse } from '../model/common-response';
import { Transaction } from '../model/transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  getTransactions(cif) {
    let url = `http://localhost:8080/transactions?cif=${cif}`;
    return this.httpClient.get<CommonResponse<Transaction>>(url);
  }

  addTransaction(transactionData: Transaction): Observable<CommonResponse<Transaction>> {
    let url = `http://localhost:8080/transaction/`;
    return this.httpClient.post<CommonResponse<Transaction>>(url, transactionData);
  }

  addAccount(accountData: Account): Observable<CommonResponse<Account>> {
    let url = `http://localhost:8080/account/`;
    return this.httpClient.post<CommonResponse<Account>>(url, accountData);
  }

  getTransaction(id) {
    let url = `http://localhost:8080/transaction/${id}`;
    return this.httpClient.get<CommonResponse<Transaction>>(url);
  }
}
