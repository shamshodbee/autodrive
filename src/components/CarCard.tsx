import { Link } from '../router';
import type { Car } from '../lib/types';
import { formatMileage, CAR_CONDITION_LABELS } from '../lib/types';
import { useCurrency } from '../context/CurrencyContext';
import { Gauge, Calendar, ChevronRight } from 'lucide-react';

export default function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const { format } = useCurrency();
  return (
    <Link
      to={`/car?id=${car.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms`, animationFillMode: 'backwards' }}
    >
      <div className="glass rounded-2xl overflow-hidden card-hover hover:border-amber-500/30">
        <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-700">
          <img
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 chip bg-obsidian-900/80 border-white/10 text-cool-100 backdrop-blur">
            <Calendar className="w-3 h-3 text-amber-500" />
            {car.year}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-white truncate">
                {car.brand} {car.model}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-cool-400">
                <span className="flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5" />
                  {formatMileage(car.mileage_km)}
                </span>
                <span className="w-1 h-1 rounded-full bg-cool-600" />
                <span className="truncate">{car.color}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display font-bold text-lg text-white">{format(car.price)}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className={`chip ${
              car.condition === 'Excellent' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : car.condition === 'Good' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : 'bg-cool-500/10 border-cool-500/30 text-cool-300'
            }`}>
              {CAR_CONDITION_LABELS[car.condition]}
            </span>
            <span className="flex items-center gap-1 text-xs text-amber-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Batafsil <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
