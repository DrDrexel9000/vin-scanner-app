# VIN Scanner App

A React Native application for scanning and decoding Vehicle Identification Numbers (VINs) with comprehensive vehicle information display.

## Features

### Core Features
- **VIN Scanning**: Camera OCR to scan VINs from vehicles
- **Manual Input**: Type VIN manually with validation
- **Vehicle Information**: Detailed specs from NHTSA VIN decoder
- **Maintenance Data**: Oil type, tire pressure, fluid specifications
- **Light/Dark Mode**: Full theme support

### Additional Features
- **Lookup History**: Save and browse previous VIN lookups
- **Favorites**: Mark frequently accessed vehicles
- **Maintenance Tracking**: Log service records
- **Fuel Tracking**: Monitor fuel consumption (planned)
- **Recall Checks**: Vehicle safety recall information
- **Parts Lookup**: Find compatible parts online
- **Dealer Locator**: Find local service centers

## Tech Stack

- **React Native** with **Expo** for cross-platform development
- **React Navigation** for screen management
- **React Native Paper** for Material Design UI components
- **Zustand** for state management
- **AsyncStorage** for local data persistence
- **NHTSA VIN Decoder API** (free, no API key required)
- **React Native Vision Camera** for OCR scanning
- **React Native ML Kit OCR** for text recognition

## Project Structure

```
vin-scanner-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens
│   ├── services/       # API and business logic
│   ├── store/          # Zustand state management
│   ├── theme/          # Light/dark theme definitions
│   └── utils/          # Helper functions
├── assets/             # Images, fonts, etc.
├── App.js              # Main app component
└── package.json        # Dependencies
```

## Screens

1. **Home Screen** - VIN input and scanning
2. **Vehicle Details** - Comprehensive vehicle information
3. **History Screen** - Previous lookups with search/filter
4. **Settings Screen** - App preferences and data management

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Studio (Windows/Linux)

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd vin-scanner-app

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## API Integration

The app uses the **NHTSA VIN Decoder API** which is:
- Free to use
- No API key required
- Returns basic vehicle information
- Supplemented with estimated maintenance data

### API Endpoints
- VIN Decoding: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{VIN}?format=json`
- Recall Information: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{VIN}?format=json`

## Camera/OCR Setup

For production use, you'll need to:

1. **iOS**: Add camera permissions to `Info.plist`
2. **Android**: Add camera permissions to `AndroidManifest.xml`
3. **Configure ML Kit**: Set up Google ML Kit for OCR

## Future Enhancements

### Phase 2
- [ ] Real camera OCR integration
- [ ] Barcode scanning support
- [ ] Offline VIN database
- [ ] More detailed maintenance schedules

### Phase 3
- [ ] Fuel tracking with charts
- [ ] Service reminder notifications
- [ ] Multiple vehicle profiles
- [ ] Cloud sync/backup

### Phase 4
- [ ] Social sharing features
- [ ] Vehicle comparison tool
- [ ] Marketplace integration
- [ ] Augmented Reality features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This app provides vehicle information for reference only. Always consult your vehicle's owner's manual and certified mechanics for accurate maintenance information and professional advice.

## Support

For support, email: support@vinscanner.example.com