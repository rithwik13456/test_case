import { useState } from 'react';
import { Search, Globe, Link } from 'lucide-react';

interface AnalyzePageProps {
  onAnalyze: (url: string) => void;
}

export default function AnalyzePage({ onAnalyze }: AnalyzePageProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const exampleUrls = [
    'https://www.amazon.com/product-reviews/B08N5WRWNW',
    'https://www.yelp.com/biz/restaurant-name',
    'https://www.tripadvisor.com/Hotel_Review',
    'https://www.reddit.com/r/technology/comments',
    'https://www.producthunt.com/posts/product-name',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }
    if (!url.startsWith('http')) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    setError('');
    onAnalyze(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="z-10 text-center max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <Globe className="w-20 h-20 mx-auto mb-6 text-emerald-400" />
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 mb-6">
            Analyze Any URL
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Enter any URL containing reviews, comments, or user feedback. Our advanced ETL pipeline
            will extract the content, analyze sentiment, and provide comprehensive insights with
            data quality assessment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/reviews or any URL with user content"
                className="w-full pl-12 pr-4 py-5 bg-slate-800/90 border-2 border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none placeholder-slate-500 text-white text-lg transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-5 px-10 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl"
            >
              <Search size={20} /> Analyze
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg max-w-4xl mx-auto">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 mb-4 text-sm">Try these example URLs:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleUrls.map((example, index) => (
              <button
                key={index}
                onClick={() => setUrl(example)}
                className="p-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-emerald-600 rounded-lg transition-all text-left group"
              >
                <p className="text-emerald-400 group-hover:text-emerald-300 text-sm truncate">
                  {example}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-slate-800/40 border border-slate-700 rounded-xl">
            <div className="text-emerald-400 font-bold text-3xl mb-2">01</div>
            <h3 className="font-semibold text-lg mb-2">Extract</h3>
            <p className="text-slate-400 text-sm">Fetch and parse content from any URL</p>
          </div>
          <div className="p-6 bg-slate-800/40 border border-slate-700 rounded-xl">
            <div className="text-emerald-400 font-bold text-3xl mb-2">02</div>
            <h3 className="font-semibold text-lg mb-2">Transform</h3>
            <p className="text-slate-400 text-sm">Clean data and analyze sentiment using NLP</p>
          </div>
          <div className="p-6 bg-slate-800/40 border border-slate-700 rounded-xl">
            <div className="text-emerald-400 font-bold text-3xl mb-2">03</div>
            <h3 className="font-semibold text-lg mb-2">Load</h3>
            <p className="text-slate-400 text-sm">Structure data and generate insights</p>
          </div>
        </div>
      </div>
    </div>
  );
}
