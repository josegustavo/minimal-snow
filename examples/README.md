# Examples — Minimal Snow

Interactive demo page for testing all library features.

## How to Run

1. Build the library:
   ```bash
   npm run build
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Open in browser:
   ```
   http://localhost:5173/examples/
   ```

## Features in the Demo

### Web Component (`<snow-effect>`)
- Toggle animation on/off
- Change particle count in real-time
- Switch theme (auto/dark/light)
- Adjust z-index

### SnowEngine API
- Start/Stop/Toggle/Destroy controls
- Configure particle count
- Pick custom colors for dark and light modes
- Set z-index

## Notes

- The demo imports the ES module from `../dist/snow-effect.es.js`
- The page includes a dark/light theme toggle to test theme detection
- Both demos run simultaneously — the Web Component creates a full-screen overlay
