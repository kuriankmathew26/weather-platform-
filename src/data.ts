import { CityWeatherData } from './types';

export const INITIAL_CITIES: CityWeatherData[] = [
  {
    id: 'san-francisco',
    name: 'San Francisco',
    country: 'United States',
    temp: 22, // in Celsius (72F)
    condition: 'partly-cloudy',
    high: 26,
    low: 18,
    humidity: 64,
    windSpeed: 12, // in km/h
    windDir: 'North-West',
    pressure: 1012, // hPa / mbar
    sunrise: '06:42 AM',
    sunset: '05:24 PM',
    daylight: '10h 42m',
    eveningOutlookTitle: 'Evening Outlook',
    eveningOutlook: 'Clear skies expected for the next 4 hours.',
    isFavorite: true,
    alert: {
      type: 'warning',
      title: 'Severe Storm Warning',
      description: 'Heavy thunderstorm with high winds and potential hail expected within 30 minutes in your current area.',
      timeLabel: 'Ends 6:45 PM',
    },
    forecast24h: [
      { time: 'Now', condition: 'partly-cloudy', temp: 22 },
      { time: '14:00', condition: 'clear', temp: 24 },
      { time: '15:00', condition: 'clear', temp: 25 },
      { time: '16:00', condition: 'cloudy', temp: 23 },
      { time: '17:00', condition: 'cloudy', temp: 21 },
      { time: '18:00', condition: 'clear', temp: 19 },
      { time: '19:00', condition: 'clear', temp: 18 },
      { time: '20:00', condition: 'clear', temp: 17 },
      { time: '21:00', condition: 'clear', temp: 16 },
    ],
    forecast7d: [
      { day: 'Today', condition: 'clear', minTemp: 11, maxTemp: 18 }, // 52F - 64F
      { day: 'Tuesday', condition: 'cloudy', minTemp: 10, maxTemp: 17 }, // 50F - 62F
      { day: 'Wednesday', condition: 'rainy', rainProb: 40, minTemp: 9, maxTemp: 14 }, // 48F - 58F
      { day: 'Thursday', condition: 'partly-cloudy', minTemp: 11, maxTemp: 17 }, // 51F - 63F
      { day: 'Friday', condition: 'clear', minTemp: 12, maxTemp: 19 }, // 54F - 67F
      { day: 'Saturday', condition: 'storm', rainProb: 80, minTemp: 9, maxTemp: 15 }, // 49F - 59F
      { day: 'Sunday', condition: 'cloudy', minTemp: 7, maxTemp: 11 }, // 44F - 52F
    ],
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    temp: 18,
    condition: 'cloudy',
    high: 22,
    low: 15,
    humidity: 78,
    windSpeed: 10,
    windDir: 'East',
    pressure: 1016,
    sunrise: '04:35 AM',
    sunset: '06:55 PM',
    daylight: '14h 20m',
    eveningOutlookTitle: 'Tokyo Twilight',
    eveningOutlook: 'Light breeze continuing. Overcast clouds spreading throughout the evening.',
    isFavorite: true,
    alert: {
      type: 'none',
      title: 'Dense Fog Advisory',
      description: 'Visibility reduced to less than 1/4 mile in low-lying areas overnight.',
      timeLabel: 'Ends 8:00 AM',
    },
    forecast24h: [
      { time: 'Now', condition: 'cloudy', temp: 18 },
      { time: '14:00', condition: 'cloudy', temp: 19 },
      { time: '15:00', condition: 'cloudy', temp: 20 },
      { time: '16:00', condition: 'rainy', temp: 17 },
      { time: '17:00', condition: 'rainy', temp: 16 },
      { time: '18:00', condition: 'cloudy', temp: 15 },
    ],
    forecast7d: [
      { day: 'Today', condition: 'cloudy', minTemp: 15, maxTemp: 22 },
      { day: 'Tuesday', condition: 'rainy', rainProb: 60, minTemp: 14, maxTemp: 18 },
      { day: 'Wednesday', condition: 'clear', minTemp: 16, maxTemp: 24 },
      { day: 'Thursday', condition: 'clear', minTemp: 17, maxTemp: 25 },
      { day: 'Friday', condition: 'partly-cloudy', minTemp: 15, maxTemp: 23 },
      { day: 'Saturday', condition: 'cloudy', minTemp: 13, maxTemp: 19 },
      { day: 'Sunday', condition: 'clear', minTemp: 14, maxTemp: 22 },
    ],
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    temp: 11,
    condition: 'rainy',
    high: 14,
    low: 9,
    humidity: 90,
    windSpeed: 22,
    windDir: 'South-West',
    pressure: 1005,
    sunrise: '04:43 AM',
    sunset: '09:21 PM',
    daylight: '16h 38m',
    eveningOutlookTitle: 'Showery Evening',
    eveningOutlook: 'Intermittent cold drizzle transition into overcast dry conditions later tonight.',
    isFavorite: true,
    alert: {
      type: 'advisory',
      title: 'Rainfall Advisory',
      description: 'Sustained rain may cause slick road surfaces and minor localized flooding on secondary streets.',
      timeLabel: 'Ends 11:30 PM',
    },
    forecast24h: [
      { time: 'Now', condition: 'rainy', temp: 11 },
      { time: '14:00', condition: 'rainy', temp: 12 },
      { time: '15:00', condition: 'cloudy', temp: 13 },
      { time: '16:00', condition: 'partly-cloudy', temp: 14 },
      { time: '17:00', condition: 'clear', temp: 13 },
      { time: '18:00', condition: 'partly-cloudy', temp: 11 },
    ],
    forecast7d: [
      { day: 'Today', condition: 'rainy', minTemp: 9, maxTemp: 14 },
      { day: 'Tuesday', condition: 'cloudy', minTemp: 8, maxTemp: 13 },
      { day: 'Wednesday', condition: 'partly-cloudy', minTemp: 9, maxTemp: 15 },
      { day: 'Thursday', condition: 'clear', minTemp: 10, maxTemp: 17 },
      { day: 'Friday', condition: 'clear', minTemp: 11, maxTemp: 18 },
      { day: 'Saturday', condition: 'rainy', rainProb: 70, minTemp: 8, maxTemp: 12 },
      { day: 'Sunday', condition: 'storm', rainProb: 90, minTemp: 7, maxTemp: 11 },
    ],
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    temp: 24,
    condition: 'clear',
    high: 26,
    low: 19,
    humidity: 48,
    windSpeed: 8,
    windDir: 'West',
    pressure: 1020,
    sunrise: '05:24 AM',
    sunset: '08:30 PM',
    daylight: '15h 06m',
    eveningOutlookTitle: 'Sunlit Sky',
    eveningOutlook: 'A perfect calm evening with pristine starlit sky conditions expected throughout.',
    isFavorite: true,
    alert: {
      type: 'advisory',
      title: 'High UV Index Advisory',
      description: 'UV levels will reach extreme levels between 11 AM and 3 PM. Protective measures are highly recommended.',
      timeLabel: 'Ends 4:00 PM',
    },
    forecast24h: [
      { time: 'Now', condition: 'clear', temp: 24 },
      { time: '14:00', condition: 'clear', temp: 25 },
      { time: '15:00', condition: 'clear', temp: 26 },
      { time: '16:00', condition: 'clear', temp: 26 },
      { time: '17:00', condition: 'clear', temp: 25 },
      { time: '18:00', condition: 'partly-cloudy', temp: 23 },
    ],
    forecast7d: [
      { day: 'Today', condition: 'clear', minTemp: 19, maxTemp: 26 },
      { day: 'Tuesday', condition: 'clear', minTemp: 18, maxTemp: 25 },
      { day: 'Wednesday', condition: 'partly-cloudy', minTemp: 17, maxTemp: 24 },
      { day: 'Thursday', condition: 'cloudy', minTemp: 16, maxTemp: 23 },
      { day: 'Friday', condition: 'rainy', rainProb: 50, minTemp: 15, maxTemp: 20 },
      { day: 'Saturday', condition: 'clear', minTemp: 17, maxTemp: 25 },
      { day: 'Sunday', condition: 'clear', minTemp: 18, maxTemp: 26 },
    ],
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    temp: 19,
    condition: 'partly-cloudy',
    high: 21,
    low: 13,
    humidity: 55,
    windSpeed: 14,
    windDir: 'North-East',
    pressure: 1015,
    sunrise: '05:47 AM',
    sunset: '09:50 PM',
    daylight: '16h 03m',
    eveningOutlookTitle: 'Boulevard Breeze',
    eveningOutlook: 'Light twilight breeze crossing the Seine under a scenic partially clouds covered night.',
    isFavorite: false,
    alert: {
      type: 'none',
      title: 'Normal Conditions',
      description: 'No severe weather warnings or advisories are currently in place.',
      timeLabel: 'Active',
    },
    forecast24h: [
      { time: 'Now', condition: 'partly-cloudy', temp: 19 },
      { time: '14:00', condition: 'partly-cloudy', temp: 20 },
      { time: '15:00', condition: 'clear', temp: 21 },
      { time: '16:00', condition: 'clear', temp: 20 },
      { time: '17:00', condition: 'partly-cloudy', temp: 18 },
      { time: '18:00', condition: 'cloudy', temp: 16 },
    ],
    forecast7d: [
      { day: 'Today', condition: 'partly-cloudy', minTemp: 13, maxTemp: 21 },
      { day: 'Tuesday', condition: 'clear', minTemp: 14, maxTemp: 23 },
      { day: 'Wednesday', condition: 'clear', minTemp: 15, maxTemp: 24 },
      { day: 'Thursday', condition: 'cloudy', minTemp: 12, maxTemp: 19 },
      { day: 'Friday', condition: 'rainy', rainProb: 30, minTemp: 11, maxTemp: 17 },
      { day: 'Saturday', condition: 'partly-cloudy', minTemp: 12, maxTemp: 20 },
      { day: 'Sunday', condition: 'clear', minTemp: 13, maxTemp: 22 },
    ],
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    temp: 16,
    condition: 'clear',
    high: 19,
    low: 11,
    humidity: 58,
    windSpeed: 18,
    windDir: 'South',
    pressure: 1018,
    sunrise: '06:58 AM',
    sunset: '04:54 PM',
    daylight: '9h 56m',
    eveningOutlookTitle: 'Clear Winter Sky',
    eveningOutlook: 'Cool coastal breeze following beautiful sunset shades. Crisp clear sky overnight.',
    isFavorite: false,
    forecast24h: [
      { time: 'Now', condition: 'clear', temp: 16 },
      { time: '14:00', condition: 'clear', temp: 18 },
      { time: '15:00', condition: 'clear', temp: 19 },
      { time: '16:00', condition: 'partly-cloudy', temp: 17 },
      { time: '17:00', condition: 'clear', temp: 14 },
      { time: '18:00', condition: 'clear', temp: 13 },
    ],
    forecast7d: [
      { day: 'Today', condition: 'clear', minTemp: 11, maxTemp: 19 },
      { day: 'Tuesday', condition: 'clear', minTemp: 10, maxTemp: 18 },
      { day: 'Wednesday', condition: 'partly-cloudy', minTemp: 11, maxTemp: 17 },
      { day: 'Thursday', condition: 'cloudy', minTemp: 9, maxTemp: 16 },
      { day: 'Friday', condition: 'rainy', rainProb: 40, minTemp: 8, maxTemp: 15 },
      { day: 'Saturday', condition: 'clear', minTemp: 10, maxTemp: 18 },
      { day: 'Sunday', condition: 'clear', minTemp: 11, maxTemp: 20 },
    ],
  },
];

// Helper functions for easy unit conversions
export function convertTemp(celsius: number, toUnit: 'C' | 'F'): number {
  if (toUnit === 'C') return Math.round(celsius);
  return Math.round(celsius * 1.8 + 32);
}

export function convertWind(kmh: number, toUnit: 'KMH' | 'MPH'): { value: number; unitStr: string } {
  if (toUnit === 'KMH') {
    return { value: Math.round(kmh), unitStr: 'km/h' };
  }
  return { value: Math.round(kmh * 0.621371), unitStr: 'mph' };
}

export function convertPressure(hpa: number, toUnit: 'MBAR' | 'INHG'): { value: number; unitStr: string } {
  if (toUnit === 'MBAR') {
    return { value: Math.round(hpa), unitStr: 'hPa' }; // mbar is equivalent to hPa
  }
  return { value: parseFloat((hpa * 0.02953).toFixed(2)), unitStr: 'inHg' };
}
