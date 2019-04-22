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

  login(username, password) : Observable<CommonResponse<Customer>> {
    let url = 'http://localhost:8080/customer/${username}/${password}';
    return this.httpClient.get<CommonResponse<Customer>>(url);
  }
}
