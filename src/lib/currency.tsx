import { createContext, useContext, useState, type ReactNode } from 'react';

export type CurrencyCode = 'CHF' | 'GBP' | 'EUR' | 'USD';

export const CURRENCY_ORDER: CurrencyCode[] = ['CHF', 'GBP', 'EUR', 'USD'];

export const CURRENCIES: Record<CurrencyCode, { symbol: string; rate: number; name: string }> = {
  CHF: { symbol: 'Fr.', rate: 1.0, name: 'Swiss Franc' },
  GBP: { symbol: '£', rate: 0.93, name: 'British Pound' },
  EUR: { symbol: '€', rate: 1.17, name: 'Euro' },
  USD: { symbol: '$', rate: 1.09, name: 'US Dollar' },
};

interface CurrencyContextValue {
  code: CurrencyCode;
  setCode: (c: CurrencyCode) => void;
  fmt: (chf: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<CurrencyCode>('CHF');

  const fmt = (chf: number): string => {
    const value = chf * CURRENCIES[code].rate;
    const rounded = Math.round(value);
    return `${CURRENCIES[code].symbol} ${rounded.toLocaleString('en-GB')}`;
  };

  return <CurrencyContext.Provider value={{ code, setCode, fmt }}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
