import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AnalyzePage from './components/AnalyzePage';
import LoadingPage from './components/LoadingPage';
import DashboardPage from './components/DashboardPage';
import WarehousePage from './components/WarehousePage';
import { ETLPipeline, ETLStage, AnalysisResult } from './services/etlPipeline';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [etlStages, setEtlStages] = useState<ETLStage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartAnalysis = async (url: string) => {
    setIsLoading(true);
    setCurrentPage('analyze');

    const pipeline = new ETLPipeline((stages) => {
      setEtlStages(stages);
    });

    try {
      const result = await pipeline.execute(url);
      setAnalysisResult(result);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze URL. Please try again.');
      setCurrentPage('analyze');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPage = () => {
    if (isLoading) {
      return <LoadingPage stages={etlStages} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'analyze':
        return <AnalyzePage onAnalyze={handleStartAnalysis} />;
      case 'dashboard':
        return analysisResult ? (
          <DashboardPage analysisResult={analysisResult} />
        ) : (
          <AnalyzePage onAnalyze={handleStartAnalysis} />
        );
      case 'warehouse':
        return <WarehousePage etlStages={analysisResult?.etlStages} />;
      case 'insights':
        return (
          <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-slate-900 mb-6">Insights & Methodology</h1>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-3">Our Approach</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our sentiment analysis platform uses advanced natural language processing techniques
                    combined with industry-standard data warehousing practices. The system implements
                    a complete ETL pipeline that extracts data from any URL, transforms it through
                    sentiment analysis algorithms, and loads it into a structured data warehouse.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-3">Data Quality</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We assess data quality across five dimensions: completeness, accuracy, consistency,
                    timeliness, and validity. Each dimension is scored independently and combined to
                    provide an overall quality grade, ensuring you can trust the insights generated.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-3">Statistical Methods</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our platform calculates comprehensive statistical metrics including mean, median,
                    standard deviation, variance, skewness, and kurtosis. These metrics provide deep
                    insights into the distribution and characteristics of sentiment in your data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {!isLoading && <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      {renderPage()}
    </div>
  );
}
