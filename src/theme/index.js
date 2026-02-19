import { DefaultTheme, DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    accent: '#03DAC6',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    secondaryText: '#757575',
    error: '#B00020',
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#2196F3',
    card: '#FFFFFF',
    border: '#E0E0E0',
    notification: '#FF5252',
  },
  roundness: 8,
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#BB86FC',
    accent: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#E0E0E0',
    secondaryText: '#B0B0B0',
    error: '#CF6679',
    success: '#4CAF50',
    warning: '#FFB74D',
    info: '#64B5F6',
    card: '#1E1E1E',
    border: '#333333',
    notification: '#FF5252',
  },
  roundness: 8,
};

// Common styles
export const commonStyles = {
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    marginVertical: 8,
  },
  input: {
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};