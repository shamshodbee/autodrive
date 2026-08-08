import { useState } from 'react';
import { X, Chrome, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleGoogle = async () => {
    setLoading(true);
    try { await signInWithGoogle(); } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-strong rounded-3xl border border-white/10 shadow-card w-full max-w-md p-8 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-cool-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-5 shadow-glow-sm">
            <Chrome className="w-7 h-7 text-obsidian-900" strokeWidth={2.5} />
          </div>
          <h2 className="font-display font-bold text-2xl text-white">AutoDrive'ga xush kelibsiz</h2>
          <p className="text-sm text-cool-400 mt-2">
            Avtomobilingizni e'lon qilish, sevimlilarni saqlash va AI narx tahlilini ochish uchun tizimga kiring.
          </p>
        </div>

        <div className="mt-7 space-y-3">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white hover:bg-cool-50 text-obsidian-900 font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
              </svg>
            )}
            {loading ? 'Ulanmoqda...' : 'Google orqali kirish'}
          </button>

          <button onClick={onClose} className="w-full btn-ghost px-4 py-3 rounded-xl text-sm">
            Ko'rishni davom ettirish
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-cool-500">
          <Shield className="w-3.5 h-3.5" />
          Supabase Auth tomonidan himoyalangan. Ma'lumotlaringiz hech kimga berilmaydi.
        </div>
      </div>
    </div>
  );
}
