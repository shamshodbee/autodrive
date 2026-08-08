import { useState } from 'react';
import { Link, useRouter } from '../router';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Car as CarIcon, LayoutGrid, PlusCircle, User, LogOut } from 'lucide-react';

export default function Header({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { route, navigate } = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (p: string) => route.path === p || (p !== '/' && route.path.startsWith(p));

  const nav = [
    { to: '/', label: 'Bozor', icon: LayoutGrid },
    { to: '/sell', label: "E'lon berish", icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow">
              <CarIcon className="w-5 h-5 text-obsidian-900" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Auto<span className="text-amber-500">Drive</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(n.to) ? 'text-amber-500 bg-amber-500/10' : 'text-cool-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <n.icon className="w-4 h-4" />
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-amber-500/40 transition-all"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="" className="w-7 h-7 rounded-full" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-amber-500" />
                    </div>
                  )}
                  <span className="text-sm text-cool-100 max-w-[120px] truncate">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </button>
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 glass-strong rounded-xl border border-white/10 shadow-card z-20 overflow-hidden animate-scale-in origin-top-right">
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-xs text-cool-400">Tizimga kirilgan</p>
                        <p className="text-sm text-white truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { setMenuOpen(false); signOut(); navigate('/'); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-cool-200 hover:text-amber-500 hover:bg-white/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Chiqish
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={onOpenAuth} className="btn-amber px-5 py-2 rounded-lg text-sm">
                Tizimga kirish
              </button>
            )}
          </div>

          <button className="md:hidden text-cool-200" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-white/5 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive(n.to) ? 'text-amber-500 bg-amber-500/10' : 'text-cool-200 hover:bg-white/5'
                }`}
              >
                <n.icon className="w-4 h-4" />
                {n.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/5">
              {user ? (
                <button onClick={() => { setOpen(false); signOut(); }} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-cool-200">
                  <LogOut className="w-4 h-4" /> Chiqish
                </button>
              ) : (
                <button onClick={() => { setOpen(false); onOpenAuth(); }} className="w-full btn-amber px-5 py-2.5 rounded-lg text-sm">
                  Tizimga kirish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
