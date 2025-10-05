import { useEffect } from 'react';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';
import { ETLStage } from '../services/etlPipeline';

interface LoadingPageProps {
  stages: ETLStage[];
}

export default function LoadingPage({ stages }: LoadingPageProps) {
  const completedStages = stages.filter(s => s.status === 'completed').length;
  const totalProgress = (completedStages / stages.length) * 100;

  const getStageIcon = (status: ETLStage['status']) => {
    if (status === 'completed') return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (status === 'running') return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    if (status === 'failed') return <Circle className="w-5 h-5 text-red-500" />;
    return <Circle className="w-5 h-5 text-slate-400" />;
  };

  const quotes = [
    "Extracting valuable insights from your data...",
    "Processing through our ETL pipeline...",
    "Applying advanced sentiment analysis algorithms...",
    "Ensuring data quality and consistency...",
    "Building your comprehensive report...",
  ];

  const currentQuote = quotes[Math.floor((completedStages / stages.length) * quotes.length)] || quotes[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <Loader2 className="w-16 h-16 text-emerald-600 mx-auto mb-6 animate-spin" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">Processing Your Data</h2>
          <p className="text-lg text-slate-600">{currentQuote}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-slate-700">Overall Progress</span>
              <span className="text-sm font-bold text-emerald-600">{Math.floor(totalProgress)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg transition-all ${
                  stage.status === 'running'
                    ? 'bg-blue-50 border border-blue-200'
                    : stage.status === 'completed'
                    ? 'bg-emerald-50 border border-emerald-200'
                    : stage.status === 'failed'
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getStageIcon(stage.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm font-semibold ${
                      stage.status === 'running' ? 'text-blue-900' :
                      stage.status === 'completed' ? 'text-emerald-900' :
                      stage.status === 'failed' ? 'text-red-900' :
                      'text-slate-600'
                    }`}>
                      {stage.name}
                    </h4>
                    {stage.recordsProcessed > 0 && (
                      <span className="text-xs text-slate-500 ml-2">
                        {stage.recordsProcessed} records
                      </span>
                    )}
                  </div>
                  {stage.status === 'running' && (
                    <div className="text-xs text-slate-500 mt-2">
                      Processing...
                    </div>
                  )}
                  {stage.status === 'completed' && stage.startTime && stage.endTime && (
                    <div className="text-xs text-emerald-700 mt-1">
                      Completed in {((stage.endTime - stage.startTime) / 1000).toFixed(1)}s
                    </div>
                  )}
                  {stage.errorMessage && (
                    <div className="text-xs text-red-600 mt-1">
                      Error: {stage.errorMessage}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-600">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>Running ETL Pipeline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
