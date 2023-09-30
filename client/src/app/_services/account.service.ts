import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(response => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    this.currentUserSource.next(null);
    localStorage.removeItem('user');
  }
}
