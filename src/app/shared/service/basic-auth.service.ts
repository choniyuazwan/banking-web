import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';

import { map, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log('intercept request ...');
    console.log(`current headers: ${JSON.stringify(req.headers)}`)

    // const token = localStorage.getItem('access_token');

    req = req.clone(
      { 
        params: req.params.set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJidWRpIiwidXNlcl9uYW1lIjoiYnVkaUBtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSIsInRydXN0Il0sImV4cCI6MTU1ODQ4MjY1MCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJiZGJmOTMwNy01NGY3LTQxN2QtYmMxZC00OGRjN2M4NmIyMjUiLCJnZW5lcmF0ZWRfdGltZSI6MTU1ODQ0NjY1MDU2MywiY2xpZW50X2lkIjoiU1RJIiwidXNlcm5hbWUiOiJidWRpQG1haWwuY29tIn0.8i2w9dM4GD2DBeqja-mzif1sUPLJc-HubFs0Hwn_I5s')
      }
    );

    // if(token) {

    // } else {

    // }

    // if (token) {
    //   req = req.clone(
    //     { params: req.params.set('access_token', token) }
    //   );
    // } else {
    //   req = req.clone(
    //     { params: req.params.set('Authorization', `Basic U1RJOkVOSUdNQQ==`) }
    //   );
    // }

    console.log(`new headers : ${JSON.stringify(req.headers)}`)
    // return next.handle(req)
    // .pipe(
    //   tap(response => console.log(response)),
    //   catchError(this.handleError)
    // )

    return next.handle(req)
    .pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && error.status != 200) {
        return throwError(error)
      } else {
        return throwError(error)
      }
    }))
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
}
