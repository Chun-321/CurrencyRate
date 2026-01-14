'use server';

/**
 * @fileOverview Explains why a particular bank ranks higher in the comprehensive ranking based on the combination of factors.
 *
 * - explainRankingFactors - A function that handles the explanation of ranking factors.
 * - ExplainRankingFactorsInput - The input type for the explainRankingFactors function.
 * - ExplainRankingFactorsOutput - The return type for the explainRankingFactors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainRankingFactorsInputSchema = z.object({
  bankName: z.string().describe('The name of the bank.'),
  exchangeRate: z.number().describe('The USD buy rate of the bank.'),
  feeDescription: z.string().describe('Description of the fees associated with the bank.'),
  promotionDescription: z.string().describe('Description of the promotion offered by the bank.'),
  rankingFactors: z.string().describe('Ranking factors considered for comprehensive ranking.'),
});
export type ExplainRankingFactorsInput = z.infer<typeof ExplainRankingFactorsInputSchema>;

const ExplainRankingFactorsOutputSchema = z.object({
  explanation: z.string().describe('The explanation of why the bank ranks higher based on the ranking factors.'),
});
export type ExplainRankingFactorsOutput = z.infer<typeof ExplainRankingFactorsOutputSchema>;

export async function explainRankingFactors(input: ExplainRankingFactorsInput): Promise<ExplainRankingFactorsOutput> {
  return explainRankingFactorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainRankingFactorsPrompt',
  input: {schema: ExplainRankingFactorsInputSchema},
  output: {schema: ExplainRankingFactorsOutputSchema},
  prompt: `You are an expert financial advisor explaining bank rankings to users.

  Explain why {{bankName}} ranks higher in the comprehensive ranking based on the following factors:

  Exchange Rate: {{exchangeRate}}
  Fees: {{feeDescription}}
  Promotions: {{promotionDescription}}
  Ranking Factors: {{rankingFactors}}
  `,
});

const explainRankingFactorsFlow = ai.defineFlow(
  {
    name: 'explainRankingFactorsFlow',
    inputSchema: ExplainRankingFactorsInputSchema,
    outputSchema: ExplainRankingFactorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
