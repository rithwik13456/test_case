import { Brain, Database, TrendingUp, Zap, ArrowRight, ExternalLink, Star } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const features = [
    {
      icon: Brain,
      title: 'Advanced NLP Analysis',
      description: 'State-of-the-art natural language processing for accurate sentiment detection'
    },
    {
      icon: Database,
      title: 'Data Warehousing',
      description: 'Star schema architecture with ETL pipeline for enterprise-grade data management'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Insights',
      description: 'Live analytics dashboard with trend analysis and predictive metrics'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Lightning-fast analysis with comprehensive quality assessment'
    }
  ];

  const benefits = [
    'Extract data from any URL automatically',
    'Industry-standard ETL pipeline',
    'Comprehensive data quality assessment',
    'Star schema data warehouse design',
    'Statistical analysis with advanced metrics',
    'Real-time visualization dashboards',
    'Export capabilities for reports',
    'Scalable architecture for enterprise use'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
            Enterprise-Grade
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Sentiment Analysis
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform unstructured web data into actionable business intelligence with our
            industry-level sentiment analysis platform. Features complete data warehousing,
            ETL pipelines, and real-time analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('analyze')}
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Start Analysis <ArrowRight size={20} />
            </button>
            <button
              onClick={() => setCurrentPage('warehouse')}
              className="bg-white text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-slate-300 hover:border-emerald-500 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              View Architecture <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Enterprise Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built with industry-standard data science practices and scalable architecture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-8 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50 hover:shadow-lg transition-all border border-slate-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl mb-4 shadow-md">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Complete Data Warehouse Solution
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our platform implements industry-standard data warehousing principles with
                star schema design, automated ETL pipelines, and comprehensive data quality
                assessment. Perfect for enterprises requiring scalable analytics infrastructure.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                What You Get
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Data Warehouse</h4>
                    <p className="text-sm text-slate-600">Fact and dimension tables with proper relationships</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">ETL Pipeline</h4>
                    <p className="text-sm text-slate-600">Automated extract, transform, and load processes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Quality Metrics</h4>
                    <p className="text-sm text-slate-600">Comprehensive data quality assessment and scoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Data?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Start analyzing sentiment from any URL and get comprehensive insights in minutes.
          </p>
          <button
            onClick={() => setCurrentPage('analyze')}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            Get Started Now <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
