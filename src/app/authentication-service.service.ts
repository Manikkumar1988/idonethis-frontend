import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './_models/user';
import { Status } from './_models/status';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    return this.http
      .post<User>(`http://localhost:8089/login`, { userName, password })
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }),
        catchError(
          (e: HttpErrorResponse): Observable<User> => {
            return new Observable<User>(subscriber =>
              subscriber.next(new User())
            );
          }
        )
      );
  }
  register(firstName: string,username: string,password :string){
    return this.http
     .post<Status>(`http://localhost:8089/register`, { firstName, username, password })
     .pipe(
      map(user => {
         return user;
      }),
      catchError(
        (e: HttpErrorResponse): Observable<Status> => {
          return new Observable<Status>(subscriber =>
            subscriber.next(new Status())
          );
        }
      )
    );

  }
  logout() {
    localStorage.removeItem('currentUser');
  }
}
