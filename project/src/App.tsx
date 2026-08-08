import { useState } from 'react';
import { RouterProvider, useRouter } from './router';
import { AuthProvider } from './context/AuthContext';
import { CarsProvider } from './context/CarsContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import SellPage from './pages/SellPage';
import CarDetailPage from './pages/CarDetailPage';

function Shell() {
  const { route } = useRouter();
  const [authOpen, setAuthOpen] = useState(false);

  let page;
  if (route.path === '/' || route.path === '') page = <HomePage />;
  else if (route.path === '/sell') page = <SellPage />;
  else if (route.path === '/car') page = <CarDetailPage />;
  else page = <HomePage />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenAuth={() => setAuthOpen(true)} />
      <main className="flex-1">{page}</main>
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <CarsProvider>
          <Shell />
        </CarsProvider>
      </AuthProvider>
    </RouterProvider>
  );
}
