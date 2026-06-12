import React from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Moon,
  LucideProps,
} from 'lucide-react';
import { WeatherCondition } from '../types';

interface WeatherIconProps extends LucideProps {
  condition: WeatherCondition;
  isNight?: boolean;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  condition,
  isNight = false,
  className = '',
  size = 24,
  ...props
}) => {
  const finalClass = `stroke-[1.8] ${className}`;

  switch (condition) {
    case 'clear':
      if (isNight) {
        return <Moon size={size} className={`${finalClass} text-indigo-200 fill-indigo-200/20`} {...props} />;
      }
      return <Sun size={size} className={`${finalClass} text-amber-300 fill-amber-300/20 animate-[spin_40s_linear_infinite]`} {...props} />;
    case 'partly-cloudy':
      return <CloudSun size={size} className={`${finalClass} text-sky-200 fill-sky-200/10`} {...props} />;
    case 'cloudy':
      return <Cloud size={size} className={`${finalClass} text-slate-300 fill-slate-300/10`} {...props} />;
    case 'rainy':
      return <CloudRain size={size} className={`${finalClass} text-blue-300 fill-blue-300/10`} {...props} />;
    case 'storm':
      return <CloudLightning size={size} className={`${finalClass} text-purple-300 fill-purple-300/10`} {...props} />;
    case 'snow':
      return <CloudSnow size={size} className={`${finalClass} text-teal-100 fill-teal-100/10`} {...props} />;
    default:
      return <Sun size={size} className={`${finalClass} text-amber-300`} {...props} />;
  }
};
export default WeatherIcon;
