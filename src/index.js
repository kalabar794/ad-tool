/**
 * Ads Extractor - Main Entry Point
 * A tool for extracting and analyzing advertisements from various sources
 */

const AdsExtractor = require('./extractor');
const AdsAnalyzer = require('./analyzer');
const { loadSkillConfig } = require('./utils');

class AdsExtractorSkill {
  constructor(options = {}) {
    this.config = loadSkillConfig();
    this.extractor = new AdsExtractor(this.config);
    this.analyzer = new AdsAnalyzer(this.config);
    this.options = {
      maxConcurrentRequests: options.maxConcurrentRequests || this.config.config?.maxConcurrentRequests || 5,
      requestTimeout: options.requestTimeout || this.config.config?.requestTimeout || 30000,
      retryAttempts: options.retryAttempts || this.config.config?.retryAttempts || 3,
      cacheEnabled: options.cacheEnabled !== undefined ? options.cacheEnabled : this.config.config?.cacheEnabled || true,
      ...options
    };
  }

  /**
   * Extract advertisements from a source
   * @param {string} source - URL, file path, or raw text
   * @param {Object} options - Extraction options
   * @returns {Promise<Array>} Extracted advertisements
   */
  async extractAds(source, options = {}) {
    const {
      sourceType = 'url',
      outputFormat = 'json',
      includeMetadata = true
    } = options;

    const ads = await this.extractor.extract(source, sourceType, { includeMetadata });

    return this.formatOutput(ads, outputFormat);
  }

  /**
   * Analyze a single advertisement
   * @param {string} adContent - The ad content to analyze
   * @param {Array} analysisTypes - Types of analysis to perform
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeAd(adContent, analysisTypes = ['sentiment', 'keywords']) {
    return this.analyzer.analyze(adContent, analysisTypes);
  }

  /**
   * Filter extracted ads based on criteria
   * @param {Array} ads - Array of extracted ads
   * @param {Object} filters - Filter criteria
   * @returns {Array} Filtered ads
   */
  filterAds(ads, filters = {}) {
    let filtered = [...ads];

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(ad =>
        filters.categories.some(cat => ad.category?.toLowerCase().includes(cat.toLowerCase()))
      );
    }

    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter(ad => {
        const adDate = new Date(ad.timestamp);
        return (!start || adDate >= new Date(start)) &&
               (!end || adDate <= new Date(end));
      });
    }

    if (filters.minConfidence !== undefined) {
      filtered = filtered.filter(ad => ad.confidence >= filters.minConfidence);
    }

    return filtered;
  }

  /**
   * Export ads to various formats
   * @param {Array} ads - Array of ads to export
   * @param {string} format - Export format
   * @param {string} outputPath - Optional output file path
   * @returns {Promise<string|Buffer>} Exported data
   */
  async exportAds(ads, format = 'json', outputPath = null) {
    const { exportToFormat } = require('./utils');
    return exportToFormat(ads, format, outputPath);
  }

  /**
   * Format output based on specified format
   * @private
   */
  formatOutput(ads, format) {
    switch (format) {
      case 'csv':
        return this.toCSV(ads);
      case 'text':
        return this.toText(ads);
      case 'json':
      default:
        return ads;
    }
  }

  toCSV(ads) {
    if (ads.length === 0) return '';
    const headers = Object.keys(ads[0]).join(',');
    const rows = ads.map(ad =>
      Object.values(ad).map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
    );
    return [headers, ...rows].join('\n');
  }

  toText(ads) {
    return ads.map((ad, i) =>
      `[Ad ${i + 1}]\n${Object.entries(ad).map(([k, v]) => `  ${k}: ${v}`).join('\n')}`
    ).join('\n\n');
  }
}

module.exports = AdsExtractorSkill;
