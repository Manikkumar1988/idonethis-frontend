import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { map } from 'rxjs/operators';

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
        })
      );
  }
}
