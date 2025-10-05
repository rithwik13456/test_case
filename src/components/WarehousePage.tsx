import { Database, GitBranch, CheckCircle2, Activity, Table } from 'lucide-react';
import { ETLStage } from '../services/etlPipeline';

interface WarehousePageProps {
  etlStages?: ETLStage[];
}

export default function WarehousePage({ etlStages }: WarehousePageProps) {
  const dimensions = [
    { name: 'dim_sources', description: 'Source URLs and website metadata', columns: ['source_id', 'url', 'domain', 'source_name', 'is_active'] },
    { name: 'dim_time', description: 'Temporal dimension for date-based analysis', columns: ['time_id', 'full_date', 'day_of_week', 'month', 'quarter', 'year'] },
    { name: 'dim_categories', description: 'Content categorization hierarchy', columns: ['category_id', 'category_name', 'category_type', 'parent_category_id'] },
  ];

  const facts = [
    { name: 'fact_sentiment_analysis', description: 'Core sentiment metrics and aggregations', columns: ['analysis_id', 'source_id', 'overall_sentiment_score', 'positive_count', 'negative_count', 'mean_sentiment', 'std_deviation'] },
    { name: 'fact_comments', description: 'Individual comment/review data', columns: ['comment_id', 'analysis_id', 'comment_text', 'sentiment_label', 'polarity_score', 'confidence_score'] },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Data Warehouse Architecture</h1>
          <p className="text-lg text-slate-600">
            Enterprise-grade star schema design with comprehensive ETL pipeline and data quality controls
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Star Schema</h3>
            <p className="text-slate-600">
              Fact and dimension tables optimized for analytical queries and business intelligence
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <GitBranch className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">ETL Pipeline</h3>
            <p className="text-slate-600">
              Automated extract, transform, and load processes with real-time monitoring
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Data Quality</h3>
            <p className="text-slate-600">
              Comprehensive quality metrics including completeness, accuracy, and consistency
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Table className="text-emerald-600" />
            Dimension Tables
          </h2>
          <div className="space-y-4">
            {dimensions.map((dim, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{dim.name}</h3>
                <p className="text-slate-600 mb-3 text-sm">{dim.description}</p>
                <div className="flex flex-wrap gap-2">
                  {dim.columns.map((col, colIndex) => (
                    <span key={colIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Database className="text-emerald-600" />
            Fact Tables
          </h2>
          <div className="space-y-4">
            {facts.map((fact, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{fact.name}</h3>
                <p className="text-slate-600 mb-3 text-sm">{fact.description}</p>
                <div className="flex flex-wrap gap-2">
                  {fact.columns.map((col, colIndex) => (
                    <span key={colIndex} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {etlStages && etlStages.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="text-emerald-600" />
              ETL Pipeline Status
            </h2>
            <div className="space-y-3">
              {etlStages.map((stage, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    stage.status === 'completed'
                      ? 'bg-emerald-50 border-emerald-200'
                      : stage.status === 'running'
                      ? 'bg-blue-50 border-blue-200'
                      : stage.status === 'failed'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-semibold ${
                        stage.status === 'completed' ? 'text-emerald-900' :
                        stage.status === 'running' ? 'text-blue-900' :
                        stage.status === 'failed' ? 'text-red-900' :
                        'text-slate-700'
                      }`}>
                        {stage.name}
                      </h4>
                      {stage.recordsProcessed > 0 && (
                        <p className="text-sm text-slate-600 mt-1">
                          Processed {stage.recordsProcessed} records
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      stage.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      stage.status === 'running' ? 'bg-blue-100 text-blue-700' :
                      stage.status === 'failed' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {stage.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8 border border-emerald-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Star schema with fact and dimension tables',
              'Temporal, categorical, and source dimensions',
              'Automated data quality assessment',
              'Real-time ETL pipeline tracking',
              'Statistical analysis with advanced metrics',
              'Row-level security policies',
              'Optimized indexes for performance',
              'Scalable architecture for enterprise use',
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
