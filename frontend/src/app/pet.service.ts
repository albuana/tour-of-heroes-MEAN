import { Injectable } from '@angular/core';
import { Pet } from './pet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  
  private petsUrl = 'http://localhost:6330/pets';  // URL to web api
  private petUrl = 'http://localhost:6330/pet';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl)
      .pipe(
        tap(_ => this.log('fetched pets')),
        catchError(this.handleError<Pet[]>('getPets', []))
      );
  }

  getPet(id: string): Observable<Pet>{
    const url = `${this.petUrl}/${id}`;
    return this.http.get<Pet>(url).pipe(
      tap(_ => this.log(`fetched pet name=${id}`)),
      catchError(this.handleError<Pet>(`getPet name=${id}`))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PetService: ${message}`);
  }

}

