import { Landmark, Building2, Building, Home, Warehouse, type LucideIcon } from 'lucide-react';

export type Bank = {
  id: string;
  name: string;
  logo: LucideIcon;
  rate: number;
  fees: string;
  promotion: string;
  promotionValue: number; // A numeric value to help with scoring. Higher is better.
};

export const banks: Bank[] = [
  {
    id: 'bank-a',
    name: 'Bank A',
    logo: Landmark,
    rate: 32.15,
    fees: 'No fees for online exchange.',
    promotion: 'Get a 0.5% bonus on your first exchange.',
    promotionValue: 8,
  },
  {
    id: 'bank-b',
    name: 'Bank B',
    logo: Building2,
    rate: 32.25,
    fees: 'Standard fee of $5 per transaction.',
    promotion: 'None currently.',
    promotionValue: 3,
  },
  {
    id: 'bank-c',
    name: 'Bank C',
    logo: Building,
    rate: 32.05,
    fees: 'Fee waived for premium members.',
    promotion: 'Special lottery for a travel voucher.',
    promotionValue: 9,
  },
  {
    id: 'bank-d',
    name: 'Bank D',
    logo: Home,
    rate: 32.22,
    fees: 'No fees.',
    promotion: 'None currently.',
    promotionValue: 5,
  },
  {
    id: 'bank-e',
    name: 'Bank E',
    logo: Warehouse,
    rate: 32.18,
    fees: '$2 fee for amounts under $1000.',
    promotion: 'Cashback of $10 for exchanges over $5000.',
    promotionValue: 7,
  },
];
