/**
 * Ads Extractor - Core extraction logic
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

class AdsExtractor {
  constructor(config = {}) {
    this.config = config;
    this.adSelectors = config.patterns?.adSelectors || [
      "[class*='ad-']",
      "[class*='advertisement']",
      "[class*='sponsored']",
      "[id*='ad-']",
      "[data-ad]",
      "[data-advertisement]",
      "ins.adsbygoogle",
      ".dfp-ad",
      "[class*='promo']",
      "[class*='banner']"
    ];
    this.adIndicators = config.patterns?.adIndicators || [
      'sponsored',
      'advertisement',
      'ad',
      'promoted',
      'paid partnership',
      'affiliate'
    ];
  }

  /**
   * Extract ads from a source
   * @param {string} source - The source to extract from
   * @param {string} sourceType - Type of source (url, file, text)
   * @param {Object} options - Extraction options
   * @returns {Promise<Array>} Extracted ads
   */
  async extract(source, sourceType = 'url', options = {}) {
    let content;

    switch (sourceType) {
      case 'url':
        content = await this.fetchUrl(source);
        break;
      case 'file':
        content = await this.readFile(source);
        break;
      case 'text':
        content = source;
        break;
      default:
        throw new Error(`Unknown source type: ${sourceType}`);
    }

    const ads = this.parseContent(content);

    if (options.includeMetadata) {
      return ads.map((ad, index) => ({
        ...ad,
        id: `ad_${Date.now()}_${index}`,
        timestamp: new Date().toISOString(),
        source: sourceType === 'text' ? 'inline' : source,
        sourceType
      }));
    }

    return ads;
  }

  /**
   * Validate URL to prevent SSRF attacks
   * @private
   */
  validateUrl(urlString) {
    try {
      const parsed = new URL(urlString);

      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Only HTTP and HTTPS protocols are allowed');
      }

      // Block private/internal IPs
      const hostname = parsed.hostname.toLowerCase();
      const blockedPatterns = [
        /^localhost$/i,
        /^127\./,
        /^10\./,
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
        /^192\.168\./,
        /^169\.254\./,
        /^0\./,
        /^\[::1\]$/,
        /^\[fc/i,
        /^\[fd/i,
        /^\[fe80:/i,
        /^metadata\.google/i,
        /^169\.254\.169\.254/
      ];

      for (const pattern of blockedPatterns) {
        if (pattern.test(hostname)) {
          throw new Error('Access to internal/private addresses is not allowed');
        }
      }

      return parsed.href;
    } catch (error) {
      if (error.message.includes('Invalid URL')) {
        throw new Error('Invalid URL format');
      }
      throw error;
    }
  }

  /**
   * Fetch content from URL
   * @private
   */
  async fetchUrl(targetUrl) {
    try {
      // Validate URL before fetching (SSRF protection)
      const validatedUrl = this.validateUrl(targetUrl);

      const response = await axios.get(validatedUrl, {
        timeout: this.config.config?.requestTimeout || 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AdsExtractor/1.0)'
        },
        maxRedirects: 5,
        validateStatus: (status) => status < 400
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch URL: ${error.message}`);
    }
  }

  /**
   * Read content from file with path traversal protection
   * @private
   */
  async readFile(filePath) {
    try {
      const cwd = process.cwd();
      const absolutePath = path.resolve(cwd, filePath);

      // Path traversal protection: ensure resolved path is within cwd
      if (!absolutePath.startsWith(cwd + path.sep) && absolutePath !== cwd) {
        throw new Error('Access denied: path traversal attempt detected');
      }

      return await fs.readFile(absolutePath, 'utf-8');
    } catch (error) {
      if (error.message.includes('path traversal')) {
        throw error;
      }
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  /**
   * Parse HTML content and extract ads
   * @private
   */
  parseContent(content) {
    const ads = [];

    // Check if content is HTML
    if (this.isHTML(content)) {
      const $ = cheerio.load(content);

      // Extract using CSS selectors
      for (const selector of this.adSelectors) {
        $(selector).each((index, element) => {
          const ad = this.extractAdFromElement($, element);
          if (ad && this.isValidAd(ad)) {
            ads.push(ad);
          }
        });
      }

      // Look for ad indicators in text
      $('*').each((index, element) => {
        const text = $(element).text().toLowerCase();
        for (const indicator of this.adIndicators) {
          if (text.includes(indicator) && !this.isAlreadyExtracted(ads, element, $)) {
            const ad = this.extractAdFromElement($, element);
            if (ad && this.isValidAd(ad)) {
              ad.detectedBy = 'indicator';
              ad.indicator = indicator;
              ads.push(ad);
            }
          }
        }
      });
    } else {
      // Handle plain text - look for ad patterns
      const textAds = this.extractFromText(content);
      ads.push(...textAds);
    }

    return this.deduplicateAds(ads);
  }

  /**
   * Extract ad information from a DOM element
   * @private
   */
  extractAdFromElement($, element) {
    const $el = $(element);

    return {
      content: $el.text().trim().substring(0, 500),
      html: $el.html()?.substring(0, 1000),
      tagName: element.tagName,
      className: $el.attr('class') || '',
      id: $el.attr('id') || '',
      href: $el.find('a').first().attr('href') || $el.attr('href') || '',
      imgSrc: $el.find('img').first().attr('src') || '',
      dataAttributes: this.extractDataAttributes($el),
      confidence: this.calculateConfidence($el),
      category: this.detectCategory($el.text())
    };
  }

  /**
   * Extract data-* attributes
   * @private
   */
  extractDataAttributes($el) {
    const dataAttrs = {};
    const attrs = $el.attr() || {};

    for (const [key, value] of Object.entries(attrs)) {
      if (key.startsWith('data-')) {
        dataAttrs[key] = value;
      }
    }

    return dataAttrs;
  }

  /**
   * Calculate confidence score for an ad detection
   * @private
   */
  calculateConfidence($el) {
    let score = 0;
    const className = ($el.attr('class') || '').toLowerCase();
    const id = ($el.attr('id') || '').toLowerCase();
    const text = $el.text().toLowerCase();

    // Check class name
    if (className.includes('ad') || className.includes('advertisement')) score += 0.3;
    if (className.includes('sponsored')) score += 0.3;
    if (className.includes('promo')) score += 0.2;

    // Check ID
    if (id.includes('ad') || id.includes('advertisement')) score += 0.2;

    // Check for ad networks
    if (className.includes('google') || className.includes('adsense')) score += 0.3;
    if (className.includes('dfp')) score += 0.3;

    // Check content indicators
    for (const indicator of this.adIndicators) {
      if (text.includes(indicator)) score += 0.1;
    }

    // Check for tracking pixels
    if ($el.find('img[width="1"]').length > 0 || $el.find('img[height="1"]').length > 0) {
      score += 0.2;
    }

    return Math.min(score, 1);
  }

  /**
   * Detect ad category from text
   * @private
   */
  detectCategory(text) {
    const categories = {
      'ecommerce': ['buy', 'shop', 'sale', 'discount', 'price', 'order'],
      'finance': ['loan', 'credit', 'investment', 'bank', 'insurance', 'mortgage'],
      'technology': ['software', 'app', 'download', 'tech', 'digital'],
      'health': ['health', 'medical', 'wellness', 'fitness', 'diet'],
      'travel': ['travel', 'hotel', 'flight', 'vacation', 'booking'],
      'entertainment': ['movie', 'game', 'music', 'stream', 'watch'],
      'education': ['learn', 'course', 'degree', 'certification', 'training']
    };

    const lowerText = text.toLowerCase();

    for (const [category, keywords] of Object.entries(categories)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          return category;
        }
      }
    }

    return 'general';
  }

  /**
   * Check if content is HTML
   * @private
   */
  isHTML(content) {
    return typeof content === 'string' && /<[a-z][\s\S]*>/i.test(content);
  }

  /**
   * Validate if extracted ad is meaningful
   * @private
   */
  isValidAd(ad) {
    return ad &&
           ad.content &&
           ad.content.length > 10 &&
           ad.confidence > 0.1;
  }

  /**
   * Check if element was already extracted
   * @private
   */
  isAlreadyExtracted(ads, element, $) {
    const content = $(element).text().trim();
    return ads.some(ad => ad.content === content);
  }

  /**
   * Extract ads from plain text
   * @private
   */
  extractFromText(text) {
    const ads = [];
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      for (const indicator of this.adIndicators) {
        if (line.includes(indicator)) {
          // Extract surrounding context
          const start = Math.max(0, i - 2);
          const end = Math.min(lines.length, i + 3);
          const context = lines.slice(start, end).join('\n');

          ads.push({
            content: context.trim(),
            detectedBy: 'text-indicator',
            indicator,
            confidence: 0.5,
            category: this.detectCategory(context)
          });
          break;
        }
      }
    }

    return ads;
  }

  /**
   * Remove duplicate ads
   * @private
   */
  deduplicateAds(ads) {
    const seen = new Set();
    return ads.filter(ad => {
      const key = ad.content.substring(0, 100);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

module.exports = AdsExtractor;
