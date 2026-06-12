import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Mic, Cloud, MapIcon, Newspaper, Plus, Heart, HeartOff, Trash2, X, PlusCircle, Sparkles } from 'lucide-react';
import { CityWeatherData, UnitSettings } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { convertTemp } from '../data';

interface SearchTabProps {
  cities: CityWeatherData[];
  onSelectCity: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onAddCity: (cityData: Partial<CityWeatherData>) => void;
  units: UnitSettings;
  searchHistory: { id: string; cityName: string; timestamp: string }[];
  onDeleteHistory: (id: string) => void;
}

export const SearchTab: React.FC<SearchTabProps> = ({
  cities,
  onSelectCity,
  onToggleFavorite,
  onAddCity,
  units,
  searchHistory,
  onDeleteHistory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSpeechSimulating, setIsSpeechSimulating] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [newCityTemp, setNewCityTemp] = useState('20');
  const [newCityCond, setNewCityCond] = useState<'clear' | 'partly-cloudy' | 'cloudy' | 'rainy' | 'storm' | 'snow'>('clear');

  // Interactive micro voice input simulation
  const handleVoiceClick = () => {
    setIsSpeechSimulating(true);
    const phrases = ['Paris', 'Sydney', 'New York', 'Tokyo', 'London'];
    const chosen = phrases[Math.floor(Math.random() * phrases.length)];
    
    // Simulate speech transcription letter by letter
    setSearchQuery('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < chosen.length) {
        setSearchQuery((prev) => prev + chosen.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSpeechSimulating(false);
        }, 500);
      }
    }, 100);
  };

  // Filter list based on search query
  const filteredCities = cities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Favorites list representation
  const favoriteCities = cities.filter((c) => c.isFavorite);

  // Handle adding a custom city
  const handleAddNewCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;

    onAddCity({
      name: newCityName.trim(),
      country: 'Custom Entry',
      temp: parseFloat(newCityTemp) || 20,
      condition: newCityCond,
      high: (parseFloat(newCityTemp) || 20) + 4,
      low: (parseFloat(newCityTemp) || 20) - 4,
      humidity: 55,
      windSpeed: 15,
      windDir: 'North-East',
      pressure: 1013,
      sunrise: '06:10 AM',
      sunset: '07:45 PM',
      daylight: '13h 35m',
      eveningOutlookTitle: 'Dynamic Twilight Outlook',
      eveningOutlook: `Warm clear breezes predicted across ${newCityName.trim()} with tranquil skies.`,
      forecast24h: [
        { time: 'Now', condition: newCityCond, temp: parseFloat(newCityTemp) || 20 },
        { time: '14:00', condition: newCityCond, temp: (parseFloat(newCityTemp) || 20) + 2 },
        { time: '18:00', condition: 'clear', temp: (parseFloat(newCityTemp) || 20) - 2 },
      ],
      forecast7d: [
        { day: 'Today', condition: newCityCond, minTemp: (parseFloat(newCityTemp) || 20) - 4, maxTemp: (parseFloat(newCityTemp) || 20) + 4 },
        { day: 'Tuesday', condition: 'clear', minTemp: (parseFloat(newCityTemp) || 20) - 3, maxTemp: (parseFloat(newCityTemp) || 20) + 5 },
        { day: 'Wednesday', condition: 'cloudy', minTemp: (parseFloat(newCityTemp) || 20) - 2, maxTemp: (parseFloat(newCityTemp) || 20) + 2 },
      ],
    });

    setNewCityName('');
    setIsAddModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      {/* Search Input Section */}
      <section className="w-full relative z-20">
        <div className="glass-panel rounded-2xl p-2.5 flex items-center gap-3 shadow-lg border border-white/10 focus-within:ring-2 focus-within:ring-sky-400/50 focus-within:border-sky-400/50 transition-all duration-300">
          <Search className="text-slate-400 ml-2.5 w-5 h-5 flex-shrink-0" />
          <input
            className="bg-transparent border-none outline-none focus:ring-0 w-full text-slate-100 placeholder:text-slate-500 font-body-md text-sm py-1.5 focus:outline-none"
            placeholder={isSpeechSimulating ? 'Listening to query...' : 'Search for a city or airport'}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleVoiceClick}
            disabled={isSpeechSimulating}
            className={`p-2 rounded-full transition-all text-sky-400 cursor-pointer ${
              isSpeechSimulating ? 'bg-sky-500/20 animate-pulse scale-105' : 'hover:bg-white/10'
            }`}
            title="Simulate Speech Search"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Global Filter Query Quick chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {['All', 'United States', 'Europe', 'Asia', 'Clear', 'Rainy'].map((chip) => {
          const isActive =
            searchQuery.toLowerCase() === chip.toLowerCase() ||
            (chip === 'All' && searchQuery === '');
          return (
            <button
              key={chip}
              onClick={() => setSearchQuery(chip === 'All' ? '' : chip)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-label-caps uppercase tracking-wider transition-all border cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'bg-sky-400 text-slate-950 border-sky-400 shadow-md font-bold'
                  : 'bg-white/5 border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/10'
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Search results view if search queries are entered */}
      {searchQuery && (
        <section className="flex flex-col gap-3 min-h-[150px]">
          <h2 className="font-title-md text-xs font-bold text-sky-300 tracking-wider uppercase mb-1 flex items-center justify-between">
            <span>Search Results ({filteredCities.length})</span>
            <button onClick={() => setSearchQuery('')} className="text-[10px] text-slate-500 hover:text-slate-300 font-mono font-bold lowercase">
              [clear filter]
            </button>
          </h2>
          
          <AnimatePresence mode="popLayout">
            {filteredCities.map((city) => (
              <motion.div
                key={city.id}
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="glass-panel rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group cursor-pointer"
              >
                <div onClick={() => onSelectCity(city.id)} className="flex-1 flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-title-md text-slate-100 font-bold group-hover:text-sky-300 transition-colors">
                      {city.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400">
                      {city.country}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 capitalize bg-white/5 px-2 py-0.5 rounded-full w-max mt-1 text-[11px] font-medium">
                    {city.condition.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(city.id);
                    }}
                    className="p-2 bg-white/5 hover:bg-sky-500/10 rounded-full transition-all cursor-pointer group/fav"
                    title={city.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  >
                    {city.isFavorite ? (
                      <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-[pulse_1.5s_infinite]" />
                    ) : (
                      <Heart className="w-4 h-4 text-slate-400 group-hover/fav:text-rose-400 group-hover/fav:scale-110" />
                    )}
                  </button>
                  <div onClick={() => onSelectCity(city.id)} className="text-right">
                    <div className="font-headline-lg-mobile text-lg font-bold text-slate-100">
                      {convertTemp(city.temp, units.temperature)}°
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCities.length === 0 && (
            <div className="text-center py-8 text-slate-500 font-body-md text-sm">
              <Cloud className="w-12 h-12 text-slate-600 mx-auto mb-2 animate-bounce" />
              No matching meteorological logs found for &quot;{searchQuery}&quot;.
              <button
                onClick={() => {
                  setNewCityName(searchQuery);
                  setIsAddModalOpen(true);
                }}
                className="block mx-auto mt-4 px-4 py-2 bg-sky-400/10 border border-sky-400/30 text-sky-400 hover:bg-sky-400/20 text-xs font-bold uppercase font-label-caps tracking-wider rounded-xl transition-all cursor-pointer"
              >
                + Create custom city record
              </button>
            </div>
          )}
        </section>
      )}

      {/* Favorite Cities List */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-end mb-1">
          <h2 className="font-title-md text-sm font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
            Favorite Cities
          </h2>
          <span className="font-label-caps text-[10px] font-bold text-sky-400 tracking-wider bg-sky-400/10 px-2.5 py-0.5 rounded-full font-mono">
            {favoriteCities.length} SAVED
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {favoriteCities.map((city) => (
              <motion.div
                key={city.id}
                layoutId={`fav-card-${city.id}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="glass-panel rounded-2xl p-4 flex justify-between items-center transition-all hover:border-white/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer group relative overflow-hidden"
              >
                <div onClick={() => onSelectCity(city.id)} className="flex-1 flex flex-col relative z-10 select-none">
                  <span className="font-headline-lg-mobile text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    {city.name}
                  </span>
                  <span className="text-xs text-slate-400 capitalize mt-0.5">
                    {city.condition.replace('-', ' ')}
                  </span>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded font-mono">
                      H: {convertTemp(city.high, units.temperature)}°
                    </span>
                    <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded font-mono">
                      L: {convertTemp(city.low, units.temperature)}°
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10 select-none">
                  <div className="text-right flex flex-col items-end pr-1">
                    <WeatherIcon
                      condition={city.condition}
                      size={28}
                      className="text-sky-300 mb-1.5 group-hover:scale-110 group-hover:text-amber-300 transition-all"
                    />
                    <span className="font-display-temp text-2xl font-bold leading-none text-slate-100">
                      {convertTemp(city.temp, units.temperature)}°
                    </span>
                  </div>
                  
                  {/* Inline delete favorite trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(city.id);
                    }}
                    className="p-2 py-4 text-slate-600 hover:text-rose-400 transition-colors rounded-xl bg-white/5 hover:bg-rose-500/10 cursor-pointer group/del"
                    title="Remove Favorite"
                  >
                    <HeartOff className="w-3.5 h-3.5 group-hover/del:scale-110" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Search History Section (Account Sync representation) */}
      {searchHistory.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-title-md text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
              Search History
            </h2>
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">
              Local Session History
            </span>
          </div>
          <div className="glass-panel rounded-xl overflow-hidden divide-y divide-white/5">
            {searchHistory.map((history) => (
              <div
                key={history.id}
                className="flex items-center justify-between p-3.5 hover:bg-white/5 transition-all text-sm group"
              >
                <div
                  onClick={() => setSearchQuery(history.cityName)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-sky-400 transition-colors" />
                  <span className="text-slate-300 font-medium group-hover:text-slate-100">
                    {history.cityName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {history.timestamp}
                  </span>
                  <button
                    onClick={() => onDeleteHistory(history.id)}
                    className="text-slate-600 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                    title="Delete history entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Suggested Section (Bento Grid Style) */}
      <section className="flex flex-col gap-4">
        <h2 className="font-title-md text-sm font-bold text-sky-300 uppercase tracking-wider">
          Explore Markets
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-4.5 h-32 flex flex-col justify-between relative overflow-hidden group cursor-pointer border border-white/5 hover:border-sky-400/20">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-sky-500/10 rounded-full blur-xl group-hover:scale-150 group-hover:bg-sky-500/20 transition-all duration-500" />
            <span className="font-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">
              WORLDWIDE
            </span>
            <div className="flex items-center justify-between relative z-10">
              <span className="font-title-md text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                Radar View
              </span>
              <MapIcon className="text-sky-400 w-5 h-5" />
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-4.5 h-32 flex flex-col justify-between relative overflow-hidden group cursor-pointer border border-white/5 hover:border-amber-400/20">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:scale-150 group-hover:bg-amber-500/20 transition-all duration-500" />
            <span className="font-label-caps text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">
              ALERTS
            </span>
            <div className="flex items-center justify-between relative z-10">
              <span className="font-title-md text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                News Feed
              </span>
              <Newspaper className="text-amber-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button for Adding location */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-24 right-5 z-40 bg-sky-400 hover:bg-sky-300 text-slate-950 p-4.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer hover:rotate-90 duration-300"
        title="Create Custom Location Record"
      >
        <Plus className="w-5 h-5 stroke-[3]" />
      </button>

      {/* Custom modal for adding cities dynamically */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setIsAddModalOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="glass-panel bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-sm relative z-10 shadow-2xl flex flex-col gap-5"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-sm font-bold text-sky-300 tracking-wider uppercase flex items-center gap-1.5 font-label-caps">
                  <Sparkles className="w-4 h-4 fill-sky-300 text-sky-400 animate-pulse" />
                  Create City Record
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddNewCitySubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                    City Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paris, Las Vegas"
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    min="-40"
                    max="50"
                    required
                    value={newCityTemp}
                    onChange={(e) => setNewCityTemp(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                    Condition
                  </label>
                  <select
                    value={newCityCond}
                    onChange={(e: any) => setNewCityCond(e.target.value)}
                    className="bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50"
                  >
                    <option value="clear">☀️ Clear Sky</option>
                    <option value="partly-cloudy">⛅ Partly Cloudy</option>
                    <option value="cloudy">☁️ Cloudy</option>
                    <option value="rainy">🌧️ Rain</option>
                    <option value="storm">⛈️ Storm Activity</option>
                    <option value="snow">❄️ Snowing</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-sky-400 to-sky-300 hover:from-sky-300 hover:to-sky-250 text-slate-950 font-bold uppercase font-label-caps text-xs tracking-widest rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-slate-950" />
                  Save Record
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default SearchTab;
