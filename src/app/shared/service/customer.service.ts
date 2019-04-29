import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { Observable } from 'rxjs';
import { CommonResponse } from '../model/common-response';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  login(loginData: Login) : Observable<CommonResponse<Customer>> {
    let url = `http://localhost:8080/customer/login`;
    return this.httpClient.post<CommonResponse<Customer>>(url, loginData);
  }

  register(registerData: Customer) : Observable<CommonResponse<Customer>> {
    let url = `http://localhost:8080/customer`;
    return this.httpClient.post<CommonResponse<Customer>>(url, registerData);
  }

  getCustomer(cif) {
    let url = `http://localhost:8080/customer/${cif}`;
    return this.httpClient.get<CommonResponse<Customer>>(url);
  }
}
