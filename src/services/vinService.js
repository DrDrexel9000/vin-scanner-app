import axios from 'axios';

// NHTSA VIN Decoder API (free, no API key needed)
const NHTSA_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

/**
 * Decode VIN using NHTSA API
 * @param {string} vin - 17-character VIN
 * @returns {Promise<Object>} Vehicle information
 */
export const decodeVIN = async (vin) => {
  try {
    // Clean VIN (remove spaces, make uppercase)
    const cleanVIN = vin.trim().toUpperCase().replace(/\s/g, '');
    
    if (cleanVIN.length !== 17) {
      throw new Error('VIN must be 17 characters');
    }

    // NHTSA API call
    const response = await axios.get(
      `${NHTSA_BASE_URL}/decodevin/${cleanVIN}?format=json`
    );

    if (response.data.Results && response.data.Results.length > 0) {
      const vehicleData = parseNHTSAData(response.data.Results);
      return {
        success: true,
        data: vehicleData,
        raw: response.data.Results,
      };
    } else {
      throw new Error('No vehicle data found');
    }
  } catch (error) {
    console.error('VIN decode error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Parse NHTSA API response into structured data
 */
const parseNHTSAData = (results) => {
  const data = {};
  
  // Extract values from NHTSA response
  results.forEach((item) => {
    if (item.Value && item.Value !== '') {
      data[item.Variable] = item.Value;
    }
  });

  // Structure the data
  return {
    vin: data.VIN,
    make: data.Make,
    model: data.Model,
    year: data.ModelYear,
    trim: data.Trim,
    bodyClass: data.BodyClass,
    doors: data.Doors,
    engine: {
      cylinders: data.EngineCylinders,
      displacement: data.DisplacementL,
      horsepower: data.EngineHP,
      type: data.FuelTypePrimary,
      manufacturer: data.EngineManufacturer,
    },
    transmission: {
      type: data.TransmissionStyle,
      speeds: data.TransmissionSpeeds,
    },
    drivetrain: data.DriveType,
    manufacturer: data.Manufacturer,
    plant: data.PlantCity,
    country: data.PlantCountry,
    safety: {
      airbags: data.AirBagLocFront,
      brakes: data.BrakeSystemType,
    },
    // Add estimated maintenance data (would come from a separate database)
    maintenance: getEstimatedMaintenanceData(data.Make, data.Model, data.ModelYear),
  };
};

/**
 * Get estimated maintenance data based on make/model/year
 * In a real app, this would come from a database
 */
const getEstimatedMaintenanceData = (make, model, year) => {
  // Default values - in production, this would be a database lookup
  const currentYear = new Date().getFullYear();
  const age = currentYear - parseInt(year);
  
  return {
    oil: {
      type: 'Synthetic 5W-30', // Most common
      capacity: '5.0 quarts',
      interval: age > 5 ? '5,000 miles' : '7,500 miles',
    },
    tires: {
      frontPressure: '32 PSI',
      rearPressure: '32 PSI',
      size: '225/65R17', // Common size
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
    belts: age > 7 ? 'Replace soon' : 'Good condition',
    battery: age > 4 ? 'Check condition' : 'Good condition',
    sparkPlugs: age > 10 ? 'Replace soon' : 'Good condition',
  };
};

/**
 * Get vehicle recalls
 */
export const getRecalls = async (vin) => {
  try {
    const response = await axios.get(
      `${NHTSA_BASE_URL}/decodevin/${vin}?format=json`
    );
    
    // Filter for recall information
    const recalls = response.data.Results.filter(
      (item) => item.Variable.includes('Recall') && item.Value === 'Yes'
    );
    
    return {
      success: true,
      count: recalls.length,
      recalls,
    };
  } catch (error) {
    console.error('Recall check error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Validate VIN format
 */
export const validateVIN = (vin) => {
  const cleanVIN = vin.trim().toUpperCase().replace(/\s/g, '');
  
  // Basic VIN validation
  if (cleanVIN.length !== 17) {
    return { valid: false, error: 'VIN must be 17 characters' };
  }
  
  // Check for invalid characters (I, O, Q are not used in VINs)
  if (/[IOQ]/.test(cleanVIN)) {
    return { valid: false, error: 'VIN contains invalid characters (I, O, Q)' };
  }
  
  return { valid: true, vin: cleanVIN };
};

/**
 * Mock OCR function (would integrate with ML Kit in real app)
 */
export const mockOCRScan = async (imageUri) => {
  // In a real app, this would use react-native-mlkit-ocr
  // For now, return a mock VIN
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a random valid VIN format
      const mockVINs = [
        '1HGCM82633A123456',
        '5XYZU3LBXFG123456',
        '2HGFG3A58FH123456',
        '1C4RJFBG9FC123456',
      ];
      const randomVIN = mockVINs[Math.floor(Math.random() * mockVINs.length)];
      resolve({ success: true, vin: randomVIN });
    }, 1000);
  });
};