import { useState } from 'react';
import { useCars } from '../context/CarsContext';
import { useAuth } from '../context/AuthContext';
import { useRouter, Link } from '../router';
import { formatPrice, formatMileage, CAR_CONDITION_LABELS } from '../lib/types';
import {
  ChevronLeft, ChevronRight, Phone, Send, Instagram,
  Gauge, Calendar, Palette, ShieldCheck, Car as CarIcon, User, ArrowLeft, Trash2,
} from 'lucide-react';

export default function CarDetailPage() {
  const { route, navigate } = useRouter();
  const { getById, loading, deleteCar } = useCars();
  const { user } = useAuth();
  const [activeImg, setActiveImg] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const id = route.params.id;
  const car = getById(id);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-[16/10] skeleton rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 skeleton rounded" />
            <div className="h-6 w-1/3 skeleton rounded" />
            <div className="h-40 skeleton rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <CarIcon className="w-12 h-12 text-cool-600 mx-auto mb-4" />
        <h2 className="font-display font-bold text-2xl text-white">E'lon topilmadi</h2>
        <p className="text-cool-400 mt-2">Bu avtomobil sotilgan yoki o'chirilgan bo'lishi mumkin.</p>
        <Link to="/" className="inline-flex items-center gap-2 mt-6 btn-amber px-5 py-2.5 rounded-lg text-sm">
          <ArrowLeft className="w-4 h-4" /> Bozorga qaytish
        </Link>
      </div>
    );
  }

  const images = car.images.length ? car.images : ['https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg'];

  const specs = [
    { icon: Calendar, label: 'Yili', value: String(car.year) },
    { icon: Gauge, label: 'Yurgan masofasi', value: formatMileage(car.mileage_km) },
    { icon: ShieldCheck, label: 'Holati', value: CAR_CONDITION_LABELS[car.condition] },
    { icon: Palette, label: 'Rangi', value: car.color },
    { icon: CarIcon, label: 'Markasi', value: car.brand },
    { icon: CarIcon, label: 'Modeli', value: car.model },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-cool-400 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Bozorga qaytish
        </button>

        {user && car.user_id === user.id && (
          confirming ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-cool-300">Rostdan ham o'chirilsinmi?</span>
              <button
                disabled={deleting}
                onClick={async () => {
                  setDeleting(true);
                  const ok = await deleteCar(car.id);
                  setDeleting(false);
                  if (ok) navigate('/');
                }}
                className="px-3 py-1.5 rounded-lg text-sm bg-red-500/90 hover:bg-red-500 text-white transition-colors disabled:opacity-60"
              >
                {deleting ? 'O\'chirilmoqda...' : 'Ha, o\'chir'}
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="px-3 py-1.5 rounded-lg text-sm btn-ghost"
              >
                Bekor qilish
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> E'lonni o'chirish
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div className="animate-fade-in">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-obsidian-700 group">
            <img src={images[activeImg]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-obsidian-900/70 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-500 hover:text-obsidian-900"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-obsidian-900/70 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-500 hover:text-obsidian-900"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="absolute bottom-3 right-3 chip bg-obsidian-900/80 border-white/10 text-cool-100 backdrop-blur">
              {activeImg + 1} / {images.length}
            </div>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImg === i ? 'border-amber-500' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="animate-fade-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="chip bg-amber-500/10 border-amber-500/30 text-amber-300">{CAR_CONDITION_LABELS[car.condition]}</span>
            <span className="chip bg-obsidian-700/50 border-white/10 text-cool-300">{car.year}</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
            {car.brand} {car.model}
          </h1>

          <div className="mt-4">
            <span className="font-display font-bold text-4xl text-white">{formatPrice(car.price)}</span>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            {specs.map((s) => (
              <div key={s.label} className="glass rounded-xl p-3.5 border border-white/5">
                <div className="flex items-center gap-2 text-cool-400 text-xs mb-1">
                  <s.icon className="w-3.5 h-3.5" /> {s.label}
                </div>
                <p className="text-white font-medium text-sm truncate">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          {car.description && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white mb-2">Tavsif</h3>
              <p className="text-sm text-cool-300 leading-relaxed">{car.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Seller contact card */}
      <div className="mt-10 glass-strong rounded-2xl border border-white/10 p-6 max-w-2xl">
        <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-500" /> Aloqa
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-medium">{car.seller_name || 'Shaxsiy sotuvchi'}</p>
            {car.seller_phone && (
              <a href={`tel:${car.seller_phone}`} className="flex items-center gap-2 text-sm text-cool-300 hover:text-amber-500 transition-colors mt-1">
                <Phone className="w-4 h-4" /> {car.seller_phone}
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {car.seller_phone && (
              <a href={`tel:${car.seller_phone}`} className="btn-amber px-4 py-2.5 rounded-lg text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" /> Qo'ng'iroq
              </a>
            )}
            {car.seller_telegram && (
              <a
                href={`https://t.me/${car.seller_telegram.replace('@', '')}`}
                target="_blank" rel="noreferrer"
                className="btn-ghost px-4 py-2.5 rounded-lg text-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Telegram
              </a>
            )}
            {car.seller_instagram && (
              <a
                href={`https://instagram.com/${car.seller_instagram.replace('@', '')}`}
                target="_blank" rel="noreferrer"
                className="btn-ghost px-4 py-2.5 rounded-lg text-sm flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
