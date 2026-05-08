# Car Control

A React Native app built with Expo for controlling and monitoring vehicle performance, drive modes, and climate settings. The app supports iOS, Android, and the web through Expo Router's file-based routing.

## Features

- Driving performance dashboard with left and right control menus
- Mode control modal for adjusting drive and power modes
- Climate and temperature controls with fan and defrost segments
- Onboarding flow gated by `expo-secure-store`
- Universal output (iOS, Android, web) via `react-native-web`

## Tech Stack

- Expo SDK 55 and Expo Router
- React Native 0.83 and React 19
- TypeScript
- React Navigation (bottom tabs, native stack)
- React Native Reanimated and Gesture Handler
- Expo modules: blur, image, video, linear-gradient, glass-effect, symbols, secure-store, splash-screen

## Requirements

- Node.js 20 or newer
- pnpm (the repo ships with `pnpm-lock.yaml` and `pnpm-workspace.yaml`)
- Xcode (for iOS) and/or Android Studio (for Android)

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm start
   ```

3. Run on a specific platform:

   ```bash
   pnpm android
   pnpm ios
   pnpm web
   ```

## Project Structure

```
src/
  app/                       Expo Router routes
    _layout.tsx              Root stack layout
    index.tsx                Driving performance screen
    onboarding.tsx           First-run onboarding
    mode-control.tsx         Modal for mode controls
  components/
    peformance-screen/       Main dashboard, drive/power modes, side menus
    mode-control-screen/     Climate, fan, temperature, defrost controls
    onboarding/              Slides, paginator, next button
  constants/
    theme.ts                 Colors and shared theme tokens
assets/
  images/                    Icons, splash assets, screen art
  fonts/                     Custom font files
```

Routing is file-based; any file added under [src/app/](src/app/) becomes a route. The root layout is defined in [_layout.tsx](src/app/_layout.tsx).

## Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `pnpm start`         | Start the Expo dev server                |
| `pnpm android`       | Launch on a connected Android device     |
| `pnpm ios`           | Launch in the iOS simulator              |
| `pnpm web`           | Launch the web build                     |
| `pnpm lint`          | Run `expo lint`                          |
| `pnpm reset-project` | Reset to a blank app via the helper script |

## Configuration

App metadata, plugins, splash screen, and platform-specific icons live in [app.json](app.json). Notable plugins enabled:

- `expo-router`
- `expo-splash-screen`
- `expo-video`
- `expo-secure-store`

Experiments enabled: `typedRoutes` and `reactCompiler`.

## License

Private project. All rights reserved.
