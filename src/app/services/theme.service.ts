import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * ThemeService - Manages light/dark theme switching
 * Persists user preference to localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private darkModeSubject = new BehaviorSubject<boolean>(this.loadTheme());

  darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  constructor() {
    this.applyTheme(this.darkModeSubject.value);
  }

  /**
   * Get current theme mode
   */
  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  /**
   * Toggle between light and dark mode
   */
  toggleTheme(): void {
    const newMode = !this.darkModeSubject.value;
    this.setTheme(newMode);
  }

  /**
   * Set theme explicitly
   */
  setTheme(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    this.applyTheme(isDark);
    this.saveTheme(isDark);
  }

  /**
   * Apply theme to document
   */
  private applyTheme(isDark: boolean): void {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark-mode');
    }
  }

  /**
   * Save theme preference to localStorage
   */
  private saveTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, JSON.stringify(isDark));
  }

  /**
   * Load theme preference from localStorage
   * Defaults to light mode if not saved
   */
  private loadTheme(): boolean {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved !== null) {
      return JSON.parse(saved);
    }

    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
