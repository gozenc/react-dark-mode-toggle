# React Dark Mode Toggle

A beautiful, animated React dark mode toggle component with zero dependencies. Features smooth animations and customizable styling.

## Demo

![Dark Mode Toggle Animation](./demo.gif)

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

## Installation

```bash
npm install @gozenc/react-dark-mode-toggle
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

| Prop              | Type                                | Default          | Description                              |
| ----------------- | ----------------------------------- | ---------------- | ---------------------------------------- |
| `size`            | `number \| string`                  | `24`             | Size of the toggle in pixels             |
| `padding`         | `number \| string`                  | `calc(size / 3)` | Internal padding of the toggle           |
| `onClick`         | `(event: MouseEvent) => void`       | -                | Custom click handler                     |
| `onModeChange`    | `(mode: 'light' \| 'dark') => void` | -                | Called when theme changes                |
| `preventDefault`  | `boolean`                           | `false`          | Prevent default theme switching behavior |
| `localStorageKey` | `string`                            | `'color-theme'`  | Key used for localStorage persistence    |
| `colors`          | `ColorConfig`                       | -                | Custom color configuration               |
| `className`       | `string`                            | -                | CSS class for the container              |

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
