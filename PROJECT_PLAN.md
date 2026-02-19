# VIN Scanner App - Project Plan

## Overview
React Native app to scan/input VIN numbers and display comprehensive vehicle information with light/dark mode.

## Core Features
1. **VIN Capture**
   - Camera OCR scanning
   - Manual text input
   - Barcode scanning support

2. **Vehicle Information**
   - Basic: Make, Model, Year, Trim
   - Specifications: Engine, Transmission, Drivetrain
   - Maintenance: Oil type, Tire pressure, Fluid capacities
   - Safety: Recall status, Crash test ratings

3. **User Experience**
   - Light/Dark mode toggle
   - Favorites/History
   - Offline caching
   - Share vehicle info

4. **Additional Features**
   - Maintenance schedule
   - Service history log
   - Fuel tracking
   - Parts lookup
   - Local service centers

## Tech Stack
- **Framework**: React Native (Expo)
- **Camera**: react-native-vision-camera
- **OCR**: react-native-mlkit-ocr
- **UI**: react-native-paper (Material Design)
- **State**: zustand
- **Navigation**: react-navigation
- **API**: NHTSA VIN Decoder (free)
- **Storage**: AsyncStorage

## Project Structure
```
vin-scanner-app/
├── src/
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── store/
│   ├── utils/
│   └── theme/
├── assets/
├── App.js
└── package.json
```

## Screens
1. **Home** - Scan/input VIN
2. **Vehicle Details** - Comprehensive info
3. **History** - Previous lookups
4. **Settings** - Theme, units, preferences
5. **Maintenance** - Schedule & tracking

## API Integration
- NHTSA VIN Decoder: https://vpic.nhtsa.dot.gov/api/
- Free, no API key required
- Returns basic vehicle information
- Supplement with static data for oil/tire specs

## Development Phases
1. **Phase 1**: Setup + Basic VIN lookup
2. **Phase 2**: Camera OCR integration
3. **Phase 3**: UI/Theme implementation
4. **Phase 4**: Additional features
5. **Phase 5**: Polish & testing