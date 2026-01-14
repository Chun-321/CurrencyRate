"use client";

import { useState, useMemo, useContext } from "react";
import { banks, type Bank, currencies } from "@/lib/banks";
import { BankCard } from "@/components/app/bank-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft, Coins } from "lucide-react";
import { LanguageContext } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/app/language-switcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RankingPreference = "comprehensive" | "rate";
type Currency = "USD" | "JPY" | "EUR";

export default function Home() {
  const [rankingPreference, setRankingPreference] =
    useState<RankingPreference>("comprehensive");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");
  const { dictionary } = useContext(LanguageContext);

  const rankings = useMemo(() => {
    const getRate = (bank: Bank) => bank.rates[selectedCurrency] || 0;

    const rateSorted = [...banks].sort((a, b) => getRate(b) - getRate(a));

    const rates = banks.map(getRate);
    const promoValues = banks.map((b) => b.promotionValue);

    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    const minPromo = Math.min(...promoValues);
    const maxPromo = Math.max(...promoValues);

    const rateWeight = rankingPreference === "rate" ? 0.7 : 0.3;
    const promoWeight = 1 - rateWeight;

    const calculateScore = (bank: Bank) => {
      const normalizedRate =
        maxRate === minRate
          ? 1
          : (getRate(bank) - minRate) / (maxRate - minRate);
      const normalizedPromo =
        maxPromo === minPromo
          ? 1
          : (bank.promotionValue - minPromo) / (maxPromo - minPromo);
      return normalizedRate * rateWeight + normalizedPromo * promoWeight;
    };

    const comprehensiveAdvancedSorted = [...banks].sort(
      (a, b) => calculateScore(b) - calculateScore(a)
    );

    return {
      bestRate: rateSorted,
      comprehensive: comprehensiveAdvancedSorted,
    };
  }, [rankingPreference, selectedCurrency]);

  const preferenceText = useMemo(() => {
    if (rankingPreference === "rate") {
      return dictionary.preferenceTextRate;
    }
    return dictionary.preferenceTextComprehensive;
  }, [rankingPreference, dictionary]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-6xl">
        <header className="mb-8 text-center relative">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            {dictionary.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {dictionary.description}
          </p>
          <div className="absolute top-0 right-0 flex items-center space-x-2">
            <LanguageSwitcher />
          </div>
        </header>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{dictionary.rankingTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="comprehensive"
                onValueChange={(value) =>
                  setRankingPreference(value as RankingPreference)
                }
                className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comprehensive" id="r1" />
                  <Label htmlFor="r1" className="text-base">
                    {dictionary.prioritizePromotions}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rate" id="r2" />
                  <Label htmlFor="r2" className="text-base">
                    {dictionary.prioritizeExchangeRate}
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{dictionary.selectCurrency}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedCurrency}
                onValueChange={(value) => setSelectedCurrency(value as Currency)}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder={dictionary.selectCurrency} />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {dictionary.currencies[currency as keyof typeof dictionary.currencies]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <section>
            <Card className="h-full shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Coins className="text-primary" />
                  {dictionary.comprehensiveRanking}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {rankings.comprehensive.map((bank, index) => (
                    <BankCard
                      key={bank.id}
                      bank={bank}
                      rank={index + 1}
                      showExplanation={true}
                      rankingFactors={preferenceText}
                      currency={selectedCurrency}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card className="h-full shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ArrowRightLeft className="text-primary" />
                  {dictionary.bestRateRanking}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {rankings.bestRate.map((bank, index) => (
                    <BankCard
                      key={bank.id}
                      bank={bank}
                      rank={index + 1}
                      showExplanation={false}
                      currency={selectedCurrency}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
