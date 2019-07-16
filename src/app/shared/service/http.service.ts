import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  path = 'http://localhost:8080';

  // getToken() : Observable<any> {
  //   let url = `${this.path}/customer/login`;
  //   return this.httpClient.post<any>(url, );
  // }
}
