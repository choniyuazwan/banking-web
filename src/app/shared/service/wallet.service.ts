import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../model/wallet';
import { CommonResponse } from '../model/common-response';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private httpClient: HttpClient) { }

  path = 'http://localhost:8080';

  getWallets(cif) {
    let url = `${this.path}/wallets?cif=${cif}`;
    return this.httpClient.get<CommonResponse<Wallet>>(url);
  }

  addWallet(walletData: Wallet): Observable<CommonResponse<Wallet>> {
    let url = `${this.path}/wallet/`;
    return this.httpClient.post<CommonResponse<Wallet>>(url, walletData);
  }

  getWallet(walletNumber) {
    let url = `${this.path}/wallet/${walletNumber}`;
    return this.httpClient.get<CommonResponse<Wallet>>(url);
  }

  editWallet(walletData: Wallet) {
    let url = `${this.path}/wallet/`;
    return this.httpClient.patch<CommonResponse<Wallet>>(url, walletData);
  }

  deleteWallet(walletNumber) {
    let url = `${this.path}/wallet/${walletNumber}`;
    return this.httpClient.delete<CommonResponse<Wallet>>(url);
  }

  // getWallets(cif) {
  //   let url = `http:/api/wallets?cif=${cif}`;
  //   return this.httpClient.get<CommonResponse<Wallet>>(url);
  // }

  // addWallet(walletData: Wallet): Observable<CommonResponse<Wallet>> {
  //   let url = `http:/api/wallet/`;
  //   return this.httpClient.post<CommonResponse<Wallet>>(url, walletData);
  // }

  // getWallet(walletNumber) {
  //   let url = `http:/api/wallet/${walletNumber}`;
  //   return this.httpClient.get<CommonResponse<Wallet>>(url);
  // }

  // editWallet(walletData: Wallet) {
  //   let url = `http:/api/wallet/`;
  //   return this.httpClient.patch<CommonResponse<Wallet>>(url, walletData);
  // }

  // deleteWallet(walletNumber) {
  //   let url = `http:/api/wallet/${walletNumber}`;
  //   return this.httpClient.delete<CommonResponse<Wallet>>(url);
  // }
}
