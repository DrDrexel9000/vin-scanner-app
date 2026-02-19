// Test data for development
export const testVehicles = [
  {
    vin: '1HGCM82633A123456',
    make: 'Honda',
    model: 'Accord',
    year: '2003',
    trim: 'EX',
    bodyClass: 'Sedan',
    doors: '4',
    engine: {
      cylinders: '6',
      displacement: '3.0',
      horsepower: '240',
      type: 'Gasoline',
    },
    transmission: {
      type: 'Automatic',
      speeds: '5',
    },
    drivetrain: 'FWD',
    manufacturer: 'Honda',
    plant: 'Marysville',
    country: 'UNITED STATES (USA)',
    maintenance: {
      oil: {
        type: 'Synthetic 5W-20',
        capacity: '4.4 quarts',
        interval: '7,500 miles',
      },
      tires: {
        frontPressure: '32 PSI',
        rearPressure: '32 PSI',
        size: '215/60R16',
        rotationInterval: '7,500 miles',
      },
      fluids: {
        coolant: '50/50 mix',
        transmission: 'ATF',
        brake: 'DOT 3',
        powerSteering: 'ATF',
      },
      filters: {
        oil: 'Every oil change',
        air: '15,000 miles',
        cabin: '15,000 miles',
        fuel: '30,000 miles',
      },
    },
    timestamp: '2026-02-18T15:30:00Z',
  },
  {
    vin: '5XYZU3LBXFG123456',
    make: 'Hyundai',
    model: 'Santa Fe',
    year: '2015',
    trim: 'Limited',
    bodyClass: 'SUV',
    doors: '4',
    engine: {
      cylinders: '6',
      displacement: '3.3',
      horsepower: '290',
      type: 'Gasoline',
    },
    transmission: {
      type: 'Automatic',
      speeds: '6',
    },
    drivetrain: 'AWD',
    manufacturer: 'Hyundai',
    plant: 'Montgomery',
    country: 'UNITED STATES (USA)',
    maintenance: {
      oil: {
        type: 'Synthetic 5W-30',
        capacity: '5.5 quarts',
        interval: '7,500 miles',
      },
      tires: {
        frontPressure: '35 PSI',
        rearPressure: '35 PSI',
        size: '235/60R18',
        rotationInterval: '7,500 miles',
      },
      fluids: {
        coolant: '50/50 mix',
        transmission: 'ATF',
        brake: 'DOT 4',
        powerSteering: 'ATF',
      },
      filters: {
        oil: 'Every oil change',
        air: '15,000 miles',
        cabin: '15,000 miles',
        fuel: '30,000 miles',
      },
    },
    timestamp: '2026-02-17T10:15:00Z',
  },
  {
    vin: '2HGFG3A58FH123456',
    make: 'Acura',
    model: 'TL',
    year: '2012',
    trim: 'Technology',
    bodyClass: 'Sedan',
    doors: '4',
    engine: {
      cylinders: '6',
      displacement: '3.7',
      horsepower: '305',
      type: 'Gasoline',
    },
    transmission: {
      type: 'Automatic',
      speeds: '6',
    },
    drivetrain: 'FWD',
    manufacturer: 'Acura',
    plant: 'Marysville',
    country: 'UNITED STATES (USA)',
    maintenance: {
      oil: {
        type: 'Synthetic 5W-20',
        capacity: '4.5 quarts',
        interval: '7,500 miles',
      },
      tires: {
        frontPressure: '32 PSI',
        rearPressure: '32 PSI',
        size: '245/50R17',
        rotationInterval: '7,500 miles',
      },
      fluids: {
        coolant: '50/50 mix',
        transmission: 'ATF',
        brake: 'DOT 3',
        powerSteering: 'ATF',
      },
      filters: {
        oil: 'Every oil change',
        air: '15,000 miles',
        cabin: '15,000 miles',
        fuel: '30,000 miles',
      },
    },
    timestamp: '2026-02-16T14:45:00Z',
  },
];

// Mock API response for testing
export const mockVINResponse = {
  success: true,
  data: testVehicles[0],
  raw: [],
};

// Mock OCR scan result
export const mockOCRResult = {
  success: true,
  vin: '1HGCM82633A123456',
  confidence: 0.95,
};