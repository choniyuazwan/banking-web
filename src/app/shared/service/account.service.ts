import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonResponse } from '../model/common-response';
import { Account } from '../model/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  // getAccounts(cif) {
  //   let url = `http://localhost:8080/accounts?cif=${cif}`;
  //   return this.httpClient.get<CommonResponse<Account>>(url);
  // }

  // addAccount(accountData: Account): Observable<CommonResponse<Account>> {
  //   let url = `http://localhost:8080/account/`;
  //   return this.httpClient.post<CommonResponse<Account>>(url, accountData);
  // }

  // getAccount(accountNumber) {
  //   let url = `http://localhost:8080/account/${accountNumber}`;
  //   return this.httpClient.get<CommonResponse<Account>>(url);
  // }

  // editAccount(accountData: Account) {
  //   let url = `http://localhost:8080/account/`;
  //   return this.httpClient.patch<CommonResponse<Account>>(url, accountData);
  // }

  // deleteAccount(accountNumber) {
  //   let url = `http://localhost:8080/account/${accountNumber}`;
  //   return this.httpClient.delete<CommonResponse<Account>>(url);
  // }

  getAccounts(cif) {
    let url = `http:/api/accounts?cif=${cif}`;
    return this.httpClient.get<CommonResponse<Account>>(url);
  }

  addAccount(accountData: Account): Observable<CommonResponse<Account>> {
    let url = `http:/api/account/`;
    return this.httpClient.post<CommonResponse<Account>>(url, accountData);
  }

  getAccount(accountNumber) {
    let url = `http:/api/account/${accountNumber}`;
    return this.httpClient.get<CommonResponse<Account>>(url);
  }

  editAccount(accountData: Account) {
    let url = `http:/api/account/`;
    return this.httpClient.patch<CommonResponse<Account>>(url, accountData);
  }

  deleteAccount(accountNumber) {
    let url = `http:/api/account/${accountNumber}`;
    return this.httpClient.delete<CommonResponse<Account>>(url);
  }
}
