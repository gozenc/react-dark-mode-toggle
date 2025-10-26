# React Dark Mode Toggle

A beautiful, animated React dark mode toggle component with zero dependencies. Features smooth animations and customizable styling.

## Demo

![Dark Mode Toggle Animation](https://react-dark-mode-toggle.pages.dev/demo.gif)

_A smooth, animated toggle between light and dark modes_

## Features

- 🎨 **Beautiful animations** - Smooth transitions with elastic easing
- 🎯 **Zero dependencies** - Only requires React and ReactDOM
- 🔧 **Highly customizable** - Colors, sizes, and behavior
- 📱 **Responsive** - Works on all screen sizes
- ♿ **Accessible** - Proper ARIA labels and keyboard support
- 🌙 **Shadow DOM** - Isolated styles that won't conflict with your app
- 💾 **LocalStorage** - Automatically persists theme preference
- ⚡ **TypeScript** - Full TypeScript support with proper types
- 📦 **Tiny footprint** - Ships at 4.59 KB (1.79 KB gzipped)

## Installation

```bash
npm install @gozenc/react-dark-mode-toggle
```

```bash
yarn add @gozenc/react-dark-mode-toggle
```

## Usage

### Basic Usage

```tsx
import { DarkModeToggle } from "@gozenc/react-dark-mode-toggle";

function App() {
  return (
    <div>
      <h1>My App</h1>
      <DarkModeToggle />
    </div>
  );
}
```

### With Custom Handler

```tsx
import { DarkModeToggle } from "@gozenc/react-dark-mode-toggle";

function App() {
  const handleModeChange = (mode: "light" | "dark") => {
    console.log("Theme changed to:", mode);
  };

  return <DarkModeToggle onModeChange={handleModeChange} />;
}
```

### Custom Styling

```tsx
import { DarkModeToggle } from "@gozenc/react-dark-mode-toggle";

function App() {
  return (
    <DarkModeToggle
      size={32}
      colors={{
        backgroundColor: "#e3f2fd",
        backgroundColorDark: "#1565c0",
        color: "#1976d2",
        colorDark: "#bbdefb",
      }}
    />
  );
}
```

## Props

| Prop               | Type                                | Default                    | Description                              |
| ------------------ | ----------------------------------- | -------------------------- | ---------------------------------------- |
| `size`             | `number \| string`                  | `24`                       | Size of the toggle in pixels             |
| `padding`          | `number \| string`                  | `calc(size / 4)`           | Internal padding of the toggle           |
| `onClick`          | `(event: MouseEvent) => void`       | -                          | Custom click handler                     |
| `onModeChange`     | `(mode: 'light' \| 'dark') => void` | -                          | Called when theme changes                |
| `preventDefault`   | `boolean`                           | `false`                    | Prevent default theme switching behavior |
| `localStorageKey`  | `string`                            | `'color-theme'`            | Key used for localStorage persistence    |
| `colors`           | `ColorConfig`                       | -                          | Custom color configuration               |
| `className`        | `string`                            | -                          | CSS class for the component              |
| `wrapperClassName` | `string`                            | -                          | CSS class for the outer container        |
| `darkClassName`    | `string`                            | `'dark'`                   | CSS class to toggle for dark mode        |
| `rootElement`      | `HTMLElement`                       | `document.documentElement` | Root element to toggle dark class        |

### ColorConfig

```tsx
interface ColorConfig {
  backgroundColor?: string; // Light mode background
  backgroundColorDark?: string; // Dark mode background
  color?: string; // Light mode icon color
  colorDark?: string; // Dark mode icon color
  colorHover?: string; // Light mode hover color
  colorHoverDark?: string; // Dark mode hover color
}
```

## How It Works

The component automatically:

1. **Detects current theme** by checking for a `dark` class on `document.documentElement`
2. **Toggles the theme** by adding/removing the `dark` class
3. **Persists preference** in localStorage
4. **Triggers callbacks** when the theme changes

### CSS Integration

The component expects your CSS to respond to the `dark` class on the root element:

```css
/* Light mode styles */
body {
  background-color: #ffffff;
  color: #000000;
}

/* Dark mode styles */
.dark body {
  background-color: #1a1a1a;
  color: #ffffff;
}
```

## Browser Support

- Modern browsers with Shadow DOM support
- React 17.0.0 or higher
- Graceful degradation for older browsers

## Development

To run the development environment:

```bash
# Clone the repository
git clone https://github.com/gozenc/react-dark-mode-toggle.git
cd react-dark-mode-toggle

# Install dependencies
npm install

# Start development server
npm run dev
```

## Testing

### Local Package Testing

Test the built package locally before publishing:

#### 1. Browser Test (Visual Testing)

```bash
npm run test:browser
```

Opens `test-dist.html` which:

- ✅ Loads the built `dist/index.js` directly
- ✅ Shows bundle size and gzipped size
- ✅ Tests different component configurations
- ✅ Uses React from CDN (simulates real usage)
- ✅ Verifies no react-jsx-runtime is included

#### 2. Complete Package Test (Recommended)

```bash
npm run test:local
```

Comprehensive test that:

- ✅ Builds the package (`npm run build`)
- ✅ Packs it like npm would (`npm pack`)
- ✅ Extracts and verifies all required files
- ✅ Checks bundle size and content
- ✅ Confirms react-jsx-runtime is excluded
- ✅ Validates package structure for publishing

#### 3. Quick Structure Test

```bash
npm run test
```

Basic test that verifies:

- ✅ `dist/index.js` exists
- ✅ `dist/index.d.ts` exists
- ✅ Package.json configuration

### Testing Workflow

1. **Build the optimized package**:

   ```bash
   npm run build
   ```

2. **Test in browser** (visual verification):

   ```bash
   npm run test:browser
   ```

3. **Full package validation**:

   ```bash
   npm run test:local
   ```

4. **If all tests pass**, you're ready to publish!

### Expected Results

After optimization:

- **Bundle size**: 4.88 KB
- **Gzipped size**: 1.84 KB
- **No react-jsx-runtime**: ✅ Excluded from bundle
- **All tests passing**: ✅

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [gozenc](https://github.com/gozenc)

## Changelog

### 0.0.1

- Initial release
- Beautiful animated toggle component
- Full TypeScript support
- Zero dependencies
- Customizable colors and sizes
- LocalStorage persistence
- Accessibility features
