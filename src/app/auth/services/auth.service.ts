import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../env/env';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = env.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  login(email: String, password: string): Observable<User> {
    //http.post({'login', {email, password}})
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('token', user.id.toString()))
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    // Crea una copia profunda
    return structuredClone(this.user);
  }

  checkAuthentication(): Observable<boolean>{
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      map((user) => !!user),
      catchError((err) => of(false))
    );
  }
}
