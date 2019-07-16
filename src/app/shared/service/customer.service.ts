import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { Observable } from 'rxjs';
import { CommonResponse } from '../model/common-response';
import { Customer } from '../model/customer';
import { address } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  login(loginData: Login) : Observable<CommonResponse<Customer>> {
    let url = `${address()}/customer/login`;
    return this.httpClient.post<CommonResponse<Customer>>(url, loginData);
  }

  register(registerData: Customer) : Observable<CommonResponse<Customer>> {
    let url = `${address()}/customer`;
    return this.httpClient.post<CommonResponse<Customer>>(url, registerData);
  }

  getCustomer(cif) {
    let url = `${address()}/customer/${cif}`;
    return this.httpClient.get<CommonResponse<Customer>>(url);
  }

  editCustomer(customerData: Customer) {
    let url = `${address()}/account/`;
    return this.httpClient.patch<CommonResponse<Customer>>(url, customerData);
  }

  // login(loginData: Login) : Observable<CommonResponse<Customer>> {
  //   let url = `http:/api/customer/login`;
  //   return this.httpClient.post<CommonResponse<Customer>>(url, loginData);
  // }

  // register(registerData: Customer) : Observable<CommonResponse<Customer>> {
  //   let url = `http:/api/customer`;
  //   return this.httpClient.post<CommonResponse<Customer>>(url, registerData);
  // }

  // getCustomer(cif) {
  //   let url = `http:/api/customer/${cif}`;
  //   return this.httpClient.get<CommonResponse<Customer>>(url);
  // }

  // editCustomer(customerData: Customer) {
  //   let url = `http:/api/account/`;
  //   return this.httpClient.patch<CommonResponse<Customer>>(url, customerData);
  // }
}
