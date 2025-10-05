import { URLExtractor, ExtractedContent } from './urlExtractor';
import { SentimentAnalyzer, SentimentResult } from './sentimentAnalyzer';

export interface ETLStage {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime?: number;
  endTime?: number;
  recordsProcessed: number;
  errorMessage?: string;
}

export interface DataQualityMetrics {
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  validity: number;
  overall: number;
  grade: string;
  details: {
    missingValues: number;
    duplicates: number;
    outliers: number;
    totalRecords: number;
  };
}

export interface AnalysisResult {
  sourceUrl: string;
  domain: string;
  extractedContent: ExtractedContent;
  sentimentResults: SentimentResult[];
  statistics: any;
  keywords: any[];
  qualityMetrics: DataQualityMetrics;
  etlStages: ETLStage[];
  completedAt: string;
}

export type ETLProgressCallback = (stages: ETLStage[]) => void;

export class ETLPipeline {
  private stages: ETLStage[] = [
    { name: 'Extract: Fetching URL data', status: 'pending', progress: 0, recordsProcessed: 0 },
    { name: 'Extract: Parsing HTML content', status: 'pending', progress: 0, recordsProcessed: 0 },
    { name: 'Transform: Cleaning text data', status: 'pending', progress: 0, recordsProcessed: 0 },
    { name: 'Transform: Sentiment analysis', status: 'pending', progress: 0, recordsProcessed: 0 },
    { name: 'Transform: Statistical analysis', status: 'pending', progress: 0, recordsProcessed: 0 },
    { name: 'Load: Quality assessment', status: 'pending', progress: 0, recordsProcessed: 0 },
    { name: 'Load: Structuring warehouse data', status: 'pending', progress: 0, recordsProcessed: 0 },
    { name: 'Complete: Finalizing report', status: 'pending', progress: 0, recordsProcessed: 0 },
  ];

  private progressCallback?: ETLProgressCallback;

  constructor(onProgress?: ETLProgressCallback) {
    this.progressCallback = onProgress;
  }

  async execute(url: string): Promise<AnalysisResult> {
    await this.runStage(0, async () => {
      await this.simulateDelay(800);
      return URLExtractor.extractContent(url);
    });

    const extractedContent = await this.runStage(1, async (prevResult) => {
      await this.simulateDelay(600);
      return prevResult as ExtractedContent;
    });

    const cleanedReviews = await this.runStage(2, async () => {
      await this.simulateDelay(500);
      return extractedContent.reviews.map(r => r.text).filter(t => t.length > 10);
    });

    const sentimentResults = await this.runStage(3, async () => {
      await this.simulateDelay(1000);
      return cleanedReviews.map(text => SentimentAnalyzer.analyzeSentiment(text));
    });

    const statistics = await this.runStage(4, async () => {
      await this.simulateDelay(400);
      const polarities = sentimentResults.map(r => r.polarity);
      return SentimentAnalyzer.calculateStatistics(polarities);
    });

    const qualityMetrics = await this.runStage(5, async () => {
      await this.simulateDelay(500);
      return this.assessDataQuality(sentimentResults, extractedContent);
    });

    const keywords = await this.runStage(6, async () => {
      await this.simulateDelay(600);
      return SentimentAnalyzer.extractKeywords(cleanedReviews, 15);
    });

    await this.runStage(7, async () => {
      await this.simulateDelay(300);
      return true;
    });

    const domain = new URL(url).hostname;

    return {
      sourceUrl: url,
      domain,
      extractedContent,
      sentimentResults,
      statistics,
      keywords,
      qualityMetrics,
      etlStages: this.stages,
      completedAt: new Date().toISOString(),
    };
  }

  private async runStage<T>(stageIndex: number, task: (prevResult?: any) => Promise<T>): Promise<T> {
    const stage = this.stages[stageIndex];
    stage.status = 'running';
    stage.startTime = Date.now();
    this.notifyProgress();

    try {
      const result = await task();

      stage.status = 'completed';
      stage.progress = 100;
      stage.endTime = Date.now();
      stage.recordsProcessed = Array.isArray(result) ? result.length : 1;
      this.notifyProgress();

      return result;
    } catch (error) {
      stage.status = 'failed';
      stage.errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.notifyProgress();
      throw error;
    }
  }

  private assessDataQuality(sentimentResults: SentimentResult[], content: ExtractedContent): DataQualityMetrics {
    const totalRecords = sentimentResults.length;
    const missingValues = sentimentResults.filter(r => !r.text || r.text.trim().length === 0).length;

    const texts = new Set(sentimentResults.map(r => r.text));
    const duplicates = totalRecords - texts.size;

    const polarities = sentimentResults.map(r => r.polarity);
    const mean = polarities.reduce((a, b) => a + b, 0) / polarities.length;
    const stdDev = Math.sqrt(polarities.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / polarities.length);
    const outliers = polarities.filter(p => Math.abs(p - mean) > 2 * stdDev).length;

    const completeness = ((totalRecords - missingValues) / totalRecords) * 100;
    const accuracy = Math.min(100, sentimentResults.reduce((sum, r) => sum + r.confidence, 0) / totalRecords);
    const consistency = ((totalRecords - outliers) / totalRecords) * 100;
    const timeliness = 95;
    const validity = ((totalRecords - duplicates) / totalRecords) * 100;

    const overall = (completeness + accuracy + consistency + timeliness + validity) / 5;

    let grade: string;
    if (overall >= 90) grade = 'A';
    else if (overall >= 80) grade = 'B';
    else if (overall >= 70) grade = 'C';
    else if (overall >= 60) grade = 'D';
    else grade = 'F';

    return {
      completeness,
      accuracy,
      consistency,
      timeliness,
      validity,
      overall,
      grade,
      details: {
        missingValues,
        duplicates,
        outliers,
        totalRecords,
      },
    };
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private notifyProgress(): void {
    if (this.progressCallback) {
      this.progressCallback([...this.stages]);
    }
  }
}
