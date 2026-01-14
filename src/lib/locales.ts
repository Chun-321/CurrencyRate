export const locales = {
  en: {
    title: 'Currency Compass',
    description: 'Your guide to smarter currency exchange.',
    rankingTitle: 'Adjust Your Preference',
    comprehensiveRanking: 'Comprehensive Ranking',
    bestRateRanking: 'Best Rate Ranking',
    prioritizePromotions: 'Prioritize Promotions',
    prioritizeExchangeRate: 'Prioritize Exchange Rate',
    preferenceTextComprehensive: 'You are prioritizing promotions and fees.',
    preferenceTextRate: 'You are prioritizing higher exchange rates.',
    selectCurrency: 'Select Currency',
    currencies: {
      USD: 'US Dollar (USD)',
      JPY: 'Japanese Yen (JPY)',
      EUR: 'Euro (EUR)',
    },
    bankCard: {
        usd: 'USD',
    },
    explanationDialog: {
        title: 'Why is {bankName} ranked here?',
        description: 'An AI-generated explanation based on your preferences.',
        whyThisRank: 'Why this rank?',
    },
    language: 'Language',
    english: 'English',
    traditionalChinese: '繁體中文',
  },
  'zh-TW': {
    title: '貨幣指南針',
    description: '您更明智的貨幣兌換指南。',
    rankingTitle: '調整您的偏好',
    comprehensiveRanking: '綜合排名',
    bestRateRanking: '最佳匯率排名',
    prioritizePromotions: '優先考慮促銷',
    prioritizeExchangeRate: '優先考慮匯率',
    preferenceTextComprehensive: '您正在優先考慮促銷和費用。',
    preferenceTextRate: '您正在優先考慮更高的匯率。',
    selectCurrency: '選擇貨幣',
    currencies: {
      USD: '美金 (USD)',
      JPY: '日圓 (JPY)',
      EUR: '歐元 (EUR)',
    },
    bankCard: {
        usd: '美金',
    },
    explanationDialog: {
        title: '為什麼 {bankName} 在這裡排名？',
        description: '根據您的偏好由 AI 生成的解釋。',
        whyThisRank: '為什麼是這個排名？',
    },
    language: '語言',
    english: 'English',
    traditionalChinese: '繁體中文',
  },
};

export type Dictionary = typeof locales['en'];
