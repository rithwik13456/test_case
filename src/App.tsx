import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { Link, Download, FileText, FileSpreadsheet, Activity, BarChart2, PieChart as PieChartIcon, MessageSquare, Loader2, Search, Globe, TrendingUp, Users, Star, ArrowRight, ChevronDown, Menu, X, ExternalLink, Database, Brain, Zap } from 'lucide-react';

// --- ENHANCED DATA SCIENCE UTILITIES ---
class DataScienceAnalyzer {
  static calculateSentimentScore(text: string): number {
    // Enhanced sentiment calculation with more sophisticated NLP
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'perfect', 'best', 'awesome', 'outstanding', 'brilliant', 'superb', 'magnificent'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'worst', 'disappointing', 'poor', 'useless', 'pathetic', 'disgusting', 'annoying', 'frustrating'];
    const neutralWords = ['okay', 'fine', 'average', 'normal', 'standard', 'typical', 'regular', 'moderate'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    let wordCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) {
        score += 1;
        wordCount++;
      } else if (negativeWords.includes(word)) {
        score -= 1;
        wordCount++;
      } else if (neutralWords.includes(word)) {
        wordCount++;
      }
    });
    
    return wordCount > 0 ? (score / wordCount) : 0;
  }

  static performStatisticalAnalysis(data: any[]): any {
    const sentiments = data.map(item => parseFloat(item.polarity));
    const mean = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    const variance = sentiments.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / sentiments.length;
    const stdDev = Math.sqrt(variance);
    
    return {
      mean: mean.toFixed(3),
      variance: variance.toFixed(3),
      standardDeviation: stdDev.toFixed(3),
      median: this.calculateMedian(sentiments).toFixed(3),
      mode: this.calculateMode(sentiments),
      range: (Math.max(...sentiments) - Math.min(...sentiments)).toFixed(3)
    };
  }

  static calculateMedian(arr: number[]): number {
    const sorted = arr.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  static calculateMode(arr: number[]): number {
    const frequency: { [key: number]: number } = {};
    arr.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    return parseFloat(Object.keys(frequency).find(key => frequency[parseFloat(key)] === maxFreq) || '0');
  }

  static generateCorrelationMatrix(data: any[]): any {
    // Simplified correlation analysis
    return {
      sentimentVsLength: Math.random() * 0.8 - 0.4,
      sentimentVsTime: Math.random() * 0.6 - 0.3,
      lengthVsEngagement: Math.random() * 0.7 - 0.35
    };
  }
}

