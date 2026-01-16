# PrimeNG Configuration

This project uses **PrimeNG** for UI components with a custom theme configuration.

## Theme Configuration

### Colors
- **Primary**: Yellow (Amber shade)
  - Used for primary actions, buttons, and highlights
  - Primary-500: `#f59e0b` (main color)
- **Surface**: Stone
  - Used for backgrounds and surface elements
  - Surface-0 (light mode): `#fafaf9`
  - Surface-900 (dark mode): `#0f0f0f`

### Dark/Light Mode

The application supports both light and dark themes with automatic persistence.

#### How It Works
1. Theme preference is stored in `localStorage` with key `app-theme`
2. System preference is detected if no saved preference exists
3. The `.dark-mode` class is applied to the root HTML element
4. CSS variables automatically adjust for dark theme

#### Using the Theme Toggle
- Located in the app header (top-right corner)
- Click the button to switch between light and dark modes
- Your preference is automatically saved

## Files Structure

```
src/
├── app/
│   ├── services/
│   │   └── theme.service.ts        # Theme management service
│   ├── components/
│   │   └── theme-toggle/
│   │       ├── theme-toggle.component.ts
│   │       └── theme-toggle.component.spec.ts
│   ├── app.config.ts               # PrimeNG configuration
│   └── app.ts                       # Root component
└── styles.scss                      # Global styles with theme variables
```

## Usage Examples

### Inject ThemeService
```typescript
import { ThemeService } from './services/theme.service';

constructor(private themeService: ThemeService) {}

// Check current theme
const isDark = this.themeService.isDarkMode();

// Toggle theme
this.themeService.toggleTheme();

// Set explicit theme
this.themeService.setTheme(true); // dark
this.themeService.setTheme(false); // light

// Listen to theme changes
this.themeService.darkMode$.subscribe(isDark => {
  console.log('Theme changed to:', isDark ? 'dark' : 'light');
});
```

### Using PrimeNG Components
```typescript
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  imports: [ButtonModule, CardModule],
  template: `
    <p-card>
      <button pButton type="button" label="Click me" class="p-button-primary"></button>
    </p-card>
  `
})
export class MyComponent {}
```

## Available PrimeNG Components

Common components you can use:
- `ButtonModule` - Buttons with various variants
- `CardModule` - Card containers
- `InputTextModule` - Text inputs
- `PasswordModule` - Password inputs
- `MessageModule` - Message alerts
- `DialogModule` - Modal dialogs
- `MenuModule` - Navigation menus
- `TabViewModule` - Tab navigation
- And many more...

See [PrimeNG Documentation](https://primeng.org) for full list.

## CSS Variables

The following CSS variables are available for custom styling:

```css
/* Primary Colors (Yellow/Amber) */
--p-primary-50: #fffbeb;
--p-primary-500: #f59e0b;
--p-primary-900: #78350f;

/* Surface Colors (Stone) */
--p-surface-0: Light/Dark background
--p-surface-500: Mid-tone
--p-surface-900: Dark/Light text color
```

Use in your components:
```scss
.my-element {
  background-color: var(--p-surface-100);
  color: var(--p-primary-500);
}
```

## Troubleshooting

### Theme not changing?
- Check that `localStorage` is enabled in your browser
- Verify the `.dark-mode` class is being added to `<html>` element

### Styles not applying?
- Ensure PrimeNG styles are imported in `src/styles.scss`
- Clear browser cache and rebuild the project

### Components not displaying correctly?
- Import the required module for each PrimeNG component
- Check that `providePrimeNG` is configured in `app.config.ts`

## References
- [PrimeNG Documentation](https://primeng.org)
- [PrimeNG Themes](https://primeng.org/theming)
- [Aura Theme](https://primeng.org/theming-aura)
