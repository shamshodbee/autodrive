import { Link } from '../router';
import { Car as CarIcon, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-obsidian-950 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
                <CarIcon className="w-5 h-5 text-obsidian-900" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl">
                Auto<span className="text-amber-500">Drive</span>
              </span>
            </Link>
            <p className="text-sm text-cool-400 max-w-sm">
              Premium avtomobil bozori. AI tahliliga asoslangan narxlangan ajoyib avtomobillarni soting va sotib oling.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Bozor</h4>
            <ul className="space-y-2 text-sm text-cool-400">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Ko'rish</Link></li>
              <li><Link to="/sell" className="hover:text-amber-500 transition-colors">Avtomobil sotish</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Kompaniya</h4>
            <ul className="space-y-2 text-sm text-cool-400">
              <li><a href="#/" className="hover:text-amber-500 transition-colors">Biz haqimizda</a></li>
              <li><a href="#/" className="hover:text-amber-500 transition-colors">Bog'lanish</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cool-500">© 2026 AutoDrive. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4 text-cool-400">
            <a href="#/" className="hover:text-amber-500 transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#/" className="hover:text-amber-500 transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#/" className="hover:text-amber-500 transition-colors"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
