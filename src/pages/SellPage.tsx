import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { useCars } from '../context/CarsContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../router';
import {
  CAR_COLORS, CAR_CONDITIONS, CAR_CONDITION_LABELS, POPULAR_BRANDS,
  type CarCondition, type CarInput,
} from '../lib/types';
import { useCurrency } from '../context/CurrencyContext';
import {
  Car as CarIcon, Upload, X, Loader2, Phone, Send, Instagram,
  Check, ChevronRight, Image as ImageIcon, AlertCircle,
} from 'lucide-react';

const STEPS = ['Avtomobil', 'Rasmlar', 'Narx', 'Aloqa'] as const;

function formatUzPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('998')) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  let out = '+998';
  if (digits.length > 0) out += ' ' + digits.slice(0, 2);
  if (digits.length > 2) out += ' ' + digits.slice(2, 5);
  if (digits.length > 5) out += ' ' + digits.slice(5, 7);
  if (digits.length > 7) out += ' ' + digits.slice(7, 9);
  return out;
}

export default function SellPage() {
  const { addCar } = useCars();
  const { user } = useAuth();
  const { navigate } = useRouter();
  const { format } = useCurrency();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    brand: '', model: '', year: 2022, mileage_km: 20000,
    condition: 'Excellent' as CarCondition, color: 'Qora',
    price: 50000, description: '',
    seller_name: user?.user_metadata?.full_name || '',
    seller_phone: '+998 ', seller_telegram: '', seller_instagram: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (k: keyof typeof form, v: string | number) => setForm((p) => ({ ...p, [k]: v }));

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).slice(0, 8 - images.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setImages((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const onDrop = (e: DragEvent) => { e.preventDefault(); setDragging(false); onFiles(e.dataTransfer.files); };

  const canProceed = () => {
    if (step === 0) return form.brand && form.model && form.year && form.mileage_km > 0;
    if (step === 1) return images.length > 0;
    if (step === 2) return form.price > 0;
    return true;
  };

  const submit = async () => {
    if (!user) { setError("E'lon berish uchun tizimga kiring."); return; }
    if (!form.seller_phone) { setError('Telefon raqami majburiy.'); return; }
    setSubmitting(true);
    setError(null);
    const input: CarInput = {
      user_id: user.id,
      brand: form.brand, model: form.model, year: Number(form.year),
      mileage_km: Number(form.mileage_km), condition: form.condition,
      color: form.color, price: Number(form.price),
      ai_price: null, ai_insights: null,
      images: images.length ? images : ['https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg'],
      description: form.description || `${form.year} ${form.brand} ${form.model}.`,
      seller_name: form.seller_name || user.user_metadata?.full_name || null,
      seller_phone: form.seller_phone,
      seller_telegram: form.seller_telegram || null,
      seller_instagram: form.seller_instagram || null,
    };
    const car = await addCar(input);
    setSubmitting(false);
    if (car) navigate(`/car?id=${car.id}`);
    else setError("Avtomobilni e'lon qilib bo'lmadi. Qaytadan urinib ko'ring.");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display font-bold text-4xl text-white">Avtomobilingizni e'lon qiling</h1>
        <p className="text-cool-400 mt-2">Minglab xaridlarga bir necha daqiqada yeting. Bir necha qadamgina.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                i < step ? 'bg-emerald-500 text-obsidian-900'
                : i === step ? 'bg-amber-500 text-obsidian-900 shadow-glow-sm'
                : 'bg-obsidian-700 text-cool-400 border border-white/10'
              }`}>
                {i < step ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-amber-500' : 'text-cool-400'}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 rounded transition-all duration-500 ${i < step ? 'bg-emerald-500' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="glass-strong rounded-2xl border border-white/10 p-6 sm:p-8">
        {/* Step 0: Vehicle */}
        {step === 0 && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cool-200 mb-2">Markasi va Modeli</label>
                <input
                  list="brands" value={form.brand}
                  onChange={(e) => update('brand', e.target.value)}
                  placeholder="masalan, BMW"
                  className="input-field"
                />
                <datalist id="brands">
                  {POPULAR_BRANDS.map((b) => <option key={b} value={b} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-cool-200 mb-2">Modeli</label>
                <input
                  value={form.model}
                  onChange={(e) => update('model', e.target.value)}
                  placeholder="masalan, M4 Competition"
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cool-200 mb-2">Ishlab chiqarilgan yili</label>
                <input
                  type="number" min={1990} max={2026}
                  value={form.year}
                  onChange={(e) => update('year', Number(e.target.value))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cool-200 mb-2">Yurgan masofasi (km)</label>
                <input
                  type="number" min={0}
                  value={form.mileage_km}
                  onChange={(e) => update('mileage_km', Number(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cool-200 mb-2">Holati (A'lo, Yaxshi, O'rtacha)</label>
              <div className="grid grid-cols-3 gap-2">
                {CAR_CONDITIONS.map((c) => (
                  <button
                    key={c} type="button"
                    onClick={() => update('condition', c)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                      form.condition === c
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                        : 'bg-obsidian-700/50 border-white/10 text-cool-300 hover:border-white/20'
                    }`}
                  >
                    {CAR_CONDITION_LABELS[c]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cool-200 mb-2">Rangi</label>
              <div className="flex flex-wrap gap-2">
                {CAR_COLORS.map((c) => (
                  <button
                    key={c.name} type="button"
                    onClick={() => update('color', c.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      form.color === c.name
                        ? 'bg-amber-500/15 border-amber-500/50 text-white'
                        : 'bg-obsidian-700/50 border-white/10 text-cool-300 hover:border-white/20'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ background: c.hex }} />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cool-200 mb-2">Tavsif (ixtiyoriy)</label>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                rows={3}
                placeholder="Avtomobilingizni nima o'ziga xos qilishini ayting..."
                className="input-field resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 1: Photos */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
                dragging ? 'border-amber-500 bg-amber-500/5' : 'border-white/15 hover:border-amber-500/40 hover:bg-white/5'
              }`}
            >
              <input
                ref={fileRef} type="file" accept="image/*" multiple
                className="hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onFiles(e.target.files)}
              />
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-white font-medium">Rasmlarni shu yerga olib keling</p>
              <p className="text-sm text-cool-400 mt-1">yoki tanlash uchun bosing — 8 tagacha rasm</p>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-obsidian-700">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-lg bg-obsidian-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-1.5 left-1.5 chip bg-amber-500/90 border-amber-400 text-obsidian-900 text-[10px]">
                        Muqova
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {images.length === 0 && (
              <div className="flex items-center gap-2 text-xs text-cool-400">
                <ImageIcon className="w-4 h-4" />
                Hali rasmlar yo'q. Davom etish uchun kamida bitta rasm qo'shing.
              </div>
            )}
          </div>
        )}

        {/* Step 2: Pricing */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-cool-200 mb-2">Savdolash narxi (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cool-400">$</span>
                <input
                  type="number" min={0}
                  value={form.price}
                  onChange={(e) => update('price', Number(e.target.value))}
                  className="input-field pl-8 text-lg font-semibold"
                />
              </div>
              <p className="text-xs text-cool-500 mt-2">
                Hozir {format(form.price)} narx belgilangan. Xaridlar bilan savdolashishingiz mumkin.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-cool-200 mb-2">Sotuvchi ismi</label>
              <input
                value={form.seller_name}
                onChange={(e) => update('seller_name', e.target.value)}
                placeholder="Ismingiz"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-cool-200 mb-2">Telefon raqami *</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-400" />
                <input
                  value={form.seller_phone}
                  onChange={(e) => update('seller_phone', formatUzPhone(e.target.value))}
                  onFocus={() => { if (!form.seller_phone) update('seller_phone', '+998 '); }}
                  placeholder="+998 90 123 45 67"
                  inputMode="numeric"
                  className="input-field pl-11"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cool-200 mb-2">Telegram foydalanuvchi nomi</label>
                <div className="relative">
                  <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-400" />
                  <input
                    value={form.seller_telegram}
                    onChange={(e) => update('seller_telegram', e.target.value)}
                    placeholder="@username"
                    className="input-field pl-11"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-cool-200 mb-2">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cool-400" />
                  <input
                    value={form.seller_instagram}
                    onChange={(e) => update('seller_instagram', e.target.value)}
                    placeholder="foydalanuvchi_nomi"
                    className="input-field pl-11"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="glass rounded-xl p-4 border border-white/5 mt-2">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <CarIcon className="w-4 h-4 text-amber-500" /> E'lon xulosasi
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div><span className="text-cool-400">Avtomobil:</span> <span className="text-white">{form.year} {form.brand} {form.model}</span></div>
                <div><span className="text-cool-400">Narxi:</span> <span className="text-amber-500 font-semibold">{format(form.price)}</span></div>
                <div><span className="text-cool-400">Yurgan:</span> <span className="text-white">{form.mileage_km.toLocaleString()} km</span></div>
                <div><span className="text-cool-400">Holati:</span> <span className="text-white">{CAR_CONDITION_LABELS[form.condition]}</span></div>
                <div><span className="text-cool-400">Rangi:</span> <span className="text-white">{form.color}</span></div>
                <div><span className="text-cool-400">Rasmlar:</span> <span className="text-white">{images.length}</span></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-5 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn-ghost px-5 py-2.5 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Orqaga
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => canProceed() && setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="btn-amber px-6 py-2.5 rounded-lg text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Davom etish <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={submitting}
              className="btn-amber px-6 py-2.5 rounded-lg text-sm flex items-center gap-2 disabled:opacity-60"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {submitting ? "Chop etilmoqda..." : "E'lonni nashr qilish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
