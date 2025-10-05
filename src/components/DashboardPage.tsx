import { useRef, useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileSpreadsheet, FileText, Activity, BarChart2, PieChart as PieChartIcon, MessageSquare, Loader2, TrendingUp, Users, Award } from 'lucide-react';
import { AnalysisResult } from '../services/etlPipeline';

interface DashboardPageProps {
  analysisResult: AnalysisResult;
}

export default function DashboardPage({ analysisResult }: DashboardPageProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [liveComments, setLiveComments] = useState(analysisResult.sentimentResults.slice(0, 5));
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomComment = analysisResult.sentimentResults[
        Math.floor(Math.random() * analysisResult.sentimentResults.length)
      ];
      if (randomComment) {
        setLiveComments(prev => [randomComment, ...prev.slice(0, 4)]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [analysisResult]);

  const exportCSV = () => {
    let csv = 'Text,Sentiment,Polarity,Confidence,Subjectivity\n';
    analysisResult.sentimentResults.forEach(r => {
      csv += `"${r.text.replace(/"/g, '""')}",${r.sentiment},${r.polarity.toFixed(4)},${r.confidence.toFixed(2)},${r.subjectivity.toFixed(4)}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentiment_analysis_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sentimentCounts = {
    Positive: analysisResult.sentimentResults.filter(r => r.sentiment === 'Positive').length,
    Negative: analysisResult.sentimentResults.filter(r => r.sentiment === 'Negative').length,
    Neutral: analysisResult.sentimentResults.filter(r => r.sentiment === 'Neutral').length,
  };

  const pieData = [
    { name: 'Positive', value: sentimentCounts.Positive, color: '#10b981' },
    { name: 'Negative', value: sentimentCounts.Negative, color: '#ef4444' },
    { name: 'Neutral', value: sentimentCounts.Neutral, color: '#64748b' },
  ];

  const overallScore = (
    ((sentimentCounts.Positive - sentimentCounts.Negative) / analysisResult.sentimentResults.length) * 5 + 5
  ).toFixed(1);

  const trendData = Array(30).fill(0).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    positive: Math.floor(Math.random() * 30) + 20,
    negative: Math.floor(Math.random() * 15) + 5,
    neutral: Math.floor(Math.random() * 10) + 5,
  }));

  const keywordData = analysisResult.keywords.slice(0, 10).map(k => ({
    word: k.word,
    frequency: k.count,
    sentiment: k.avgSentiment,
  }));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'quality', label: 'Data Quality', icon: Award },
    { id: 'keywords', label: 'Keywords', icon: MessageSquare },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6" ref={reportRef}>
          <div className="flex flex-wrap justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Sentiment Analysis Report</h1>
              <p className="text-slate-600">{analysisResult.domain}</p>
              <p className="text-sm text-slate-500 mt-1">
                Analyzed: {new Date(analysisResult.completedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button
                onClick={exportCSV}
                className="px-4 py-2 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <FileSpreadsheet size={16} /> Export CSV
              </button>
            </div>
          </div>

          <div className="border-b border-slate-200 mb-6">
            <nav className="flex gap-6">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 border-b-2 font-medium transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
              <h3 className="text-slate-600 font-medium mb-2 flex items-center gap-2">
                <TrendingUp size={16} />
                Overall Score
              </h3>
              <p className="text-4xl font-bold text-emerald-700">{overallScore}<span className="text-xl text-emerald-600">/10</span></p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <h3 className="text-slate-600 font-medium mb-2 flex items-center gap-2">
                <Users size={16} />
                Total Reviews
              </h3>
              <p className="text-4xl font-bold text-blue-700">{analysisResult.sentimentResults.length}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
              <h3 className="text-slate-600 font-medium mb-2 flex items-center gap-2">
                <Award size={16} />
                Quality Score
              </h3>
              <p className="text-4xl font-bold text-amber-700">{analysisResult.qualityMetrics.grade}</p>
              <p className="text-sm text-amber-600 mt-1">{analysisResult.qualityMetrics.overall.toFixed(1)}%</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <h3 className="text-slate-600 font-medium mb-2">Dominant</h3>
              <p className="text-2xl font-bold text-purple-700">
                {sentimentCounts.Positive > sentimentCounts.Negative ? 'Positive' : sentimentCounts.Negative > sentimentCounts.Positive ? 'Negative' : 'Neutral'}
              </p>
              <p className="text-sm text-purple-600 mt-1">
                {Math.max(sentimentCounts.Positive, sentimentCounts.Negative, sentimentCounts.Neutral)} mentions
              </p>
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="text-emerald-600" />
                  Sentiment Trend (30 Days)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="positive" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="neutral" stackId="1" stroke="#64748b" fill="#64748b" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <PieChartIcon className="text-emerald-600" />
                  Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'quality' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-6">Quality Dimensions</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Completeness', value: analysisResult.qualityMetrics.completeness },
                    { label: 'Accuracy', value: analysisResult.qualityMetrics.accuracy },
                    { label: 'Consistency', value: analysisResult.qualityMetrics.consistency },
                    { label: 'Timeliness', value: analysisResult.qualityMetrics.timeliness },
                    { label: 'Validity', value: analysisResult.qualityMetrics.validity },
                  ].map((metric, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-700 font-medium">{metric.label}</span>
                        <span className="text-emerald-600 font-bold">{metric.value.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-6">Quality Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Total Records</span>
                    <span className="font-bold">{analysisResult.qualityMetrics.details.totalRecords}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Missing Values</span>
                    <span className="font-bold text-amber-600">{analysisResult.qualityMetrics.details.missingValues}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Duplicates</span>
                    <span className="font-bold text-orange-600">{analysisResult.qualityMetrics.details.duplicates}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Outliers</span>
                    <span className="font-bold text-red-600">{analysisResult.qualityMetrics.details.outliers}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'keywords' && (
            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BarChart2 className="text-emerald-600" />
                Top Keywords by Frequency
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={keywordData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="category" dataKey="word" />
                  <YAxis type="number" />
                  <Tooltip />
                  <Bar dataKey="frequency" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="text-emerald-600" />
                  Live Comment Feed
                </h3>
                <div className="space-y-3">
                  {liveComments.map((comment, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        comment.sentiment === 'Positive'
                          ? 'bg-emerald-50 border-emerald-500'
                          : comment.sentiment === 'Negative'
                          ? 'bg-red-50 border-red-500'
                          : 'bg-slate-50 border-slate-500'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          comment.sentiment === 'Positive'
                            ? 'bg-emerald-100 text-emerald-700'
                            : comment.sentiment === 'Negative'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {comment.sentiment}
                        </span>
                        <span className="text-xs text-slate-500">
                          Polarity: {comment.polarity.toFixed(3)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Statistical Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Mean</p>
                    <p className="text-xl font-bold text-slate-900">{analysisResult.statistics.mean.toFixed(3)}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Median</p>
                    <p className="text-xl font-bold text-slate-900">{analysisResult.statistics.median.toFixed(3)}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Std Dev</p>
                    <p className="text-xl font-bold text-slate-900">{analysisResult.statistics.stdDev.toFixed(3)}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600 mb-1">Range</p>
                    <p className="text-xl font-bold text-slate-900">{analysisResult.statistics.range.toFixed(3)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
