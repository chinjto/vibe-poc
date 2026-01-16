import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../services/theme.service';

/**
 * ThemeToggle - Button component to switch between light/dark modes
 * Uses PrimeNG Button with icon
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <button
      pButton
      [icon]="isDark ? 'pi pi-sun' : 'pi pi-moon'"
      class="p-button-rounded p-button-text"
      (click)="toggleTheme()"
      [title]="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      data-cy="theme-toggle"
    ></button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `
  ]
})
export class ThemeToggleComponent implements OnInit {
  isDark: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDark = this.themeService.isDarkMode();
    this.themeService.darkMode$.subscribe((isDark) => {
      this.isDark = isDark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
