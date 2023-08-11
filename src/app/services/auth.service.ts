import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public api_auth: string = '';

  constructor(private http: HttpClient) {
    this.api_auth = environment.loginUrl;
  }

  login(user: User): Observable<any> {
    return this.http.post(this.api_auth + '/signin', user);
  }

  addUser(user: User): Observable<Object> {
    return this.http.post(`${this.api_auth}/registration`, user);
  }

  changePassword(password:string,id:string): Observable<any> {
    return this.http.put(this.api_auth + `/change-password/${id}`, {password:password});
  }
}
