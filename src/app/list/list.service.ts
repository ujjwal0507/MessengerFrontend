import { Injectable } from '@angular/core';
import { Contact } from './contact';
import {Observable, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private url = "/data/data.json";

  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(this.url).pipe(
      tap(contacts=> console.log(contacts)),
      catchError(this.handleError)
    );
  }

  getContact(id: number): Observable<Contact>{
    return this.getContacts().pipe(
      map((contacts:Contact[])=> contacts.find(c=> c.contactId===id))
    );
  }

/*
  getContact(id: number): Observable<Contact>{
    return this.getContacts().pipe(
      map((contacts: Contact[])=>contacts.find(c=> c.contactId===id))
    );
  }
*/
  handleError(err: HttpErrorResponse){
    let message: string = "";
    if(err.error instanceof ErrorEvent){
      message = `This is a client side error ${err.error.message}`; 
    }
    else{
      message = `This is a server side error: ${err.status}, message: ${err.error.message}`;
    }
    console.error(message);
    return throwError(message);
  }

  constructor(private http: HttpClient) { }
}
