export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rainy'
  | 'storm'
  | 'snow';

export interface HourlyForecast {
  time: string;
  condition: WeatherCondition;
  temp: number; // in Celsius
}

export interface DailyForecast {
  day: string;
  condition: WeatherCondition;
  rainProb?: number; // percentage, e.g., 40
  minTemp: number; // in Celsius
  maxTemp: number; // in Celsius
}

export interface WeatherAlert {
  type: 'none' | 'advisory' | 'warning';
  title: string;
  description: string;
  timeLabel: string;
}

export interface CityWeatherData {
  id: string;
  name: string;
  country: string;
  temp: number; // in Celsius
  condition: WeatherCondition;
  high: number; // in Celsius
  low: number; // in Celsius
  humidity: number; // percentage
  windSpeed: number; // in km/h
  windDir: string;
  pressure: number; // in hPa
  sunrise: string; // e.g. "06:42 AM"
  sunset: string; // e.g. "05:24 PM"
  daylight: string; // e.g. "10h 42m"
  forecast24h: HourlyForecast[];
  forecast7d: DailyForecast[];
  eveningOutlook: string;
  eveningOutlookTitle: string;
  alert?: WeatherAlert;
  isFavorite: boolean;
}

export interface NotificationSettings {
  rainfallAlerts: boolean;
  tempSpikes: boolean;
  stormActivity: boolean;
}

export interface UnitSettings {
  temperature: 'C' | 'F';
  windSpeed: 'KMH' | 'MPH';
  pressure: 'MBAR' | 'INHG';
}

export interface SearchHistoryItem {
  id: string;
  cityName: string;
  timestamp: string;
}
