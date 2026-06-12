import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  History,
  LogOut,
  AlertTriangle,
  Info,
  Clock,
  ShieldCheck,
  RotateCcw,
  BellRing,
  Sun,
} from 'lucide-react';
import {
  CityWeatherData,
  NotificationSettings,
  UnitSettings,
} from '../types';

interface SettingsTabProps {
  city: CityWeatherData;
  notifications: NotificationSettings;
  onUpdateNotifications: (settings: Partial<NotificationSettings>) => void;
  units: UnitSettings;
  onUpdateUnits: (settings: Partial<UnitSettings>) => void;
  onResetAllData: () => void;
  searchHistoryCount: number;
  onClearHistory: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  city,
  notifications,
  onUpdateNotifications,
  units,
  onUpdateUnits,
  onResetAllData,
  searchHistoryCount,
  onClearHistory,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-8 pb-8"
    >
      {/* User Profile Header */}
      <section className="flex items-center gap-4 p-2 relative overflow-hidden group">
        <div className="w-16 h-16 rounded-full bg-sky-400/10 flex items-center justify-center border border-sky-400/30 group-hover:bg-gradient-to-tr group-hover:from-sky-500/25 group-hover:to-cyan-400/15 duration-500 transition-all shadow-[0_0_15px_rgba(164,201,255,0.1)]">
          <User className="text-sky-300 w-8 h-8" />
        </div>
        <div className="flex flex-col">
          <h2 className="font-title-md text-lg font-bold text-slate-100 flex items-center gap-1.5 leading-none">
            Alex Thompson
            <ShieldCheck className="w-4.5 h-4.5 text-sky-400 fill-sky-500/10" />
          </h2>
          <span className="font-body-md text-xs font-medium text-slate-400 mt-1.5 bg-white/5 py-1 px-2.5 rounded-full w-max border border-white/5">
            Premium Member
          </span>
        </div>
      </section>

      {/* Account Section */}
      <section className="flex flex-col gap-3">
        <h2 className="font-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
          ACCOUNT MANAGEMENT
        </h2>
        <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-white/5 border border-white/10 shadow-lg">
          {/* Row: Search History trigger */}
          <div
            onClick={() => {
              if (searchHistoryCount > 0) {
                if (window.confirm('Clear all stored search queries?')) {
                  onClearHistory();
                }
              } else {
                alert('Session search logs are currently empty.');
              }
            }}
            className="flex items-center justify-between p-4.5 hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400">
                <History className="w-4.5 h-4.5" />
              </span>
              <div className="flex flex-col">
                <span className="font-title-md text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                  Search History
                </span>
                <span className="font-body-md text-xs text-slate-400 mt-0.5">
                  {searchHistoryCount > 0
                    ? `Click to clear ${searchHistoryCount} saved logs`
                    : 'No past logs recorded'}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 bg-white/5 hover:text-slate-200 group-hover:bg-slate-800 px-2.5 py-1 rounded-full transition-all">
              {searchHistoryCount}
            </span>
          </div>

