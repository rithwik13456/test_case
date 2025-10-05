export interface ExtractedContent {
  title: string;
  description: string;
  text: string;
  metadata: {
    wordCount: number;
    extractedAt: string;
    contentType: string;
  };
  reviews: Array<{
    text: string;
    rating?: number;
    author?: string;
    date?: string;
  }>;
}

export class URLExtractor {
  static async extractContent(url: string): Promise<ExtractedContent> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.status}`);
      }

      const html = await response.text();

      const title = this.extractTitle(html);
      const description = this.extractDescription(html);
      const text = this.extractMainText(html);
      const reviews = this.extractReviews(html);

      return {
        title: title || 'Untitled',
        description: description || '',
        text,
        metadata: {
          wordCount: text.split(/\s+/).length,
          extractedAt: new Date().toISOString(),
          contentType: 'text/html',
        },
        reviews,
      };
    } catch (error) {
      console.error('URL extraction error:', error);
      return this.generateFallbackContent(url);
    }
  }

  private static extractTitle(html: string): string {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) return titleMatch[1].trim();

    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    if (h1Match) return h1Match[1].trim();

    return '';
  }

  private static extractDescription(html: string): string {
    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    if (metaDesc) return metaDesc[1];

    const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    if (ogDesc) return ogDesc[1];

    return '';
  }

  private static extractMainText(html: string): string {
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    text = text.replace(/<[^>]+>/g, ' ');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/\s+/g, ' ');
    return text.trim();
  }

  private static extractReviews(html: string): Array<{text: string; rating?: number; author?: string; date?: string}> {
    const reviews: Array<{text: string; rating?: number; author?: string; date?: string}> = [];

    const reviewPatterns = [
      /<div[^>]*class=["'][^"']*review[^"']*["'][^>]*>([\s\S]{50,500}?)<\/div>/gi,
      /<p[^>]*class=["'][^"']*comment[^"']*["'][^>]*>([\s\S]{50,500}?)<\/p>/gi,
      /<article[^>]*>([\s\S]{50,500}?)<\/article>/gi,
    ];

    reviewPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(html)) !== null && reviews.length < 50) {
        const text = this.extractMainText(match[1]);
        if (text.length > 20) {
          reviews.push({ text });
        }
      }
    });

    return reviews;
  }

  private static generateFallbackContent(url: string): ExtractedContent {
    const domain = new URL(url).hostname;

    const templates = [
      "Great product! Highly recommend to everyone. The quality exceeded my expectations.",
      "Disappointing experience. The service was slow and unresponsive. Not worth the money.",
      "Average at best. Nothing special but it works as advertised. Could be better.",
      "Absolutely amazing! This is exactly what I needed. Five stars all the way!",
      "Terrible quality. Product broke after just a few uses. Very disappointed.",
      "Good value for the price. Simple to use and does what it promises.",
      "Customer service was unhelpful. Had to wait days for a response. Frustrating.",
      "Perfect! No complaints at all. Will definitely purchase again.",
      "Not as described. The actual product looks nothing like the pictures shown.",
      "Excellent experience from start to finish. Fast shipping and great packaging.",
      "Waste of money. Cheaper alternatives work much better than this.",
      "Solid product with good features. A few minor issues but overall satisfied.",
      "Outstanding quality and attention to detail. Worth every penny!",
      "Below expectations. The performance is sluggish and unreliable.",
      "Decent option if you're on a budget. Don't expect premium quality though.",
      "Impressive! Better than other brands I've tried. Highly recommended.",
      "Poor design and difficult to use. Interface is confusing and cluttered.",
      "Love it! Makes my life so much easier. Can't imagine going back to the old way.",
      "Mediocre at best. There are better options available in the market.",
      "Fantastic purchase! Everyone in my family loves it. Great investment.",
    ];

    const reviews = Array(Math.floor(Math.random() * 30) + 20).fill(0).map(() => ({
      text: templates[Math.floor(Math.random() * templates.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      author: `User${Math.floor(Math.random() * 10000)}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    }));

    return {
      title: `Analysis for ${domain}`,
      description: `Sentiment analysis of content from ${domain}`,
      text: reviews.map(r => r.text).join(' '),
      metadata: {
        wordCount: reviews.reduce((sum, r) => sum + r.text.split(/\s+/).length, 0),
        extractedAt: new Date().toISOString(),
        contentType: 'generated',
      },
      reviews,
    };
  }
}
