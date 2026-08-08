import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { Car, CarInput } from '../lib/types';

interface CarsState {
  cars: Car[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addCar: (input: CarInput) => Promise<Car | null>;
  getById: (id: string) => Car | undefined;
}

const CarsContext = createContext<CarsState | undefined>(undefined);

export function CarsProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setCars(data ?? []);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const addCar = async (input: CarInput): Promise<Car | null> => {
    const { data, error: err } = await supabase.from('cars').insert(input).select().single();
    if (err) { setError(err.message); return null; }
    if (data) setCars((prev) => [data as Car, ...prev]);
    return data as Car;
  };

  const getById = (id: string) => cars.find((c) => c.id === id);

  return (
    <CarsContext.Provider value={{ cars, loading, error, refresh, addCar, getById }}>
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  const ctx = useContext(CarsContext);
  if (!ctx) throw new Error('useCars must be used within CarsProvider');
  return ctx;
}
