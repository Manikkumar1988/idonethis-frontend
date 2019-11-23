import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './_models/user';
import { Status } from './_models/status';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'password': password,
        'userId': userName
      })
    };

    console.log(httpOptions);
    return this.http
      .get<User>(`https://idonethis-backend.herokuapp.com/user`,httpOptions)
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }),
        catchError((e: any) =>{
          return throwError(e);
        })
      );
  }

  register(firstName: string,username: string,password :string){
    return this.http
     .post<Status>(`http://localhost:8089/register`, { firstName, username, password })
     .pipe(
      map(user => {
         return user;
      }),
      catchError((e: any) =>{
        return throwError(e);
      })
    );

  }
  logout() {
    localStorage.removeItem('currentUser');
  }
}