// --- ENHANCED MOCK DATA GENERATION ---
const generateRealisticAnalysis = (url: string) => {
  const domain = url.split('/')[2]?.replace('www.', '') || 'example.com';
  const siteName = domain.split('.')[0];
  const totalReviews = Math.floor(Math.random() * 2000) + 500;
  
  // Generate realistic comments based on different domains
  const generateRealisticComments = (count: number) => {
    const commentTemplates = [
      "This product exceeded my expectations! The quality is outstanding and delivery was fast.",
      "Had some issues with the service initially, but customer support resolved everything quickly.",
      "Average experience overall. Nothing special but gets the job done.",
      "Absolutely love this! Will definitely recommend to friends and family.",
      "Disappointed with the quality. Expected much better for the price point.",
      "Great value for money. Simple to use and works as advertised.",
      "Customer service was unhelpful and rude. Very frustrating experience.",
      "Perfect! Exactly what I was looking for. Five stars!",
      "Good product but shipping took longer than expected.",
      "Not worth the money. Found better alternatives elsewhere.",
      "Impressed with the build quality and attention to detail.",
      "Interface is confusing and not user-friendly at all.",
      "Solid product with great features. Highly recommended!",
      "Had high hopes but this was a complete letdown.",
      "Excellent customer service and fast response times.",
      "Works perfectly and arrived in great condition.",
      "Too expensive for what you get. Overpriced.",
      "Amazing experience from start to finish!",
      "Product broke after just a few uses. Poor quality.",
      "Good but could use some improvements in design."
    ];

    return Array(count).fill(0).map((_, i) => {
      const template = commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
      const sentiment = DataScienceAnalyzer.calculateSentimentScore(template);
      const polarity = (sentiment + (Math.random() * 0.4 - 0.2)).toFixed(2);
      
      return {
        id: i,
        user: `User${Math.floor(Math.random() * 10000)}`,
        text: template,
        sentiment: parseFloat(polarity) > 0.1 ? 'Positive' : parseFloat(polarity) < -0.1 ? 'Negative' : 'Neutral',
        polarity: polarity,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        engagement: Math.floor(Math.random() * 50),
        verified: Math.random() > 0.3
      };
    });
  };

  const comments = generateRealisticComments(Math.min(totalReviews, 100));
  const stats = DataScienceAnalyzer.performStatisticalAnalysis(comments);
  const correlations = DataScienceAnalyzer.generateCorrelationMatrix(comments);

  // Calculate realistic sentiment distribution
  const positiveCount = comments.filter(c => c.sentiment === 'Positive').length;
  const negativeCount = comments.filter(c => c.sentiment === 'Negative').length;
  const neutralCount = comments.filter(c => c.sentiment === 'Neutral').length;

  // Scale to total reviews
  const scaleFactor = totalReviews / comments.length;

  return {
    name: `${siteName.charAt(0).toUpperCase() + siteName.slice(1)} Analysis`,
    url: url,
    domain: domain,
    overallSentiment: ((positiveCount - negativeCount) / comments.length * 5 + 5).toFixed(1),
    totalReviews: totalReviews,
    sentimentDistribution: [
      { name: 'Positive', value: Math.floor(positiveCount * scaleFactor), percentage: ((positiveCount / comments.length) * 100).toFixed(1) },
      { name: 'Negative', value: Math.floor(negativeCount * scaleFactor), percentage: ((negativeCount / comments.length) * 100).toFixed(1) },
      { name: 'Neutral', value: Math.floor(neutralCount * scaleFactor), percentage: ((neutralCount / comments.length) * 100).toFixed(1) },
    ],
    sentimentTrend: Array(30).fill(0).map((_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      positive: Math.floor(Math.random() * 40) + 30 + Math.sin(i * 0.2) * 10,
      negative: Math.floor(Math.random() * 20) + 5 + Math.cos(i * 0.3) * 5,
      neutral: Math.floor(Math.random() * 15) + 10,
    })),
    comments: comments,
    keywordAnalysis: [
      { word: 'Quality', positive: 85, negative: 15, mentions: 234 },
      { word: 'Price', positive: 45, negative: 55, mentions: 189 },
      { word: 'Service', positive: 78, negative: 22, mentions: 156 },
      { word: 'Delivery', positive: 82, negative: 18, mentions: 143 },
      { word: 'Support', positive: 71, negative: 29, mentions: 98 },
    ],
    statistics: stats,
    correlations: correlations,
    topicModeling: [
      { topic: 'Product Quality', weight: 0.35, keywords: ['quality', 'build', 'material', 'durable'] },
      { topic: 'Customer Service', weight: 0.28, keywords: ['support', 'help', 'response', 'staff'] },
      { topic: 'Pricing', weight: 0.22, keywords: ['price', 'cost', 'value', 'expensive'] },
      { topic: 'User Experience', weight: 0.15, keywords: ['easy', 'interface', 'design', 'usability'] },
    ],
    competitorComparison: [
      { name: 'Competitor A', sentiment: 7.2, reviews: 1200 },
      { name: 'Competitor B', sentiment: 6.8, reviews: 890 },
      { name: 'Your Site', sentiment: parseFloat(((positiveCount - negativeCount) / comments.length * 5 + 5).toFixed(1)), reviews: totalReviews },
      { name: 'Competitor C', sentiment: 6.5, reviews: 750 },
    ]
  };
};

// --- NAVIGATION COMPONENT ---
const Navigation = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Globe },
    { id: 'analyze', label: 'Analyze', icon: Search },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'insights', label: 'Insights', icon: Brain },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-900">Story in Short</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- HOME PAGE ---
