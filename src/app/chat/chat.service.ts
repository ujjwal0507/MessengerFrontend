import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IChat } from './IChat';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = "/data/chat.json";

  getChats(): Observable<IChat[]>{
    return this.http.get<IChat[]>(this.url).pipe(
      tap(chats=> console.log(chats)),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse){
    let message = "";
    if(err.error instanceof ErrorEvent){
      message = `This is a client side error ${err.error.message}`;
    }
    else{
      message = `This.is a server side error: ${err.status}, message: ${err.error.message}`;
    }
    console.error(message);
    return throwError(message);
  }

  constructor(private http: HttpClient) {
  
  }
}
