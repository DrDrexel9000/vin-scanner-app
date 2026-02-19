import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      // Vehicle History
      history: [],
      addToHistory: (vehicle) => 
        set((state) => ({
          history: [vehicle, ...state.history.slice(0, 49)], // Keep last 50
        })),
      clearHistory: () => set({ history: [] }),
      
      // Favorites
      favorites: [],
      toggleFavorite: (vin) =>
        set((state) => ({
          favorites: state.favorites.includes(vin)
            ? state.favorites.filter((v) => v !== vin)
            : [...state.favorites, vin],
        })),
      
      // Settings
      settings: {
        units: 'imperial', // imperial or metric
        notifications: true,
        autoScan: true,
        saveHistory: true,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      
      // Maintenance Records
      maintenanceRecords: {},
      addMaintenanceRecord: (vin, record) =>
        set((state) => ({
          maintenanceRecords: {
            ...state.maintenanceRecords,
            [vin]: [...(state.maintenanceRecords[vin] || []), record],
          },
        })),
      
      // Current Vehicle
      currentVehicle: null,
      setCurrentVehicle: (vehicle) => set({ currentVehicle: vehicle }),
      
      // Fuel Tracking
      fuelLogs: {},
      addFuelLog: (vin, log) =>
        set((state) => ({
          fuelLogs: {
            ...state.fuelLogs,
            [vin]: [...(state.fuelLogs[vin] || []), log],
          },
        })),
    }),
    {
      name: 'vin-scanner-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        darkMode: state.darkMode,
        history: state.history,
        favorites: state.favorites,
        settings: state.settings,
        maintenanceRecords: state.maintenanceRecords,
        fuelLogs: state.fuelLogs,
      }),
    }
  )
);

export default useStore;