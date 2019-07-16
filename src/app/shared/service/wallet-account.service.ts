import { Injectable } from '@angular/core';
import { CommonResponse } from '../model/common-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WalletAccount } from '../model/wallet-account';

@Injectable({
  providedIn: 'root'
})
export class WalletAccountService {

  constructor(private httpClient: HttpClient) { }

  path = 'http://localhost:8080';

  getWalletAccounts(cif) {
    let url = `${this.path}/walletaccounts?cif=${cif}`;
    return this.httpClient.get<CommonResponse<WalletAccount>>(url);
  }

  addWalletAccount(walletAccountData: WalletAccount): Observable<CommonResponse<WalletAccount>> {
    let url = `${this.path}/walletaccount/`;
    return this.httpClient.post<CommonResponse<WalletAccount>>(url, walletAccountData);
  }

  deleteWalletAccount(id) {
    let url = `${this.path}/walletaccount/${id}`;
    return this.httpClient.delete<CommonResponse<WalletAccount>>(url);
  }

  // getWalletAccounts(cif) {
  //   let url = `http:/api/walletaccounts?cif=${cif}`;
  //   return this.httpClient.get<CommonResponse<WalletAccount>>(url);
  // }

  // addWalletAccount(walletAccountData: WalletAccount): Observable<CommonResponse<WalletAccount>> {
  //   let url = `http:/api/walletaccount/`;
  //   return this.httpClient.post<CommonResponse<WalletAccount>>(url, walletAccountData);
  // }

  // deleteWalletAccount(id) {
  //   let url = `http:/api/walletaccount/${id}`;
  //   return this.httpClient.delete<CommonResponse<WalletAccount>>(url);
  // }
}
