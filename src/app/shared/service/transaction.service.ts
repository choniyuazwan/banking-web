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
  
  path = 'http://localhost:8080';

  getTransactions(cif) {
    let url = `${this.path}/transactions?cif=${cif}`;
    return this.httpClient.get<CommonResponse<Transaction[]>>(url);
  }

  addTransaction(transactionData: Transaction): Observable<CommonResponse<Transaction>> {
    let url = `${this.path}/transaction/`;
    return this.httpClient.post<CommonResponse<Transaction>>(url, transactionData);
  }

  getTransaction(id) {
    let url = `${this.path}/transaction/${id}`;
    return this.httpClient.get<CommonResponse<Transaction>>(url);
  }

  // getTransactions(cif) {
  //   let url = `http:/api/transactions?cif=${cif}`;
  //   return this.httpClient.get<CommonResponse<Transaction[]>>(url);
  // }

  // addTransaction(transactionData: Transaction): Observable<CommonResponse<Transaction>> {
  //   let url = `http:/api/transaction/`;
  //   return this.httpClient.post<CommonResponse<Transaction>>(url, transactionData);
  // }

  // getTransaction(id) {
  //   let url = `http:/api/transaction/${id}`;
  //   return this.httpClient.get<CommonResponse<Transaction>>(url);
  // }
}