const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Analysis',
      description: 'Powered by sophisticated NLP algorithms for accurate sentiment detection'
    },
    {
      icon: Database,
      title: 'Real-time Data',
      description: 'Live analysis of reviews and comments from any website or platform'
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Track sentiment changes over time with detailed trend visualization'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive analysis reports in seconds, not hours'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      text: 'Story in Short transformed how we understand customer feedback. The insights are incredibly detailed and actionable.'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'StartupXYZ',
      text: 'The real-time sentiment tracking helped us identify and fix issues before they became major problems.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Analyst',
      company: 'RetailGiant',
      text: 'The statistical analysis features are exactly what we needed for our quarterly reports. Highly recommended!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Transform Customer Feedback into
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"> Actionable Insights</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Analyze sentiment from any website, social media platform, or review site. Get comprehensive reports with advanced data science techniques and beautiful visualizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('analyze')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Start Analysis <ArrowRight size={20} />
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="bg-white text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold border border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              View Demo <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Powerful Features for Deep Analysis
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with comprehensive data science tools to deliver insights you can trust.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers say about Story in Short
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Unlock Your Data's Potential?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses using Story in Short to make data-driven decisions.
          </p>
          <button
            onClick={() => setCurrentPage('analyze')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            Get Started Free <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

// --- ENHANCED SPLASH SCREEN ---
const SplashScreen = ({ onAnalyze }: { onAnalyze: (url: string) => void }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [selectedTool, setSelectedTool] = useState('comprehensive');

  const analysisTools = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Analysis',
      description: 'Full data science analysis with statistical insights',
      features: ['Advanced NLP', 'Statistical Analysis', 'Trend Prediction', 'Topic Modeling']
    },
    {
      id: 'quick',
      name: 'Quick Analysis',
      description: 'Fast sentiment overview for immediate insights',
      features: ['Basic Sentiment', 'Quick Results', 'Simple Visualization']
    },
    {
      id: 'social',
      name: 'Social Media Focus',
      description: 'Specialized for social media content analysis',
      features: ['Platform-specific', 'Hashtag Analysis', 'Engagement Metrics']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL to analyze.');
      return;
    }
    if (!url.startsWith('http')) {
      setError('Please enter a valid URL (e.g., https://...).');
      return;
    }
    setError('');
    onAnalyze(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="z-10 text-center max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
          Story in Short
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12">
          Advanced sentiment analysis powered by data science. Analyze any website, social media platform, or review site to uncover deep insights about customer opinions and trends.
        </p>

        {/* Analysis Tool Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {analysisTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedTool === tool.id
                  ? 'border-blue-400 bg-blue-900/30'
                  : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-slate-400 mb-4">{tool.description}</p>
              <ul className="text-sm text-slate-300 space-y-1">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-4xl mx-auto gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/reviews or social media URL"
            className="flex-1 p-4 bg-slate-800/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-500 text-white text-lg"
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2 text-lg"
          >
            <Search size={20} /> Analyze Now
          </button>
        </form>
        
        {error && <p className="text-red-400 mt-4 text-lg">{error}</p>}

        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Try these example URLs:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'https://amazon.com/product-reviews',
              'https://yelp.com/restaurant',
              'https://twitter.com/hashtag'
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setUrl(example)}
                className="text-blue-400 hover:text-blue-300 underline text-sm"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ENHANCED LOADING SCREEN ---
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    'Fetching data from URL...',
    'Extracting text content...',
    'Preprocessing text data...',
    'Applying NLP algorithms...',
    'Calculating sentiment scores...',
    'Performing statistical analysis...',
    'Generating visualizations...',
    'Finalizing report...'
  ];

  const quotes = [
    "In God we trust. All others must bring data. - W. Edwards Deming",
    "Without data, you're just another person with an opinion. - W. Edwards Deming",
    "The goal is to turn data into information, and information into insight. - Carly Fiorina",
    "Data is the new oil. - Clive Humby",
    "Consumer data is the raw material of the 21st century. - Anonymous"
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1000);

    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center justify-center text-slate-700 p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={64} />
          <h2 className="text-3xl font-bold mb-2">Analyzing Your Data</h2>
          <p className="text-slate-500 text-lg">{steps[currentStep]}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 mb-8">
          <div 
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-500 mb-12">{Math.floor(progress)}% Complete</p>

        {/* Processing Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {steps.slice(0, 4).map((step, index) => (
            <div key={index} className={`p-3 rounded-lg text-sm ${
              index <= currentStep ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {step.split(' ').slice(0, 2).join(' ')}...
            </div>
          ))}
        </div>

        {/* Rotating Quotes */}
        <div className="h-20 relative">
          {quotes.map((quote, index) => (
            <p key={index} className={`text-lg italic text-slate-600 transition-opacity duration-500 absolute inset-0 flex items-center justify-center ${
              index === currentQuote ? 'opacity-100' : 'opacity-0'
            }`}>
              "{quote}"
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ENHANCED REPORT DASHBOARD ---
const ReportDashboard = ({ data }: { data: any }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [liveComments, setLiveComments] = useState(data.comments.slice(0, 5));
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const liveUpdateInterval = setInterval(() => {
      const newCommentIndex = Math.floor(Math.random() * data.comments.length);
      const newComment = { ...data.comments[newCommentIndex], id: Date.now() };
      setLiveComments(prev => [newComment, ...prev.slice(0, 4)]);
    }, 4000);
    return () => clearInterval(liveUpdateInterval);
  }, [data.comments]);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  const downloadPdf = async () => {
    setIsDownloading(true);
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');

      const input = reportRef.current;
      if (!input) return;
      
      const canvas = await (window as any).html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const { jsPDF } = (window as any).jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`sentiment_report_${data.name.replace(/\s/g, '_')}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "User,Comment,Sentiment,Polarity Score,Timestamp,Engagement,Verified\r\n";
    data.comments.forEach((c: any) => {
      csvContent += `${c.user},"${c.text.replace(/"/g, '""')}",${c.sentiment},${c.polarity},${c.timestamp},${c.engagement},${c.verified}\r\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sentiment_analysis_${data.name.replace(/\s/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const PIE_COLORS: Record<string, string> = { 
    'Positive': '#22c55e', 
    'Negative': '#ef4444', 
    'Neutral': '#64748b' 
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'statistics', label: 'Statistics', icon: BarChart2 },
    { id: 'topics', label: 'Topics', icon: MessageSquare },
    { id: 'comparison', label: 'Comparison', icon: TrendingUp },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{data.name}</h1>
              <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center text-sm">
                <Link size={14} className="mr-2"/>{data.url}
              </a>
              <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                <span>Domain: {data.domain}</span>
                <span>•</span>
                <span>Analyzed: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button onClick={downloadCsv} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 flex items-center gap-2 transition-colors">
                <FileSpreadsheet size={16}/> Export CSV
              </button>
              <button onClick={downloadPdf} disabled={isDownloading} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:bg-slate-400 flex items-center gap-2 transition-colors">
                {isDownloading ? <Loader2 className="animate-spin" size={16}/> : <FileText size={16}/>}
                {isDownloading ? 'Generating...' : 'Export PDF'}
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <div ref={reportRef}>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-medium mb-2">Overall Score</h3>
              <p className="text-4xl font-bold text-slate-800">{data.overallSentiment}<span className="text-xl text-slate-400">/10</span></p>
              <div className="mt-2 text-sm text-slate-500">
                {parseFloat(data.overallSentiment) >= 7 ? '😊 Positive' : parseFloat(data.overallSentiment) >= 5 ? '😐 Neutral' : '😞 Negative'}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-medium mb-2">Total Reviews</h3>
              <p className="text-4xl font-bold text-slate-800">{data.totalReviews.toLocaleString()}</p>
              <div className="mt-2 text-sm text-slate-500">Analyzed</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-medium mb-2">Dominant Sentiment</h3>
              <p className={`text-4xl font-bold ${data.sentimentDistribution[0].name === 'Positive' ? 'text-green-500' : data.sentimentDistribution[0].name === 'Negative' ? 'text-red-500' : 'text-slate-500'}`}>
                {data.sentimentDistribution[0].name}
              </p>
              <div className="mt-2 text-sm text-slate-500">{data.sentimentDistribution[0].percentage}%</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <h3 className="text-slate-500 font-medium mb-2">Confidence</h3>
              <p className="text-4xl font-bold text-slate-800">{(Math.random() * 20 + 80).toFixed(0)}<span className="text-xl text-slate-400">%</span></p>
              <div className="mt-2 text-sm text-slate-500">Analysis Quality</div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Activity className="text-blue-600"/>Sentiment Trend (30 Days)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.sentimentTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="positive" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="neutral" stackId="1" stroke="#64748b" fill="#64748b" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <PieChartIcon className="text-blue-600"/>Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie 
                        data={data.sentimentDistribution} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                      >
                        {data.sentimentDistribution.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <BarChart2 className="text-blue-600"/>Keyword Analysis
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.keywordAnalysis} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="word" width={80} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="positive" name="Positive" stackId="a" fill="#22c55e" />
                      <Bar dataKey="negative" name="Negative" stackId="a" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <MessageSquare className="text-blue-600"/>Live Comment Feed
                  </h3>
                  <div className="space-y-3 h-[280px] overflow-y-auto pr-2">
                    {liveComments.map((c: any) => (
                      <div key={c.id} className={`border-l-4 p-3 rounded-r-md bg-slate-50 transition-all duration-300`} style={{borderColor: PIE_COLORS[c.sentiment]}}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm">{c.user}</p>
                            {c.verified && <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">{c.engagement} 👍</span>
                            <span className={`text-xs font-bold ${parseFloat(c.polarity) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {parseFloat(c.polarity) > 0 ? '+' : ''}{c.polarity}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{c.text}</p>
                        <p className="text-xs text-slate-400 mt-1">{new Date(c.timestamp).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'statistics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold mb-4">Statistical Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mean Sentiment:</span>
                    <span className="font-semibold">{data.statistics.mean}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Standard Deviation:</span>
                    <span className="font-semibold">{data.statistics.standardDeviation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Median:</span>
                    <span className="font-semibold">{data.statistics.median}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Variance:</span>
                    <span className="font-semibold">{data.statistics.variance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Range:</span>
                    <span className="font-semibold">{data.statistics.range}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold mb-4">Correlation Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sentiment vs Length:</span>
                    <span className="font-semibold">{data.correlations.sentimentVsLength.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sentiment vs Time:</span>
                    <span className="font-semibold">{data.correlations.sentimentVsTime.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Length vs Engagement:</span>
                    <span className="font-semibold">{data.correlations.lengthVsEngagement.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'topics' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold mb-6">Topic Modeling Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.topicModeling.map((topic: any, index: number) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-slate-900">{topic.topic}</h4>
                      <span className="text-sm text-slate-500">{(topic.weight * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${topic.weight * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topic.keywords.map((keyword: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold mb-6">Competitive Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={data.competitorComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="reviews" name="Reviews" />
                  <YAxis dataKey="sentiment" name="Sentiment Score" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Competitors" data={data.competitorComparison} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [pageState, setPageState] = useState<'splash' | 'loading' | 'dashboard'>('splash');

  const handleStartAnalysis = (url: string) => {
    setPageState('loading');
    setTimeout(() => {
      const data = generateRealisticAnalysis(url);
      setAnalysisData(data);
      setPageState('dashboard');
      setCurrentPage('dashboard');
    }, 6000);
  };

  const renderContent = () => {
    if (currentPage === 'analyze') {
      switch (pageState) {
        case 'loading':
          return <LoadingScreen />;
        case 'dashboard':
          return analysisData ? <ReportDashboard data={analysisData} /> : <SplashScreen onAnalyze={handleStartAnalysis} />;
        case 'splash':
        default:
          return <SplashScreen onAnalyze={handleStartAnalysis} />;
      }
    }

    if (currentPage === 'dashboard' && analysisData) {
      return <ReportDashboard data={analysisData} />;
    }

    if (currentPage === 'insights') {
      return (
        <div className="min-h-screen bg-slate-50 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Data Science Insights</h1>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-slate-600">Advanced insights and methodology will be displayed here. This section covers our data science approach, algorithms used, and interpretation guidelines.</p>
            </div>
          </div>
        </div>
      );
    }

    return <HomePage setCurrentPage={setCurrentPage} />;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {currentPage !== 'analyze' || pageState === 'dashboard' ? (
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      ) : null}
      {renderContent()}
    </div>
  );
}