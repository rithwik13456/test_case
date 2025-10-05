# SentimentPro - Enterprise Sentiment Analysis Platform

An industry-level sentiment analysis web application with complete data warehousing architecture, ETL pipeline, and real-time insights dashboard.

## Features

### Data Extraction & Processing
- **Real URL Data Extraction**: Automatically fetches and parses content from any URL
- **Intelligent Content Parsing**: Extracts reviews, comments, and user feedback from HTML
- **Fallback Data Generation**: Provides realistic sample data when direct extraction is limited

### ETL Pipeline
- **Extract Stage**: URL fetching and HTML parsing with progress tracking
- **Transform Stage**:
  - Text cleaning and preprocessing
  - Advanced NLP-based sentiment analysis
  - Statistical analysis with comprehensive metrics
- **Load Stage**:
  - Data quality assessment
  - Structured data warehousing
  - Real-time progress monitoring

### Data Warehousing
- **Star Schema Design**:
  - Dimension tables: sources, time, categories
  - Fact tables: sentiment_analysis, comments
  - Aggregation tables: daily_sentiment, keyword_analysis
- **Data Quality Metrics**:
  - Completeness scoring
  - Accuracy assessment
  - Consistency validation
  - Timeliness tracking
  - Validity checks
  - Overall quality grade (A-F)

### Advanced Analytics
- **Sentiment Analysis**:
  - Polarity scoring (-1 to +1)
  - Confidence levels
  - Subjectivity measurement
  - Three-class classification (Positive/Negative/Neutral)
- **Statistical Metrics**:
  - Mean, median, mode
  - Standard deviation, variance
  - Range, skewness, kurtosis
- **Keyword Extraction**:
  - Top keywords by frequency
  - Sentiment association per keyword
  - Stopword filtering

### Visualizations
- **Trend Analysis**: 30-day sentiment trends with area charts
- **Distribution Charts**: Pie charts showing sentiment breakdown
- **Keyword Analysis**: Bar charts of top keywords
- **Live Feed**: Real-time comment stream with sentiment indicators
- **Quality Dashboard**: Comprehensive data quality metrics

### Export & Reporting
- **CSV Export**: Download complete analysis data
- **Multiple Tabs**: Overview, Quality, Keywords, Trends
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend Services
- **URL Extraction Service**: Web scraping and content parsing
- **Sentiment Analyzer**: NLP-based sentiment analysis
- **ETL Pipeline**: Automated data processing workflow
- **Supabase Client**: Database connectivity (configured)

### Data Science
- Custom sentiment analysis algorithms
- Statistical analysis engine
- Keyword extraction with TF-IDF concepts
- Data quality assessment framework

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Main navigation bar
│   ├── HomePage.tsx          # Landing page
│   ├── AnalyzePage.tsx       # URL input page
│   ├── LoadingPage.tsx       # ETL progress display
│   ├── DashboardPage.tsx     # Main analytics dashboard
│   └── WarehousePage.tsx     # Data warehouse architecture view
├── services/
│   ├── urlExtractor.ts       # URL content extraction
│   ├── sentimentAnalyzer.ts  # Sentiment analysis engine
│   └── etlPipeline.ts        # ETL orchestration
└── lib/
    └── supabaseClient.ts     # Database client
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Usage

1. **Home Page**: Learn about the platform features
2. **Analyze**: Enter any URL containing reviews or user feedback
3. **Processing**: Watch the ETL pipeline extract, transform, and load data
4. **Dashboard**: View comprehensive sentiment analysis results
5. **Data Warehouse**: Explore the underlying data architecture
6. **Insights**: Learn about the methodology and approach

## Data Warehouse Schema

### Dimension Tables
- **dim_sources**: Source URLs and metadata
- **dim_time**: Temporal dimension for date analysis
- **dim_categories**: Content categorization

### Fact Tables
- **fact_sentiment_analysis**: Core sentiment metrics
- **fact_comments**: Individual comment/review data

### Quality Tables
- **data_quality_metrics**: Comprehensive quality scores
- **etl_pipeline_status**: Real-time pipeline tracking

## Key Algorithms

### Sentiment Analysis
- Word-based polarity scoring
- Negation handling
- Intensifier detection
- Confidence calculation

### Data Quality Assessment
- Missing value detection
- Duplicate identification
- Outlier detection
- Multi-dimensional scoring

### Statistical Analysis
- Central tendency measures
- Dispersion analysis
- Distribution shape metrics

## Architecture Principles

- **Separation of Concerns**: Modular component and service architecture
- **Scalability**: Star schema design for efficient queries
- **Data Quality**: Comprehensive validation and assessment
- **User Experience**: Real-time feedback and intuitive navigation
- **Performance**: Optimized rendering and data processing
- **Maintainability**: Clear code organization and documentation
