/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  MoreVertical,
  Home,
  Search,
  CloudSun,
  Settings,
  X,
  Compass,
  CloudLightning,
  AlertCircle,
  TrendingUp,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

import {
  CityWeatherData,
  NotificationSettings,
  UnitSettings,
  SearchHistoryItem,
} from './types';
import { INITIAL_CITIES } from './data';
import { HomeTab } from './components/HomeTab';
import { ForecastTab } from './components/ForecastTab';
import { SearchTab } from './components/SearchTab';
import { SettingsTab } from './components/SettingsTab';

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'forecast' | 'settings'>('home');

  // Load state from local storage or set initial defaults
  const [cities, setCities] = useState<CityWeatherData[]>(() => {
    const saved = localStorage.getItem('atmospheric_cities');
    return saved ? JSON.parse(saved) : INITIAL_CITIES;
  });

  const [selectedCityId, setSelectedCityId] = useState<string>(() => {
    const saved = localStorage.getItem('atmospheric_selected_id');
    return saved || 'san-francisco';
  });

  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('atmospheric_notifications');
    return saved
      ? JSON.parse(saved)
      : { rainfallAlerts: true, tempSpikes: true, stormActivity: true };
  });

  const [units, setUnits] = useState<UnitSettings>(() => {
    const saved = localStorage.getItem('atmospheric_units');
    return saved
      ? JSON.parse(saved)
      : { temperature: 'C', windSpeed: 'KMH', pressure: 'MBAR' };
  });

  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    const saved = localStorage.getItem('atmospheric_history');
    return saved
      ? JSON.parse(saved)
      : [
          { id: '1', cityName: 'Tokyo', timestamp: '10 mins ago' },
          { id: '2', cityName: 'London', timestamp: '1 hour ago' },
          { id: '3', cityName: 'New York', timestamp: 'Yesterday' },
        ];
  });

  // UI state
  const [isDropdownExposed, setIsDropdownExposed] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [activeSimulationMsg, setActiveSimulationMsg] = useState<string | null>(null);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('atmospheric_cities', JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem('atmospheric_selected_id', selectedCityId);
  }, [selectedCityId]);

  useEffect(() => {
    localStorage.setItem('atmospheric_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('atmospheric_units', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('atmospheric_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const activeCity = cities.find((c) => c.id === selectedCityId) || cities[0];

  // Tab change handlers
  const handleTabSelect = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsDropdownExposed(false);
  };

  // Change city and navigate to main dashboard
  const handleSelectCity = (id: string) => {
    setSelectedCityId(id);
    setActiveTab('home');

    // Append to search history dynamically
    const targetCity = cities.find((c) => c.id === id);
    if (targetCity) {
      const isAlreadyInHistory = searchHistory.some(
        (h) => h.cityName.toLowerCase() === targetCity.name.toLowerCase()
      );
      if (!isAlreadyInHistory) {
        setSearchHistory((prev) => [
          {
            id: Date.now().toString(),
            cityName: targetCity.name,
            timestamp: 'Just now',
          },
          ...prev.slice(0, 5), // Keep top 6 items
        ]);
      }
    }
  };

  // Favorites trigger
  const handleToggleFavorite = (id: string) => {
    setCities((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, isFavorite: !c.isFavorite };
        }
        return c;
      })
    );
  };

  // Create city record dynamically (add location feature)
  const handleAddCity = (cityData: Partial<CityWeatherData>) => {
    const finalId = cityData.name?.toLowerCase().replace(/\s+/g, '-') || Date.now().toString();

    // Check if city already exists
    if (cities.some((c) => c.id === finalId)) {
      alert('A meteorological profile already exists for ' + cityData.name);
      return;
    }

    const newFullCity: CityWeatherData = {
      id: finalId,
      name: cityData.name || 'Unknown',
      country: cityData.country || 'Custom Log',
      temp: cityData.temp || 15,
      condition: cityData.condition || 'clear',
      high: cityData.high || 19,
      low: cityData.low || 11,
      humidity: cityData.humidity || 55,
      windSpeed: cityData.windSpeed || 15,
      windDir: cityData.windDir || 'North-West',
      pressure: cityData.pressure || 1013,
      sunrise: cityData.sunrise || '06:00 AM',
      sunset: cityData.sunset || '06:00 PM',
      daylight: cityData.daylight || '12h 00m',
      eveningOutlookTitle: cityData.eveningOutlookTitle || 'Atmospheric Twighlight Outlook',
      eveningOutlook: cityData.eveningOutlook || 'Overcast tranquility expected throughout.',
      isFavorite: true,
      forecast24h: cityData.forecast24h || [],
      forecast7d: cityData.forecast7d || [],
    };

    setCities((prev) => [newFullCity, ...prev]);
    setSelectedCityId(finalId);
    setActiveTab('home');

    // Notify user of creation success
    triggerSimulationMsg(`Successfully created meteorological profile for ${cityData.name}! Saved to favorites.`);
  };

  const handleUpdateNotifications = (settings: Partial<NotificationSettings>) => {
    setNotifications((prev) => ({ ...prev, ...settings }));
  };

  const handleUpdateUnits = (settings: Partial<UnitSettings>) => {
    setUnits((prev) => ({ ...prev, ...settings }));
  };

  const handleDeleteHistory = (id: string) => {
    setSearchHistory((prev) => prev.filter((h) => h.id !== id));
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleResetAllData = () => {
    localStorage.removeItem('atmospheric_cities');
    localStorage.removeItem('atmospheric_selected_id');
    localStorage.removeItem('atmospheric_notifications');
    localStorage.removeItem('atmospheric_units');
    localStorage.removeItem('atmospheric_history');
    setCities(INITIAL_CITIES);
    setSelectedCityId('san-francisco');
    setNotifications({ rainfallAlerts: true, tempSpikes: true, stormActivity: true });
    setUnits({ temperature: 'C', windSpeed: 'KMH', pressure: 'MBAR' });
    setSearchHistory([
      { id: '1', cityName: 'Tokyo', timestamp: '10 mins ago' },
      { id: '2', cityName: 'London', timestamp: '1 hour ago' },
      { id: '3', cityName: 'New York', timestamp: 'Yesterday' },
    ]);
    setActiveTab('home');
    triggerSimulationMsg('All databases initialized. Defaults restored.');
  };

  const triggerSimulationMsg = (msg: string) => {
    setActiveSimulationMsg(msg);
    setTimeout(() => {
      setActiveSimulationMsg(null);
    }, 4000);
  };

  // Perform dynamic AI summary regenerations
  const handleRefreshLocalAI = () => {
    setIsGeneratingAI(true);

    const generatedOutlooks: Record<string, string[]> = {
      'clear': [
        'A perfect pristine sky layout. Expect tranquil humidity and cool ambient winds ideal for twilight running.',
        'Starlit and crisp conditions are predicted to stay completely stable for the whole night sector.',
        'Perfect starry environment. Highly recommended to take full advantage of absolute clear visibility.',
      ],
      'partly-cloudy': [
        'Hazy golden reflections transition into dynamic scatter clouds. Minimal humidity shifts are expected.',
        'Scattering stratocumulus clouds moving out of the coastal sector within 3 hours. Calm outlook ahead.',
        'Slight sky coverage. Moderate thermal conditions make this an incredibly pleasant evening outlook.',
      ],
      'cloudy': [
        'Sustained gray altostratus cloud structures keep surface temperatures insulated. High barometric indices.',
        'Dense overcast layer expected to persist until early morning hours. Dry and calm stabilities.',
        'Low visibility profiles. Stable thick clouds keeping conditions consistent on a highly muted scale.',
      ],
      'rainy': [
        'Intermittent soft cooling dew transitions into continuous moderate showers. Carry water barriers.',
        'Steady radar precipitation cells advancing from regional coordinates. Expect damp roads.',
        'Slick asphalt alerts active. Rain density is expected to spike around midnight hours.',
      ],
      'storm': [
        'Dynamic lightning cells registered in close proximities. Rest in covered residential enclosures.',
        'Severe storm front tracking at 18 knots northwest. High barometric volatility expected.',
        'High winds, severe thunder strikes, and transient power spikes predicted. Stay protected.',
      ],
      'snow': [
        'Beautiful freezing precipitation drifting under scenic landscape lights. Ice conditions expected.',
        'Crisp light snowfall expected to form a fresh 2-centimeter layer of frost. Wrap up warm.',
      ],
    };

    const phrases = generatedOutlooks[activeCity.condition] || generatedOutlooks['clear'];
    const chosenPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    setTimeout(() => {
      setCities((prev) =>
        prev.map((c) => {
          if (c.id === selectedCityId) {
            return {
              ...c,
              eveningOutlook: chosenPhrase,
              eveningOutlookTitle: 'Regenerated AI Outlook',
            };
          }
          return c;
        })
      );
      setIsGeneratingAI(false);
      triggerSimulationMsg('Atmospheric Intelligence recalculated current forecast insights successfully!');
    }, 1500);
  };

  // Drops menu contextual actions
  const handleContextAction = (actionType: string) => {
    setIsDropdownExposed(false);

    switch (actionType) {
      case 'heatwave':
        setCities((prev) =>
          prev.map((c) => {
            if (c.id === selectedCityId) {
              return {
                ...c,
                temp: c.temp + 5,
                high: c.high + 5,
                low: c.low + 4,
                eveningOutlook: 'Extreme regional heat layer expands thermal indices drastically.',
                eveningOutlookTitle: 'Atmospheric Heatwave Alert',
              };
            }
            return c;
          })
        );
        triggerSimulationMsg('Simulated regional thermal spike (+5°C)! Outlook updated.');
        break;

      case 'thunderstorm':
        setCities((prev) =>
          prev.map((c) => {
            if (c.id === selectedCityId) {
              return {
                ...c,
                condition: 'storm',
                temp: 14,
                high: 16,
                low: 11,
                alert: {
                  type: 'warning',
                  title: 'Severe Thunderstorm Warning',
                  description: 'Frequent lightning and wind gusts up to 45 mph tracking into city limits immediate.',
                  timeLabel: 'Ends 11:30 PM',
                },
                eveningOutlook: 'Severe lightning active across coordinate planes. High warnings active.',
                eveningOutlookTitle: 'Extreme storm warnings',
              };
            }
            return c;
          })
        );
        triggerSimulationMsg('Simulated local storm convergence! Warning alerts activated.');
        break;

      case 'satellite':
        triggerSimulationMsg('Displaying dynamic regional radar loop: 100% stable index. No warnings.');
        break;

      case 'wind-gusts':
        setCities((prev) =>
          prev.map((c) => {
            if (c.id === selectedCityId) {
              return {
                ...c,
                windSpeed: c.windSpeed + 15,
                windDir: 'South-South-West',
              };
            }
            return c;
          })
        );
        triggerSimulationMsg('Simulated barometric wind gusts spike (+15 km/h)!');
        break;

      default:
        break;
    }
  };

  // Determine dynamic overlay layout patterns based on conditions
  const getAtmosphericGradients = () => {
    if (activeTab === 'settings') {
      // Charcoal/neutral theme for settings, matching screen 3 exactly
      return 'from-slate-950 via-slate-900 to-slate-950';
    }

    switch (activeCity.condition) {
      case 'clear':
        return 'from-sky-950 via-indigo-950 to-slate-950';
      case 'partly-cloudy':
        return 'from-sky-900 via-indigo-950 to-slate-950';
      case 'cloudy':
        return 'from-slate-900 via-slate-950 to-slate-950';
      case 'rainy':
        return 'from-blue-950 via-slate-950 to-slate-950';
      case 'storm':
        return 'from-purple-950 via-slate-950 to-slate-950';
      case 'snow':
        return 'from-cyan-950 via-slate-950 to-slate-950';
      default:
        return 'from-sky-950 via-indigo-950 to-slate-950';
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col max-w-md mx-auto bg-slate-950 overflow-hidden font-sans select-none shadow-2xl">
      
      {/* Background Dynamic Atmospheric Gradient Layer */}
      <div className={`absolute inset-0 z-0 bg-gradient-to-b ${getAtmosphericGradients()} transition-colors duration-1000 ease-in-out`} />
      
      {/* Carbon Fibre pattern Overlay from mockup spec */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay z-0 select-none pointer-events-none"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
        }}
      />

      {/* Floating Simulation notifications alerts */}
      <AnimatePresence>
        {activeSimulationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -45, scale: 0.95 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            className="absolute top-16 left-4 right-4 z-50 bg-slate-900/95 border border-sky-400/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3.5"
          >
            <div className="w-8 h-8 rounded-full bg-sky-400/10 flex items-center justify-center text-sky-400 flex-shrink-0 animate-pulse">
              <Compass className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-slate-200 leading-normal flex-1">
              {activeSimulationMsg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top App Bar Header: Frosted Glass Overlay */}
      <header className="sticky top-0 z-40 w-full h-16 backdrop-blur-lg bg-slate-950/20 border-b border-white/5 flex justify-between items-center px-5 flex-shrink-0">
        <motion.div
          key={activeCity.id + activeTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleTabSelect('search')}
          title="Click to select another city"
        >
          <MapPin className="text-sky-400 w-5 h-5 animate-[pulse_3s_infinite]" />
          <h1 className="text-lg font-bold tracking-tight text-slate-100 font-sans flex items-center gap-1">
            {activeTab === 'settings' ? 'Settings & Alerts' : activeCity.name}
            <span className="text-[10px] text-slate-500 font-normal font-mono">
              {activeTab === 'settings' ? '' : `, ${activeCity.country}`}
            </span>
          </h1>
        </motion.div>

        {/* Action button dots details context */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownExposed(!isDropdownExposed)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 active:bg-white/10 transition-all border border-transparent hover:border-white/5 focus:outline-none cursor-pointer"
            title="Options Menu"
          >
            <MoreVertical className="text-slate-400 hover:text-slate-100 w-5 h-5" />
          </button>

          {/* Context Options menu list */}
          <AnimatePresence>
            {isDropdownExposed && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownExposed(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 p-1.5 shadow-2xl z-50 text-xs text-slate-100"
                >
                  <div className="px-2.5 py-1.5 border-b border-slate-800 text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">
                    Simulation actions
                  </div>
                  <button
                    onClick={() => handleContextAction('heatwave')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-500/10 hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    Simulate Heatwave
                  </button>
                  <button
                    onClick={() => handleContextAction('thunderstorm')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 transition-colors flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <CloudLightning className="w-3.5 h-3.5 text-rose-400" />
                    Simulate Storm convergence
                  </button>
                  <button
                    onClick={() => handleContextAction('wind-gusts')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    Simulate Wind Gusts
                  </button>
                  <button
                    onClick={() => handleContextAction('satellite')}
                    className="w-full text-left px-3 py-2 border-t border-slate-800/80 rounded-lg hover:bg-sky-500/10 hover:text-sky-300 transition-colors flex items-center gap-2 cursor-pointer font-medium mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
                    View Satellite Radar
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Core View Layout content - vertically scrollable */}
      <main className="flex-1 overflow-y-auto px-5 pt-4 pb-32 relative z-10 no-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <HomeTab
              key="home"
              city={activeCity}
              units={units}
              onNavigateToForecast={() => handleTabSelect('forecast')}
              onNavigateToSettings={() => handleTabSelect('settings')}
              onRefreshCity={handleRefreshLocalAI}
              isGeneratingAI={isGeneratingAI}
            />
          )}

          {activeTab === 'search' && (
            <SearchTab
              key="search"
              cities={cities}
              onSelectCity={handleSelectCity}
              onToggleFavorite={handleToggleFavorite}
              onAddCity={handleAddCity}
              units={units}
              searchHistory={searchHistory}
              onDeleteHistory={handleDeleteHistory}
            />
          )}

          {activeTab === 'forecast' && (
            <ForecastTab key="forecast" city={activeCity} units={units} />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              key="settings"
              city={activeCity}
              notifications={notifications}
              onUpdateNotifications={handleUpdateNotifications}
              units={units}
              onUpdateUnits={handleUpdateUnits}
              onResetAllData={handleResetAllData}
              searchHistoryCount={searchHistory.length}
              onClearHistory={handleClearHistory}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Fixed bottom navigation bar from mockup */}
      <nav className="fixed bottom-0 w-full max-w-md z-40 backdrop-blur-xl bg-slate-950/40 border-t border-white/5 flex justify-around items-center px-4 py-3 pb-6 rounded-t-2xl shadow-2xl">
        {/* Tab: Home */}
        <button
          onClick={() => handleTabSelect('home')}
          className={`flex flex-col items-center justify-center gap-1 select-none cursor-pointer transition-all ${
            activeTab === 'home'
              ? 'bg-sky-400/10 text-sky-400 rounded-full px-5 py-1.5 font-bold scale-100 shadow-[0_4px_12px_rgba(164,201,255,0.1)]'
              : 'text-slate-400 hover:text-slate-200 scale-95'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'fill-sky-400/10 stroke-[2]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-label-caps uppercase tracking-widest font-semibold">
            Home
          </span>
        </button>

        {/* Tab: Search */}
        <button
          onClick={() => handleTabSelect('search')}
          className={`flex flex-col items-center justify-center gap-1 select-none cursor-pointer transition-all ${
            activeTab === 'search'
              ? 'bg-sky-400/10 text-sky-400 rounded-full px-5 py-1.5 font-bold scale-100 shadow-[0_4px_12px_rgba(164,201,255,0.1)]'
              : 'text-slate-400 hover:text-slate-200 scale-95'
          }`}
        >
          <Search className={`w-5 h-5 ${activeTab === 'search' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-label-caps uppercase tracking-widest font-semibold">
            Search
          </span>
        </button>

        {/* Tab: Forecast */}
        <button
          onClick={() => handleTabSelect('forecast')}
          className={`flex flex-col items-center justify-center gap-1 select-none cursor-pointer transition-all ${
            activeTab === 'forecast'
              ? 'bg-sky-400/10 text-sky-400 rounded-full px-5 py-1.5 font-bold scale-100 shadow-[0_4px_12px_rgba(164,201,255,0.1)]'
              : 'text-slate-400 hover:text-slate-200 scale-95'
          }`}
        >
          <CloudSun className={`w-5 h-5 ${activeTab === 'forecast' ? 'fill-sky-400/10 stroke-[2]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-label-caps uppercase tracking-widest font-semibold">
            Forecast
          </span>
        </button>

        {/* Tab: Settings */}
        <button
          onClick={() => handleTabSelect('settings')}
          className={`flex flex-col items-center justify-center gap-1 select-none cursor-pointer transition-all ${
            activeTab === 'settings'
              ? 'bg-sky-400/10 text-sky-400 rounded-full px-5 py-1.5 font-bold scale-100 shadow-[0_4px_12px_rgba(164,201,255,0.1)]'
              : 'text-slate-400 hover:text-slate-200 scale-95'
          }`}
        >
          <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'fill-sky-400/10 stroke-[2] animate-[spin_10s_linear_infinite]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-label-caps uppercase tracking-widest font-semibold">
            Settings
          </span>
        </button>
      </nav>
    </div>
  );
}
