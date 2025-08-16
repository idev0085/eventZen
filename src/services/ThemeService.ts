import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

const lightTheme: ThemeColors = {
  primary: '#8B5CF6',
  secondary: '#10B981',
  accent: '#F59E0B',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

const darkTheme: ThemeColors = {
  primary: '#A855F7',
  secondary: '#34D399',
  accent: '#FBBF24',
  background: '#111827',
  surface: '#1F2937',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  border: '#374151',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
};

export class ThemeService {
  private static readonly THEME_KEY = 'app_theme';
  private static currentTheme: 'light' | 'dark' | 'system' = 'system';
  private static listeners: ((theme: ThemeColors) => void)[] = [];

  static async initialize() {
    try {
      const savedTheme = await AsyncStorage.getItem(this.THEME_KEY);
      if (savedTheme) {
        this.currentTheme = savedTheme as 'light' | 'dark' | 'system';
      }
      
      // Listen for system theme changes
      Appearance.addChangeListener(this.handleSystemThemeChange);
    } catch (error) {
      console.log('Theme initialization error:', error);
    }
  }

  static getCurrentTheme(): ThemeColors {
    if (this.currentTheme === 'system') {
      const systemTheme = Appearance.getColorScheme();
      return systemTheme === 'dark' ? darkTheme : lightTheme;
    }
    
    return this.currentTheme === 'dark' ? darkTheme : lightTheme;
  }

  static async setTheme(theme: 'light' | 'dark' | 'system') {
    try {
      this.currentTheme = theme;
      await AsyncStorage.setItem(this.THEME_KEY, theme);
      this.notifyListeners();
    } catch (error) {
      throw new Error('Failed to set theme');
    }
  }

  static async toggleDarkMode() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    await this.setTheme(newTheme);
  }

  static getThemeMode(): 'light' | 'dark' | 'system' {
    return this.currentTheme;
  }

  static addThemeListener(listener: (theme: ThemeColors) => void) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private static handleSystemThemeChange = () => {
    if (this.currentTheme === 'system') {
      this.notifyListeners();
    }
  };

  private static notifyListeners() {
    const currentTheme = this.getCurrentTheme();
    this.listeners.forEach(listener => listener(currentTheme));
  }

  static getStatusBarStyle(): 'light-content' | 'dark-content' {
    const theme = this.getCurrentTheme();
    return theme.background === '#111827' ? 'light-content' : 'dark-content';
  }

  static async saveCustomColors(colors: Partial<ThemeColors>) {
    try {
      const customColorsKey = `${this.THEME_KEY}_custom`;
      await AsyncStorage.setItem(customColorsKey, JSON.stringify(colors));
    } catch (error) {
      throw new Error('Failed to save custom colors');
    }
  }

  static async getCustomColors(): Promise<Partial<ThemeColors> | null> {
    try {
      const customColorsKey = `${this.THEME_KEY}_custom`;
      const customColors = await AsyncStorage.getItem(customColorsKey);
      return customColors ? JSON.parse(customColors) : null;
    } catch (error) {
      return null;
    }
  }
}