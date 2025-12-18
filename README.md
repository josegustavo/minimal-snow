# Minimal Snow ❄️

A lightweight, high-performance, and framework-agnostic snow effect for the web.

This library creates a smooth, canvas-based snow animation that overlays your website. It is designed to be zero-dependency and easy to integrate into any project, whether you are using **React**, **Vue**, **Angular**, **Svelte**, or just **Vanilla HTML/JS**.

> **Note:** The visual style and physics of this effect were inspired by the winter easter egg found in Google AI Studio.

## Features

- 🚀 **Zero Dependencies:** Extremely lightweight (< 2KB minified).
- ⚡ **High Performance:** Uses HTML5 Canvas and `requestAnimationFrame` for 60FPS animations.
- 🎨 **Theme Aware:** Automatically detects dark/light mode (or can be manually configured).
- 🧩 **Web Component:** Works instantly with a simple HTML tag `<snow-effect>`.
- 🔧 **TypeScript:** Fully typed for better development experience.

---

## Installation

### Option 1: NPM (Recommended for Bundlers)

```bash
npm install minimal-snow
```

### Option 2: CDN (Easiest for HTML)

Simply add this script to your `<head>` or body. It automatically registers the Web Component.

```html
<script src="https://unpkg.com/minimal-snow@latest/dist/minimal-snow.umd.js"></script>
```

---

## Usage

### 1. Using the Web Component (HTML)

Once the script is loaded (via CDN or import), you can use the custom element anywhere.

```html
<!-- Auto-start the snow with default settings -->
<snow-effect running></snow-effect>

<!-- Customize particle count and force a specific theme -->
<snow-effect running count="5000" theme="dark"></snow-effect>
```

#### Controlling via JavaScript

```javascript
const snow = document.querySelector('snow-effect');

// Toggle the effect on/off
snow.toggle();

// Stop the effect (fades out)
snow.stop();

// Change particle count dynamically
snow.setAttribute('count', '1000');
```

---

### 2. Using with Frameworks (NPM)

You can import the `SnowEngine` class for full programmatic control, or use the Web Component wrapper.

#### React

```tsx
import { useEffect, useRef } from 'react';
import { SnowEngine } from 'minimal-snow';

export default function App() {
  const snowRef = useRef<SnowEngine | null>(null);

  useEffect(() => {
    // Initialize the engine attached to the document body
    snowRef.current = new SnowEngine(document.body, { 
      count: 1500,
      colorDark: 'white',
      colorLight: '#a0d8ef'
    });

    // Clean up on unmount
    return () => snowRef.current?.destroy();
  }, []);

  return (
    <button onClick={() => snowRef.current?.toggle()}>
      Toggle Snow
    </button>
  );
}
```

#### Vue 3

```html
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { SnowEngine } from 'minimal-snow';

let snow = null;

onMounted(() => {
  snow = new SnowEngine();
});

onUnmounted(() => {
  if (snow) snow.destroy();
});
</script>

<template>
  <button @click="snow.toggle()">Let it snow!</button>
</template>
```

#### Angular

Import the library in your component or module to register the web component.

```typescript
import 'minimal-snow'; // Registers <snow-effect>
```

Then use it in your template. *Note: You may need `CUSTOM_ELEMENTS_SCHEMA` in your module.*

```html
<snow-effect [attr.running]="isSnowing ? '' : null"></snow-effect>
```

---

## API Documentation

### `<snow-effect>` Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `running` | Boolean | `false` | Presence of this attribute starts the animation. Removing it stops it. |
| `count` | Number | `2000` | The number of snow particles to render. |
| `theme` | String | `auto` | Force particle color. Values: `dark`, `light`. Default detects system preference. |
| `z-index` | Number | `9999` | The CSS z-index of the canvas overlay. |

### `SnowEngine` Class options

```typescript
const snow = new SnowEngine(containerElement, options);
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `count` | `number` | `2000` | Number of particles. |
| `colorDark` | `string` | `"white"` | Color used when dark mode is detected. |
| `colorLight` | `string` | `"#add8e6"` | Color used when light mode is detected. |
| `zIndex` | `number` | `9999` | Z-index for the canvas element. |

---

## License

MIT License © 2025

This project is open source. You are free to use it in personal and commercial projects.
