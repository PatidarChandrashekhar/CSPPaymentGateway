import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transactions } from './transactions';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // Define API
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /*========================================
    All methods for Transaction API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch Transactionss list
  getTransactions(): Observable<Transactions> {
    return this.http
      .get<Transactions>(this.apiURL + '/transactions')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Transactionss list
  findTransactionByDate(
    startdate: any,
    enddate: any
  ): Observable<Transactions> {
    return this.http
      .get<Transactions>(
        this.apiURL + '/transactions/' + startdate.trim() + '/' + enddate.trim()
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Transactions
  getTransaction(id: any): Observable<Transactions> {
    return this.http
      .get<Transactions>(this.apiURL + '/transactions/' + id.trim())
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create employee
  createEmployee(transactions: any): Observable<Transactions> {
    return this.http
      .post<Transactions>(
        this.apiURL + '/transactions',
        JSON.stringify(transactions),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update employee
  updateEmployee(id: any, transactions: any): Observable<Transactions> {
    return this.http
      .put<Transactions>(
        this.apiURL + '/transactions/' + id,
        JSON.stringify(transactions),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id: any) {
    return this.http
      .delete<Transactions>(
        this.apiURL + '/transactions/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
