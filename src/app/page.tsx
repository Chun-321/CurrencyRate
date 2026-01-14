"use client";

import { useState, useMemo } from "react";
import { banks, type Bank } from "@/lib/banks";
import { BankCard } from "@/components/app/bank-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft, Coins } from "lucide-react";

type RankingPreference = "comprehensive" | "rate";

export default function Home() {
  const [rankingPreference, setRankingPreference] =
    useState<RankingPreference>("comprehensive");

  const rankings = useMemo(() => {
    const rateSorted = [...banks].sort((a, b) => b.rate - a.rate);

    const comprehensiveSorted = [...banks];

    if (rankingPreference === "comprehensive") {
      // In a real app, you might have more complex weighting
      comprehensiveSorted.sort(
        (a, b) =>
          b.rate * 0.5 +
          b.promotionValue * 0.5 -
          (a.rate * 0.5 + a.promotionValue * 0.5)
      );
    } else {
      // Prioritize rate
      comprehensiveSorted.sort(
        (a, b) =>
          b.rate * 0.8 +
          b.promotionValue * 0.2 -
          (a.rate * 0.8 + a.promotionValue * 0.2)
      );
    }
    
    // a more advanced comprehensive ranking logic
    const rates = banks.map(b => b.rate);
    const promoValues = banks.map(b => b.promotionValue);

    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    const minPromo = Math.min(...promoValues);
    const maxPromo = Math.max(...promoValues);

    const rateWeight = rankingPreference === 'rate' ? 0.7 : 0.3;
    const promoWeight = 1 - rateWeight;

    const calculateScore = (bank: Bank) => {
        const normalizedRate = maxRate === minRate ? 1 : (bank.rate - minRate) / (maxRate - minRate);
        const normalizedPromo = maxPromo === minPromo ? 1 : (bank.promotionValue - minPromo) / (maxPromo - minPromo);
        return (normalizedRate * rateWeight) + (normalizedPromo * promoWeight);
    }

    const comprehensiveAdvancedSorted = [...banks].sort((a, b) => calculateScore(b) - calculateScore(a));

    return {
      bestRate: rateSorted,
      comprehensive: comprehensiveAdvancedSorted,
    };
  }, [rankingPreference]);
  
  const preferenceText = useMemo(() => {
    if (rankingPreference === "rate") {
      return "You are prioritizing higher exchange rates.";
    }
    return "You are prioritizing promotions and fees.";
  }, [rankingPreference]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            Currency Compass
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your guide to smarter currency exchange.
          </p>
        </header>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-yellow-500">銀行匯率排行榜</CardTitle>
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
                  Prioritize Promotions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rate" id="r2" />
                <Label htmlFor="r2" className="text-base">
                  Prioritize Exchange Rate
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <section>
            <Card className="h-full shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Coins className="text-primary" />
                  Comprehensive Ranking
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
                  Best Rate Ranking
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
