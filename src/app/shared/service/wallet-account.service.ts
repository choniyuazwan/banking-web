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

  getWalletAccounts(cif) {
    let url = `http://localhost:8080/walletaccounts?cif=${cif}`;
    return this.httpClient.get<CommonResponse<WalletAccount>>(url);
  }

  // addWalletAccount(walletAccountData: WalletAccount): Observable<CommonResponse<WalletAccount>> {
  //   let url = `http://localhost:8080/walletaccount/`;
  //   return this.httpClient.post<CommonResponse<WalletAccount>>(url, walletAccountData);
  // }

  // getWalletAccount(walletaccountNumber) {
  //   let url = `http://localhost:8080/walletaccount/${walletaccountNumber}`;
  //   return this.httpClient.get<CommonResponse<WalletAccount>>(url);
  // }

  // editWalletAccount(walletAccountData: WalletAccount) {
  //   let url = `http://localhost:8080/walletaccount/`;
  //   return this.httpClient.patch<CommonResponse<WalletAccount>>(url, walletAccountData);
  // }

  // deleteWalletAccount(walletaccountNumber) {
  //   let url = `http://localhost:8080/walletaccount/${walletaccountNumber}`;
  //   return this.httpClient.delete<CommonResponse<WalletAccount>>(url);
  // }
}
