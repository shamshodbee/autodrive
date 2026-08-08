import { useMemo, useState } from 'react';
import { useCars } from '../context/CarsContext';
import CarCard from '../components/CarCard';
import { formatPrice, CAR_CONDITION_LABELS, type CarCondition } from '../lib/types';
import { Search, SlidersHorizontal, TrendingUp, ChevronDown, Zap, ShieldCheck, Award } from 'lucide-react';

const HERO_IMG = 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg';

export default function HomePage() {
  const { cars, loading } = useCars();
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(300000);
  const [minYear, setMinYear] = useState(2015);
  const [condition, setCondition] = useState<string>('all');

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      if (query) {
        const q = query.toLowerCase();
        if (!(`${c.brand} ${c.model}`.toLowerCase().includes(q))) return false;
      }
      if (c.price > maxPrice) return false;
      if (c.year < minYear) return false;
      if (condition !== 'all' && c.condition !== condition) return false;
      return true;
    });
  }, [cars, query, maxPrice, minYear, condition]);

  const conditions: { value: string; label: string }[] = [
    { value: 'all', label: 'Barcha holatlar' },
    { value: 'Excellent', label: CAR_CONDITION_LABELS.Excellent },
    { value: 'Good', label: CAR_CONDITION_LABELS.Good },
    { value: 'Fair', label: CAR_CONDITION_LABELS.Fair },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/70 via-obsidian-900/85 to-obsidian-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 chip bg-amber-500/10 border-amber-500/30 text-amber-300 mb-6 animate-fade-in">
              <Zap className="w-3.5 h-3.5" />
              Premium avtomobil bozori
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white animate-fade-up">
              Keyingi<br />
              <span className="text-amber-500">ajoyib</span> avtomobilingizni toping.
            </h1>
            <p className="mt-6 text-lg text-cool-300 max-w-xl animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
              Premium va sport avtomobillari uchun bozor. Tasdiqlangan e'lonlar va shaffof narxlar bilan xavfsiz savdo.
            </p>
          </div>

          {/* Smart search filter */}
          <div className="mt-10 glass-strong rounded-2xl border border-white/10 p-5 sm:p-6 max-w-4xl animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
            <div className="flex flex-col gap-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cool-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Qidiruv... (masalan, BMW, Porsche, Tesla)"
                  className="input-field pl-12 py-4 text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Price slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-cool-300 flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5" /> Narxi bo'yicha
                    </label>
                    <span className="text-sm font-semibold text-amber-500">{formatPrice(maxPrice)}</span>
                  </div>
                  <input
                    type="range" min={10000} max={300000} step={5000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-cool-500 mt-1.5">
                    <span>10 ming$</span><span>300 ming$</span>
                  </div>
                </div>

                {/* Year slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-cool-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Yili bo'yicha
                    </label>
                    <span className="text-sm font-semibold text-amber-500">dan {minYear}</span>
                  </div>
                  <input
                    type="range" min={2000} max={2026} step={1}
                    value={minYear}
                    onChange={(e) => setMinYear(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-cool-500 mt-1.5">
                    <span>2000</span><span>2026</span>
                  </div>
                </div>

                {/* Condition dropdown */}
                <div>
                  <label className="text-xs font-medium text-cool-300 flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> Holati
                  </label>
                  <div className="relative">
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="input-field appearance-none pr-10 py-2.5 text-sm cursor-pointer"
                    >
                      {conditions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-white/5 bg-obsidian-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: 'Tez va oson', desc: "Bir necha daqiqada e'lon bering va xaridlarga yeting" },
            { icon: ShieldCheck, title: "Tasdiqlangan e'lonlar", desc: "Sotuvchi aloqa ma'lumotlari va shaffof tarix" },
            { icon: Award, title: 'Premium tanlov', desc: 'Tanlangan sport va hashamatli avtomobillar' },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                <p className="text-xs text-cool-400 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-3xl text-white">
              {query || condition !== 'all' || maxPrice < 300000 || minYear > 2000
                ? `${filtered.length} ta natija` : 'Tanlangan avtomobillar'}
            </h2>
            <p className="text-sm text-cool-400 mt-1">
              {loading ? "So'nggi e'lonlar yuklanmoqda..." : "Faol bozorimizdan tanlangan avtomobillar"}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-cool-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Jonli bozor
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden">
                <div className="aspect-[16/10] skeleton" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-2/3 rounded skeleton" />
                  <div className="h-4 w-1/2 rounded skeleton" />
                  <div className="h-8 w-1/3 rounded skeleton" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-cool-400">Filtrlaringizga mos avtomobil topilmadi. Qidiruvni kengaytiring.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
