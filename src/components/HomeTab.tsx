import React from 'react';
import { motion } from 'motion/react';
import { CloudRain, Wind, Compass, AlertTriangle, ArrowRight, Eye, RefreshCw, Zap } from 'lucide-react';
import { CityWeatherData, UnitSettings } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { convertTemp, convertWind, convertPressure } from '../data';

interface HomeTabProps {
  city: CityWeatherData;
  units: UnitSettings;
  onNavigateToForecast: () => void;
  onNavigateToSettings: () => void;
  onRefreshCity: () => void;
  isGeneratingAI: boolean;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  city,
  units,
  onNavigateToForecast,
  onNavigateToSettings,
  onRefreshCity,
  isGeneratingAI,
}) => {
  const currentTempConverted = convertTemp(city.temp, units.temperature);
  const highTempConverted = convertTemp(city.high, units.temperature);
  const lowTempConverted = convertTemp(city.low, units.temperature);

  const { value: windVal, unitStr: windUnitStr } = convertWind(city.windSpeed, units.windSpeed);
  const { value: presVal, unitStr: presUnitStr } = convertPressure(city.pressure, units.pressure);

  // Capitalize condition name for readable display
  const formatCondition = (cond: string) => {
    return cond
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      {/* Active High-priority Alert banner if warning level is high */}
      {city.alert && city.alert.type === 'warning' && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={onNavigateToSettings}
          className="glass-panel border-l-4 border-rose-500 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <AlertTriangle className="text-rose-400 w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-label-caps text-[11px] text-rose-400 font-bold uppercase tracking-wider">
                WEATHER ALERT ACTIVE
              </span>
              <span className="text-sm font-medium text-slate-100 line-clamp-1">
                {city.alert.title}
              </span>
            </div>
          </div>
          <ArrowRight className="text-slate-400 w-4 h-4 ml-2" />
        </motion.div>
      )}

      {/* Hero Section: Temperature and Visual Indicator */}
      <section className="flex flex-col items-center justify-center pt-4 pb-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            delay: 0.1,
          }}
          className="relative mb-3 group"
          onClick={onRefreshCity}
          title="Click to refresh local atmospheric data"
        >
          <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <WeatherIcon
            condition={city.condition}
            size={120}
            className="text-sky-300 drop-shadow-[0_8px_24px_rgba(164,201,255,0.3)] animate-float cursor-pointer relative z-10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-1"
        >
          <span className="font-display-temp text-[96px] font-extralight tracking-tighter text-slate-100 select-none">
            {currentTempConverted}°
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-1"
        >
          <h2 className="font-headline-lg-mobile text-[28px] font-semibold text-slate-100 leading-tight">
            {formatCondition(city.condition)}
          </h2>
          <div className="flex items-center gap-3 text-slate-400 font-body-md text-sm font-medium mt-1">
            <span className="flex items-center gap-1">H: {highTempConverted}°</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span className="flex items-center gap-1">L: {lowTempConverted}°</span>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid: Quick Glance Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Humidity Card */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between aspect-square md:aspect-auto md:h-44 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/15 transition-all" />
          <div className="flex items-center gap-2 text-slate-400">
            <CloudRain className="w-4 h-4 text-sky-400" />
            <span className="font-label-caps text-xs uppercase tracking-widest font-semibold">
              Humidity
            </span>
          </div>
          <div className="relative z-10">
            <div className="text-[32px] font-semibold text-slate-100 leading-none mb-3">
              {city.humidity}%
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${city.humidity}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="bg-gradient-to-r from-sky-400 to-sky-300 h-full rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Wind Speed Card */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between aspect-square md:aspect-auto md:h-44 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all" />
          <div className="flex items-center gap-2 text-slate-400">
            <Wind className="w-4 h-4 text-emerald-400" />
            <span className="font-label-caps text-xs uppercase tracking-widest font-semibold">
              Wind Speed
            </span>
          </div>
          <div>
            <div className="text-[32px] font-semibold text-slate-100 leading-none">
              {windVal} <span className="text-lg font-normal text-slate-400 ml-0.5">{windUnitStr}</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-2 uppercase tracking-wide flex items-center gap-1.5 font-mono">
              <Compass className="w-3.5 h-3.5" />
              From {city.windDir}
            </p>
          </div>
        </div>

        {/* Pressure Card */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between aspect-square md:aspect-auto md:h-44 col-span-2 md:col-span-1 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/15 transition-all" />
          <div className="flex items-center gap-2 text-slate-400">
            <Compass className="w-4 h-4 text-indigo-400 animate-[spin_60s_linear_infinite]" />
            <span className="font-label-caps text-xs uppercase tracking-widest font-semibold">
              Pressure
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <div className="text-[32px] font-semibold text-slate-100 leading-none">
              {presVal}
            </div>
            <div className="text-slate-400 font-label-caps text-xs font-semibold uppercase tracking-wide">
              {presUnitStr}
            </div>
          </div>
        </div>
      </section>

      {/* 24-Hour Forecast Card (Wider Visual Element) */}
      <section className="mt-2">
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Compass className="w-4 h-4 text-sky-400" />
              <span className="font-label-caps text-xs font-bold uppercase tracking-wider">
                Hourly Forecast
              </span>
            </div>
            <button
              onClick={onNavigateToForecast}
              className="font-label-caps text-xs font-bold text-sky-400 hover:text-sky-300 cursor-pointer hover:underline transition-colors flex items-center gap-1"
            >
              View More
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-1 no-scrollbar scrollbar-hide snap-x">
            {city.forecast24h.map((hour, i) => (
              <div
                key={hour.time}
                className={`flex flex-col items-center gap-3 min-w-[64px] py-3 px-2 rounded-xl h-24 justify-between snap-start transition-all ${
                  i === 0
                    ? 'bg-sky-400/10 border border-sky-400/30 text-sky-300'
                    : 'bg-white/5 hover:bg-white/10 text-slate-100 border border-transparent'
                }`}
              >
                <span className="font-label-caps text-[10px] uppercase font-bold tracking-wider opacity-70">
                  {hour.time}
                </span>
                <WeatherIcon condition={hour.condition} size={22} className={i === 0 ? 'text-sky-300' : 'text-slate-300'} />
                <span className="font-data-tabular text-sm font-semibold">
                  {convertTemp(hour.temp, units.temperature)}°
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic AI Outlook Illustration Section */}
      <section className="mt-2 rounded-2xl overflow-hidden relative h-52 group shadow-lg">
        <img
          alt="Scenic atmospheric skyline"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa8ijK5nAPGMyQA_dDZhlD-Dmnh9qvxyjdOMrk5Z5wJmghv8VAQazi5Ezi1fcR42Ow7x-xg4js6Zg2U7FtXTKXqGJUq2I1ZDAFfBF48hAGkNeBns2_DRNnVoMe63Nx1AjG74CqvbRkpl_fIavkKfbjOwTDXHGzCjjTTBSkiW2TR1PFhTBzDnpSZFpOOlEQ_8jVdwaFrlqnvzYR6Inj__afZHMsCfwV1ipog73UJfbr-IFOutjKjghpxPbVZmkBgFrTJmPo4HFMRWI"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        
        {/* Premium AI Sparkle badge */}
        <div className="absolute top-4 right-4 bg-sky-500/20 text-sky-300 border border-sky-400/30 backdrop-blur-md rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 animate-pulse">
          <Zap className="w-3 h-3 fill-sky-300" />
          <span>Atmospheric AI</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="max-w-[75%]">
            <h3 className="font-title-md text-sm font-bold text-slate-100 flex items-center gap-1 hover:text-sky-300 transition-colors cursor-pointer" onClick={onRefreshCity}>
              {city.eveningOutlookTitle}
            </h3>
            <p className="font-body-md text-xs text-slate-300 mt-1 shadow-sm leading-relaxed">
              {isGeneratingAI ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping" />
                  Generating smart summary...
                </span>
              ) : (
                city.eveningOutlook
              )}
            </p>
          </div>
          
          <button
            onClick={onRefreshCity}
            disabled={isGeneratingAI}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-sky-500/20 text-slate-100 hover:text-sky-300 border border-white/5 hover:border-sky-400/30 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 disabled:opacity-50"
            title="Regenerate evening outlook"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAI ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>
      </section>
    </motion.div>
  );
};
export default HomeTab;
