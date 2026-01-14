"use client";

import { useContext } from "react";
import type { Bank } from "@/lib/banks";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExplanationDialog } from "./explanation-dialog";
import { TrendingUp, Tag } from "lucide-react";
import { LanguageContext } from "@/contexts/language-context";

type BankCardProps = {
  bank: Bank;
  rank: number;
  showExplanation: boolean;
  rankingFactors?: string;
};

export function BankCard({ bank, rank, showExplanation, rankingFactors }: BankCardProps) {
  const BankLogo = bank.logo;
  const { dictionary, language } = useContext(LanguageContext);

  const bankName = language === 'zh-TW' ? bank.name : bank.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:border-primary">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="text-2xl font-bold text-primary">{rank}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BankLogo className="h-6 w-6 text-muted-foreground" />
                <h3 className="text-lg font-semibold">{bank.name}</h3>
              </div>
              <Badge variant={rank <= 2 ? "default" : "secondary"} className="hidden sm:inline-flex bg-accent text-accent-foreground">
                {dictionary.bankCard.usd}: {bank.rate.toFixed(4)}
              </Badge>
            </div>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p className="sm:hidden">
                <Badge variant={rank <= 2 ? "default" : "secondary"} className="bg-accent text-accent-foreground">
                  {dictionary.bankCard.usd}: {bank.rate.toFixed(4)}
                </Badge>
              </p>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 mt-0.5 shrink-0" />
                <p>{bank.fees}</p>
              </div>
              <div className="flex items-start gap-2">
                <Tag className="h-4 w-4 mt-0.5 shrink-0" />
                <p>{bank.promotion}</p>
              </div>
            </div>
          </div>
          {showExplanation && rankingFactors && (
            <div className="self-center">
              <ExplanationDialog bank={bank} rankingFactors={rankingFactors} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
