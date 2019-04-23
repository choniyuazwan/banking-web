import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonResponse } from '../model/common-response';
import { Account } from '../model/account';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  getAccounts(cif) {
    let url = `http://localhost:8080/accounts?cif=${cif}`;
    return this.httpClient.get<CommonResponse<Account>>(url);
  }

  addAccount(accountData: Account) : Observable<CommonResponse<Customer>> {
    let url = `http://localhost:8080/account/`;
    return this.httpClient.post<CommonResponse<Customer>>(url, accountData);
  }
}
