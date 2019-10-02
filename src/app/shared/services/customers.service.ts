import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Customer } from '../models/customer.model';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'customer')
      .pipe(
        tap(_ => this.log('fetched customers')),
        catchError(this.handleError<Customer[]>('getAll', []))
      );
  }

  get(id: number): Observable<Customer> {
    const url = `${this.baseUrl}customer/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  add(customer: Customer): Observable<Customer> {
    console.log(customer);
    console.log(JSON.stringify(customer));
    return this.http.post<Customer>(`${this.baseUrl}customer`, customer, this.httpOptions).pipe(
      tap((newCustomer: Customer) => this.log(`added customer w/ id=${newCustomer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  update(customer: Customer): Observable<any> {
    return this.http.put(`${this.baseUrl}customer/${customer.id}`, customer, this.httpOptions).pipe(
      tap(_ => this.log(`updated customer id=${customer.id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  delete(customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.baseUrl}customer/${id}`;

    return this.http.delete<Customer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
