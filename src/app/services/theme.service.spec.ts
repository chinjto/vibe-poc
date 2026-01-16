import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear();
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme', (done) => {
    const initialMode = service.isDarkMode();
    service.toggleTheme();
    service.darkMode$.subscribe((isDark) => {
      expect(isDark).toBe(!initialMode);
      done();
    });
  });

  it('should save theme to localStorage', () => {
    service.setTheme(true);
    expect(localStorage.getItem('app-theme')).toBe('true');

    service.setTheme(false);
    expect(localStorage.getItem('app-theme')).toBe('false');
  });

  it('should apply dark-mode class to html element', () => {
    service.setTheme(true);
    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);

    service.setTheme(false);
    expect(document.documentElement.classList.contains('dark-mode')).toBe(false);
  });
});
