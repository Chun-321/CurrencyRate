"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Bank } from "@/lib/banks";
import { Sparkles } from "lucide-react";
import { explainRankingFactors } from "@/ai/flows/explain-ranking-factors";
import { useToast } from "@/hooks/use-toast";

type ExplanationDialogProps = {
  bank: Bank;
  rankingFactors: string;
};

export function ExplanationDialog({ bank, rankingFactors }: ExplanationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (open && !explanation) {
      setIsLoading(true);
      try {
        const result = await explainRankingFactors({
          bankName: bank.name,
          exchangeRate: bank.rate,
          feeDescription: bank.fees,
          promotionDescription: bank.promotion,
          rankingFactors: rankingFactors,
        });
        setExplanation(result.explanation);
      } catch (error) {
        console.error("Failed to get explanation:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not generate an explanation at this time.",
        });
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="sr-only">Why this rank?</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Why is {bank.name} ranked here?</DialogTitle>
          <DialogDescription>
            An AI-generated explanation based on your preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </>
          ) : (
            <p className="text-sm text-foreground leading-relaxed">{explanation}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
