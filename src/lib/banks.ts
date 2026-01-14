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
    id: 'bank-of-taiwan',
    name: '台灣銀行',
    logo: Landmark,
    rate: 32.10,
    fees: '線上結匯免手續費',
    promotion: '首次線上結匯享0.5%匯率優惠',
    promotionValue: 8,
  },
  {
    id: 'fubon-bank',
    name: '富邦銀行',
    logo: Building2,
    rate: 32.20,
    fees: '每筆交易收取5元標準費用',
    promotion: '目前無活動',
    promotionValue: 3,
  },
  {
    id: 'cathay-united-bank',
    name: '國泰銀行',
    logo: Building,
    rate: 32.08,
    fees: '尊榮會員免手續費',
    promotion: '參加旅遊券抽獎',
    promotionValue: 9,
  },
  {
    id: 'esun-bank',
    name: '玉山銀行',
    logo: Home,
    rate: 32.25,
    fees: '免手續費',
    promotion: '目前無活動',
    promotionValue: 5,
  },
  {
    id: 'first-bank',
    name: '第一銀行',
    logo: Warehouse,
    rate: 32.18,
    fees: '1000元以下交易收取2元手續費',
    promotion: '單筆換匯滿5000元享10元現金回饋',
    promotionValue: 7,
  },
];
