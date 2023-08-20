import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_auth: string = '';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  accessToken$: Observable<string | null> = this.accessTokenSubject.asObservable();

  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$: Observable<string[]> = this.rolesSubject.asObservable();

  private associateIdSubject = new BehaviorSubject<number | null>(null);
  associateId$: Observable<number | null> = this.associateIdSubject.asObservable();

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
  setLoggedInStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  setAccessToken(token: string) {
    this.accessTokenSubject.next(token);
  }

  setRoles(roles: string[]) {
    this.rolesSubject.next(roles);
  }

  setAssociateId(associateId: number) {
    this.associateIdSubject.next(associateId);
  }
  

}
