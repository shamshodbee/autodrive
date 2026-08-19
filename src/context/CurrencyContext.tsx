import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Currency = 'USD' | 'UZS';

// Taxminiy kurs (1 USD ~ shuncha so'm). Real vaqtda yangilanmaydi.
export const USD_TO_UZS = 12700;

interface CurrencyState {
  currency: Currency;
  toggleCurrency: () => void;
  format: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyState | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('autodrive_currency');
    return saved === 'UZS' ? 'UZS' : 'USD';
  });

  useEffect(() => {
    localStorage.setItem('autodrive_currency', currency);
  }, [currency]);

  const toggleCurrency = () => setCurrency((c) => (c === 'USD' ? 'UZS' : 'USD'));

  const format = (usdAmount: number) => {
    if (currency === 'UZS') {
      const sum = Math.round(usdAmount * USD_TO_UZS);
      return new Intl.NumberFormat('uz-UZ').format(sum) + " so'm";
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usdAmount);
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
