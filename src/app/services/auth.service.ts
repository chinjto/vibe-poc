import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  email: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USER_KEY = 'auth-user';
  private userSubject = new BehaviorSubject<User | null>(this.loadUser());
  user$ = this.userSubject.asObservable();

  login(email: string, password: string): boolean {
    if (email === 'admin' && password === 'password') {
      const user = { email, token: 'mock-token-123' };
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      this.userSubject.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.userSubject.next(null);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
