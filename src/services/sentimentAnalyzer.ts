export interface SentimentResult {
  text: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  polarity: number;
  confidence: number;
  subjectivity: number;
}

export interface StatisticalMetrics {
  mean: number;
  median: number;
  mode: number;
  stdDev: number;
  variance: number;
  range: number;
  skewness: number;
  kurtosis: number;
}

export class SentimentAnalyzer {
  private static readonly POSITIVE_WORDS = [
    'excellent', 'amazing', 'great', 'wonderful', 'fantastic', 'awesome', 'outstanding',
    'superb', 'brilliant', 'perfect', 'love', 'best', 'incredible', 'impressive',
    'beautiful', 'good', 'nice', 'happy', 'delighted', 'satisfied', 'recommend',
    'quality', 'reliable', 'efficient', 'helpful', 'professional', 'friendly'
  ];

  private static readonly NEGATIVE_WORDS = [
    'terrible', 'awful', 'horrible', 'bad', 'worst', 'disappointing', 'poor',
    'useless', 'pathetic', 'disgusting', 'hate', 'annoying', 'frustrating',
    'slow', 'broken', 'defective', 'waste', 'scam', 'fraud', 'cheap', 'flawed',
    'difficult', 'confusing', 'unreliable', 'unprofessional', 'rude'
  ];

  private static readonly INTENSIFIERS = ['very', 'extremely', 'absolutely', 'totally', 'completely'];
  private static readonly NEGATIONS = ['not', 'no', 'never', 'neither', 'nobody', 'nothing', "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "couldn't"];

  static analyzeSentiment(text: string): SentimentResult {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    let score = 0;
    let wordCount = 0;
    let subjectivityScore = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const prevWord = i > 0 ? words[i - 1] : '';
      const isNegated = this.NEGATIONS.includes(prevWord);
      const isIntensified = this.INTENSIFIERS.includes(prevWord);
      const multiplier = isIntensified ? 1.5 : 1;

      if (this.POSITIVE_WORDS.includes(word)) {
        score += (isNegated ? -1 : 1) * multiplier;
        wordCount++;
        subjectivityScore += 0.5;
      } else if (this.NEGATIVE_WORDS.includes(word)) {
        score += (isNegated ? 1 : -1) * multiplier;
        wordCount++;
        subjectivityScore += 0.5;
      }
    }

    const normalizedScore = wordCount > 0 ? score / wordCount : 0;
    const polarity = Math.max(-1, Math.min(1, normalizedScore));
    const confidence = Math.min(100, wordCount * 10);
    const subjectivity = Math.min(1, subjectivityScore / words.length);

    let sentiment: 'Positive' | 'Negative' | 'Neutral';
    if (polarity > 0.1) sentiment = 'Positive';
    else if (polarity < -0.1) sentiment = 'Negative';
    else sentiment = 'Neutral';

    return {
      text,
      sentiment,
      polarity,
      confidence,
      subjectivity,
    };
  }

  static calculateStatistics(polarities: number[]): StatisticalMetrics {
    const sorted = [...polarities].sort((a, b) => a - b);
    const n = sorted.length;

    const mean = sorted.reduce((a, b) => a + b, 0) / n;

    const median = n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

    const frequency = new Map<number, number>();
    sorted.forEach(val => frequency.set(val, (frequency.get(val) || 0) + 1));
    const mode = Array.from(frequency.entries()).reduce((a, b) => b[1] > a[1] ? b : a)[0];

    const variance = sorted.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const range = sorted[n - 1] - sorted[0];

    const skewness = sorted.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 3), 0) / n;
    const kurtosis = sorted.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 4), 0) / n - 3;

    return {
      mean,
      median,
      mode,
      stdDev,
      variance,
      range,
      skewness,
      kurtosis,
    };
  }

  static extractKeywords(texts: string[], topN: number = 10): Array<{word: string; count: number; avgSentiment: number}> {
    const wordFrequency = new Map<string, {count: number; sentiments: number[]}>();
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how']);

    texts.forEach(text => {
      const sentiment = this.analyzeSentiment(text);
      const words = text.toLowerCase().match(/\b\w{4,}\b/g) || [];

      words.forEach(word => {
        if (!stopWords.has(word)) {
          const entry = wordFrequency.get(word) || {count: 0, sentiments: []};
          entry.count++;
          entry.sentiments.push(sentiment.polarity);
          wordFrequency.set(word, entry);
        }
      });
    });

    return Array.from(wordFrequency.entries())
      .map(([word, data]) => ({
        word,
        count: data.count,
        avgSentiment: data.sentiments.reduce((a, b) => a + b, 0) / data.sentiments.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, topN);
  }
}
