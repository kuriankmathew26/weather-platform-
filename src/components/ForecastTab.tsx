import React from 'react';
import { motion } from 'motion/react';
import { Sunrise, Sunset, SunriseIcon, Wind, Droplets, CalendarDays, CloudSun } from 'lucide-react';
import { CityWeatherData, UnitSettings } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { convertTemp, convertWind } from '../data';

interface ForecastTabProps {
  city: CityWeatherData;
  units: UnitSettings;
}

export const ForecastTab: React.FC<ForecastTabProps> = ({ city, units }) => {
  // Let's determine weekly min and max to scale daily temperature bars beautifully
  const weekMin = Math.min(...city.forecast7d.map((d) => d.minTemp));
  const weekMax = Math.max(...city.forecast7d.map((d) => d.maxTemp));
  const weekRange = weekMax - weekMin;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      {/* Sun Path Section */}
      <section className="mb-2">
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-title-md text-sm font-bold text-sky-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Sunrise className="w-4 h-4 text-emerald-300" />
              Sun Path
            </h2>
            <span className="text-slate-400 text-xs font-semibold bg-white/5 px-2.5 py-1 rounded-full font-mono">
              Daylight: {city.daylight}
            </span>
          </div>

          <div className="relative h-28 flex items-end justify-center mb-4">
            {/* Sun Path SVG Arc matching layout perfectly */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sun-gradient-arc" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#ffb955" stopOpacity="1" />
                  <stop offset="15%" stopColor="#ffb955" stopOpacity="0.4" />
                  <stop offset="85%" stopColor="#a4c9ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a4c9ff" stopOpacity="1" />
                </linearGradient>
              </defs>
              
              {/* Back Arc */}
              <path
                d="M 15 110 Q 200 -10 385 110"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeDasharray="5 5"
                strokeWidth="2"
              />

              {/* Lit Sun-Path Arc */}
              <path
                d="M 15 110 Q 200 -10 385 110"
                fill="none"
                stroke="url(#sun-gradient-arc)"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="sun-path"
              />

              {/* Pulsing Sun Position Circle matching image coordinates */}
              <circle
                cx="290"
                cy="32"
                r="7"
                fill="#ffb955"
                className="animate-[pulse_2s_infinite] shadow-[0_0_12px_#ffb955]"
              />
              {/* Subtle sun rays outer circle */}
              <circle
                cx="290"
                cy="32"
                r="13"
                fill="none"
                stroke="#ffb955"
                strokeOpacity="0.2"
                strokeWidth="1.5"
                className="animate-ping"
              />
            </svg>
          </div>

          <div className="flex justify-between items-center px-2 mt-2">
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                SUNRISE
              </span>
              <span className="font-mono text-xs font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                <SunriseIcon className="w-3.5 h-3.5 text-amber-300" />
                {city.sunrise}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-label-caps text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                SUNSET
              </span>
              <span className="font-mono text-xs font-semibold text-slate-200 flex items-center gap-1 mt-0.5 justify-end">
                <Sunset className="w-3.5 h-3.5 text-indigo-300" />
                {city.sunset}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 24-Hour Forecast Section Header */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-title-md text-sm font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
            <CloudSun className="w-4 h-4 text-sky-300" />
            24-Hour Forecast
          </h2>
          <span className="text-slate-500 font-mono text-xs uppercase tracking-wide">Dynamic hours</span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-1 no-scrollbar scrollbar-hide snap-x">
          {city.forecast24h.map((hour, i) => (
            <div
              key={hour.time}
              className={`flex-shrink-0 w-20 glass-panel rounded-xl p-4 flex flex-col items-center gap-3 border transition-all snap-start ${
                i === 0
                  ? 'border-sky-400/30 bg-sky-400/10'
                  : 'border-white/5 hover:border-white/10 hover:bg-white/5'
              }`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-wider ${i === 0 ? 'text-sky-300' : 'text-slate-400'}`}>
                {hour.time}
              </span>
              <WeatherIcon
                condition={hour.condition}
                size={22}
                className={i === 0 ? 'text-sky-300 animate-float' : 'text-slate-300'}
              />
              <span className="font-data-tabular text-sm font-bold text-slate-100">
                {convertTemp(hour.temp, units.temperature)}°
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7-Day Forecast Section */}
      <section>
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-title-md text-sm font-bold text-sky-300 mb-6 uppercase tracking-wider flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-sky-400" />
            7-Day Forecast
          </h2>
          <div className="flex flex-col gap-5">
            {city.forecast7d.map((day, i) => {
              const dayMinConverted = convertTemp(day.minTemp, units.temperature);
              const dayMaxConverted = convertTemp(day.maxTemp, units.temperature);

              // Calculate horizontal offset ratios for prettier dynamic bars (bento style)
              const rangeDiff = weekRange || 1;
              const leftPercent = ((day.minTemp - weekMin) / rangeDiff) * 100;
              const rightPercent = ((weekMax - day.maxTemp) / rangeDiff) * 100;

              return (
                <div key={day.day} className="flex items-center justify-between group">
                  {/* Day label */}
                  <span
                    className={`w-24 font-body-md text-sm font-semibold transition-colors group-hover:text-sky-300 ${
                      i === 0 ? 'text-sky-300 font-bold' : 'text-slate-200'
                    }`}
                  >
                    {day.day}
                  </span>

                  {/* Icon & Rain probability */}
                  <div className="flex items-center gap-2 w-16">
                    <WeatherIcon condition={day.condition} size={20} className="text-slate-400 group-hover:text-sky-200 group-hover:scale-105 transition-all" />
                    {day.rainProb ? (
                      <span className="text-[10px] text-orange-200 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded font-mono">
                        {day.rainProb}%
                      </span>
                    ) : (
                      <span className="w-8" />
                    )}
                  </div>

                  {/* Temperature slider bar */}
                  <div className="flex items-center gap-3 w-32 justify-end">
                    <span className="font-mono text-[11px] font-bold text-slate-500 w-8 text-right">
                      {dayMinConverted}°
                    </span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                      <div
                        className="absolute h-full bg-gradient-to-r from-sky-300 to-amber-300 rounded-full"
                        style={{
                          left: `${Math.max(0, Math.min(leftPercent, 80))}%`,
                          right: `${Math.max(0, Math.min(rightPercent, 80))}%`,
                        }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-200 w-8 text-right">
                      {dayMaxConverted}°
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Data Grid */}
      <section className="grid grid-cols-2 gap-4">
        {/* Wind */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-2 group hover:border-white/20 transition-colors">
          <div className="flex items-center gap-2 text-slate-400">
            <Wind className="w-4 h-4 text-emerald-400" />
            <span className="font-label-caps text-[10px] font-bold uppercase tracking-wider">WIND</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-100">
              {convertWind(city.windSpeed, units.windSpeed).value}{' '}
              <span className="text-xs font-normal text-slate-400">
                {convertWind(city.windSpeed, units.windSpeed).unitStr}
              </span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-wide mt-1">
              Direction: {city.windDir}
            </span>
          </div>
        </div>

        {/* Humidity Detail */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-2 group hover:border-white/20 transition-colors">
          <div className="flex items-center gap-2 text-slate-400">
            <Droplets className="w-4 h-4 text-sky-400" />
            <span className="font-label-caps text-[10px] font-bold uppercase tracking-wider">HUMIDITY</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-100">{city.humidity}%</span>
            <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wide mt-1">
              Dew point is {convertTemp(city.low - 3, units.temperature)}°
            </span>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
export default ForecastTab;
