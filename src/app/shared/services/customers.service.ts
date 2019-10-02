import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'customer')
      .pipe(
        tap(_ => this.log('fetched customers')),
        catchError(this.handleError<Customer[]>('getAll', []))
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