          {/* Row: Log Out */}
          <div
            onClick={() => alert('Authentication logs reset: you are in preview sandbox mode.')}
            className="flex items-center justify-between p-4.5 hover:bg-rose-500/10 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400">
                <LogOut className="w-4.5 h-4.5" />
              </span>
              <div className="flex flex-col">
                <span className="font-title-md text-sm font-bold text-rose-400 group-hover:text-rose-300 transition-colors">
                  Log Out
                </span>
                <span className="font-body-md text-xs text-rose-400/50 mt-0.5">
                  Sign out of premium cloud profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Alerts Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
            WEATHER ALERTS
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-label-caps text-[9px] uppercase font-bold tracking-widest animate-pulse border border-rose-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            Live
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {/* Active Severe Warning - connected to Storm notifications block */}
          {notifications.stormActivity && city.alert && city.alert.type === 'warning' && (
            <motion.div
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel rounded-2xl p-5 border-l-4 border-rose-500 overflow-hidden relative group cursor-pointer hover:bg-white/10 transition-all shadow-[0_5px_15px_rgba(239,68,68,0.05)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0 animate-[pulse_1.5s_infinite]">
                  <AlertTriangle className="text-rose-400 w-5 h-5 fill-rose-500/10" />
                </div>
                <div className="flex-1">
                  <h3 className="font-title-md text-sm font-bold text-rose-400 mb-1">
                    {city.alert.title}
                  </h3>
                  <p className="font-body-md text-xs text-slate-300 leading-relaxed shadow-sm">
                    {city.alert.description}
                  </p>
                  <div className="mt-3.5 flex items-center gap-1.5 text-rose-400/60 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{city.alert.timeLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Active UV Advisory - connected to Temp warnings change */}
          {notifications.tempSpikes && (
            <motion.div
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel rounded-2xl p-5 border-l-4 border-amber-500 group cursor-pointer hover:bg-white/10 transition-all shadow-[0_5px_15px_rgba(245,166,35,0.05)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 text-amber-400">
                  <Info className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-title-md text-sm font-bold text-amber-500 mb-1">
                    High UV Index Advisory
                  </h3>
                  <p className="font-body-md text-xs text-slate-300 leading-relaxed leading-normal">
                    UV levels will reach extreme levels between 11 AM and 3 PM. Protective sun blocking measures are highly recommended.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {!notifications.stormActivity && !notifications.tempSpikes && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel rounded-xl p-6 text-center text-slate-500 font-body-md text-sm"
            >
              Alert visibility is disabled by your Push Notification preferences below.
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Push Notifications Section */}
      <section className="flex flex-col gap-3">
        <h2 className="font-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
          PUSH NOTIFICATIONS
        </h2>
        <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-white/5 border border-white/10 shadow-lg">
          {/* Row: Rainfall */}
          <div className="flex items-center justify-between p-4.5 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400">
                <BellRing className="w-4.5 h-4.5" />
              </span>
              <div className="flex flex-col">
                <span className="font-title-md text-sm font-bold text-slate-100">
                  Rainfall Alerts
                </span>
                <span className="font-body-md text-xs text-slate-400 mt-0.5">
                  Notify when precipitation is starting soon
                </span>
              </div>
            </div>
            
            {/* Toggle checkbox custom styled */}
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={notifications.rainfallAlerts}
                onChange={(e) =>
                  onUpdateNotifications({ rainfallAlerts: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 border border-white/5 rounded-full peer peer-checked:bg-sky-400 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-slate-300 after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-slate-950" />
            </label>
          </div>

          {/* Row: Temp Changes */}
          <div className="flex items-center justify-between p-4.5 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Sun className="w-4.5 h-4.5" />
              </span>
              <div className="flex flex-col">
                <span className="font-title-md text-sm font-bold text-slate-100">
                  Temperature Spikes
                </span>
                <span className="font-body-md text-xs text-slate-400 mt-0.5">
                  Alerts for extreme daily indexes and UV levels
                </span>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={notifications.tempSpikes}
                onChange={(e) =>
                  onUpdateNotifications({ tempSpikes: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 border border-white/5 rounded-full peer peer-checked:bg-sky-400 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-slate-300 after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-slate-950" />
            </label>
          </div>

          {/* Row: Storms */}
          <div className="flex items-center justify-between p-4.5 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-4.5 h-4.5" />
              </span>
              <div className="flex flex-col">
                <span className="font-title-md text-sm font-bold text-slate-100">
                  Storm Activity
                </span>
                <span className="font-body-md text-xs text-slate-400 mt-0.5">
                  Critical local meteorological warnings
                </span>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={notifications.stormActivity}
                onChange={(e) =>
                  onUpdateNotifications({ stormActivity: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 border border-white/5 rounded-full peer peer-checked:bg-sky-400 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-slate-300 after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-slate-950" />
            </label>
          </div>
        </div>
      </section>

      {/* Unit Settings Section */}
      <section className="flex flex-col gap-3">
        <h2 className="font-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
          METEOROLOGICAL UNIT SETTINGS
        </h2>
        <div className="glass-panel rounded-2xl p-5 flex flex-col gap-6 border border-white/10 shadow-lg">
          {/* Temperature Toggle Slider */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-title-md text-sm font-bold text-slate-100">
                Temperature
              </span>
              <span className="font-body-md text-xs text-slate-400 mt-0.5">
                Switch values between dynamic heat metrics
              </span>
            </div>
            <div className="flex bg-slate-950 border border-white/5 p-1 rounded-xl h-11 items-center">
              <button
                onClick={() => onUpdateUnits({ temperature: 'C' })}
                className={`px-4 py-1.5 rounded-lg font-label-caps text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer h-full flex items-center ${
                  units.temperature === 'C'
                    ? 'bg-sky-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CELSIUS
              </button>
              <button
                onClick={() => onUpdateUnits({ temperature: 'F' })}
                className={`px-4 py-1.5 rounded-lg font-label-caps text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer h-full flex items-center ${
                  units.temperature === 'F'
                    ? 'bg-sky-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                FAHRENHEIT
              </button>
            </div>
          </div>

          {/* Wind Speed Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-title-md text-sm font-bold text-slate-100">
                Wind Speed
              </span>
              <span className="font-body-md text-xs text-slate-400 mt-0.5">
                Units configuration for wind gusts
              </span>
            </div>
            <div className="flex bg-slate-950 border border-white/5 p-1 rounded-xl h-11 items-center">
              <button
                onClick={() => onUpdateUnits({ windSpeed: 'KMH' })}
                className={`px-4 py-1.5 rounded-lg font-label-caps text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer h-full flex items-center ${
                  units.windSpeed === 'KMH'
                    ? 'bg-sky-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                KM/H
              </button>
              <button
                onClick={() => onUpdateUnits({ windSpeed: 'MPH' })}
                className={`px-4 py-1.5 rounded-lg font-label-caps text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer h-full flex items-center ${
                  units.windSpeed === 'MPH'
                    ? 'bg-sky-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                MPH
              </button>
            </div>
          </div>

          {/* Air Pressure Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-title-md text-sm font-bold text-slate-100">
                Air Pressure
              </span>
              <span className="font-body-md text-xs text-slate-400 mt-0.5">
                Barometric scale format presentation
              </span>
            </div>
            <div className="flex bg-slate-950 border border-white/5 p-1 rounded-xl h-11 items-center">
              <button
                onClick={() => onUpdateUnits({ pressure: 'MBAR' })}
                className={`px-4 py-1.5 rounded-lg font-label-caps text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer h-full flex items-center ${
                  units.pressure === 'MBAR'
                    ? 'bg-sky-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                MBAR
              </button>
              <button
                onClick={() => onUpdateUnits({ pressure: 'INHG' })}
                className={`px-4 py-1.5 rounded-lg font-label-caps text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer h-full flex items-center ${
                  units.pressure === 'INHG'
                    ? 'bg-sky-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                INHG
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="mt-4 flex flex-col gap-4">
        <button
          onClick={() => {
            if (
              window.confirm(
                'Are you sure you want to reset all data? This will clear all favorite updates, custom locations, search records, and restore defaults.'
              )
            ) {
              onResetAllData();
            }
          }}
          className="w-full py-4 px-6 rounded-2xl border border-red-500/20 text-rose-400 hover:text-slate-100 bg-rose-500/5 hover:bg-rose-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-semibold text-sm cursor-pointer border border-red-500/10 hover:border-red-500/40"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All Atmospheric Data
        </button>
        <p className="text-center text-slate-600 font-mono text-[9px] uppercase tracking-widest leading-none">
          Version 4.2.1-Atmospheric
        </p>
      </section>
    </motion.div>
  );
};
export default SettingsTab;
