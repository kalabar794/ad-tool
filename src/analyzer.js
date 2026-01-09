/**
 * Ads Analyzer - Analysis logic for advertisements
 */

class AdsAnalyzer {
  constructor(config = {}) {
    this.config = config;
  }

  /**
   * Analyze advertisement content
   * @param {string} adContent - The ad content to analyze
   * @param {Array} analysisTypes - Types of analysis to perform
   * @returns {Promise<Object>} Analysis results
   */
  async analyze(adContent, analysisTypes = ['sentiment', 'keywords']) {
    const results = {
      content: adContent,
      analysisTimestamp: new Date().toISOString(),
      analyses: {}
    };

    for (const type of analysisTypes) {
      switch (type) {
        case 'sentiment':
          results.analyses.sentiment = this.analyzeSentiment(adContent);
          break;
        case 'targeting':
          results.analyses.targeting = this.analyzeTargeting(adContent);
          break;
        case 'keywords':
          results.analyses.keywords = this.extractKeywords(adContent);
          break;
        case 'cta':
          results.analyses.cta = this.analyzeCTA(adContent);
          break;
        case 'compliance':
          results.analyses.compliance = this.checkCompliance(adContent);
          break;
        default:
          console.warn(`Unknown analysis type: ${type}`);
      }
    }

    return results;
  }

  /**
   * Analyze sentiment of ad content
   * @private
   */
  analyzeSentiment(text) {
    const positiveWords = [
      'amazing', 'best', 'excellent', 'great', 'love', 'perfect', 'wonderful',
      'fantastic', 'incredible', 'outstanding', 'brilliant', 'superb', 'free',
      'save', 'exclusive', 'limited', 'special', 'premium', 'quality', 'trusted'
    ];

    const negativeWords = [
      'bad', 'terrible', 'worst', 'hate', 'awful', 'horrible', 'poor',
      'disappointing', 'waste', 'scam', 'fake', 'never', 'avoid', 'warning'
    ];

    const urgencyWords = [
      'now', 'today', 'limited', 'hurry', 'fast', 'quick', 'instant',
      'immediately', 'deadline', 'expire', 'last chance', 'ending soon'
    ];

    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    let urgencyCount = 0;

    for (const word of words) {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
      if (urgencyWords.some(u => word.includes(u))) urgencyCount++;
    }

    const total = words.length || 1;
    const positiveRatio = positiveCount / total;
    const negativeRatio = negativeCount / total;

    let sentiment;
    if (positiveRatio > negativeRatio * 2) {
      sentiment = 'positive';
    } else if (negativeRatio > positiveRatio * 2) {
      sentiment = 'negative';
    } else {
      sentiment = 'neutral';
    }

    return {
      sentiment,
      positiveScore: Math.round(positiveRatio * 100) / 100,
      negativeScore: Math.round(negativeRatio * 100) / 100,
      urgencyLevel: urgencyCount > 2 ? 'high' : urgencyCount > 0 ? 'medium' : 'low',
      positiveWords: positiveWords.filter(w => text.toLowerCase().includes(w)),
      urgencyWords: urgencyWords.filter(w => text.toLowerCase().includes(w))
    };
  }

  /**
   * Analyze targeting indicators
   * @private
   */
  analyzeTargeting(text) {
    const demographics = {
      age: this.detectAgeGroup(text),
      gender: this.detectGender(text),
      interests: this.detectInterests(text),
      location: this.detectLocationIndicators(text)
    };

    return {
      demographics,
      targetingScore: this.calculateTargetingScore(demographics)
    };
  }

  /**
   * Detect age group targeting
   * @private
   */
  detectAgeGroup(text) {
    const lowerText = text.toLowerCase();
    const ageIndicators = {
      'teens': ['teen', 'young', 'student', 'school', 'college'],
      'young-adults': ['millennial', 'professional', 'career', 'startup'],
      'adults': ['family', 'parent', 'home', 'mortgage', 'retirement'],
      'seniors': ['senior', 'retirement', 'medicare', 'grandparent']
    };

    const detected = [];
    for (const [group, keywords] of Object.entries(ageIndicators)) {
      if (keywords.some(k => lowerText.includes(k))) {
        detected.push(group);
      }
    }

    return detected.length > 0 ? detected : ['general'];
  }

  /**
   * Detect gender targeting
   * @private
   */
  detectGender(text) {
    const lowerText = text.toLowerCase();
    const maleIndicators = ['men', 'man', 'his', 'him', 'guys', 'gentlemen', 'father', 'dad'];
    const femaleIndicators = ['women', 'woman', 'her', 'she', 'ladies', 'mother', 'mom'];

    const maleCount = maleIndicators.filter(i => lowerText.includes(i)).length;
    const femaleCount = femaleIndicators.filter(i => lowerText.includes(i)).length;

    if (maleCount > femaleCount * 2) return 'male';
    if (femaleCount > maleCount * 2) return 'female';
    return 'all';
  }

  /**
   * Detect interest categories
   * @private
   */
  detectInterests(text) {
    const lowerText = text.toLowerCase();
    const interestCategories = {
      'technology': ['tech', 'gadget', 'computer', 'phone', 'app', 'software'],
      'fashion': ['style', 'fashion', 'clothing', 'dress', 'trend'],
      'fitness': ['fitness', 'gym', 'workout', 'exercise', 'health'],
      'food': ['food', 'recipe', 'cooking', 'restaurant', 'meal'],
      'travel': ['travel', 'vacation', 'trip', 'destination', 'hotel'],
      'finance': ['money', 'invest', 'saving', 'credit', 'bank'],
      'entertainment': ['movie', 'music', 'game', 'show', 'stream']
    };

    const detected = [];
    for (const [interest, keywords] of Object.entries(interestCategories)) {
      if (keywords.some(k => lowerText.includes(k))) {
        detected.push(interest);
      }
    }

    return detected;
  }

  /**
   * Detect location indicators
   * @private
   */
  detectLocationIndicators(text) {
    const locationPatterns = [
      /near you/i,
      /in your area/i,
      /local/i,
      /nearby/i,
      /\b(US|USA|UK|Canada|Australia)\b/i,
      /\b[A-Z][a-z]+ (city|county|state)\b/
    ];

    const found = [];
    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) {
        found.push(match[0]);
      }
    }

    return found;
  }

  /**
   * Calculate targeting specificity score
   * @private
   */
  calculateTargetingScore(demographics) {
    let score = 0;

    if (demographics.age[0] !== 'general') score += 0.25;
    if (demographics.gender !== 'all') score += 0.25;
    if (demographics.interests.length > 0) score += 0.25;
    if (demographics.location.length > 0) score += 0.25;

    return Math.round(score * 100) / 100;
  }

  /**
   * Extract keywords from ad content
   * @private
   */
  extractKeywords(text) {
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
      'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
      'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'this',
      'that', 'these', 'those', 'it', 'its', 'they', 'them', 'their', 'we',
      'us', 'our', 'you', 'your', 'i', 'me', 'my'
    ]);

    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));

    // Count word frequency
    const frequency = {};
    for (const word of words) {
      frequency[word] = (frequency[word] || 0) + 1;
    }

    // Sort by frequency and get top keywords
    const sorted = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      keywords: sorted.map(([word, count]) => ({ word, count })),
      totalWords: words.length,
      uniqueWords: Object.keys(frequency).length
    };
  }

  /**
   * Analyze Call-to-Action elements
   * @private
   */
  analyzeCTA(text) {
    const ctaPatterns = [
      { pattern: /buy now/i, type: 'purchase', strength: 'strong' },
      { pattern: /shop now/i, type: 'purchase', strength: 'strong' },
      { pattern: /order (now|today)/i, type: 'purchase', strength: 'strong' },
      { pattern: /sign up/i, type: 'signup', strength: 'medium' },
      { pattern: /register/i, type: 'signup', strength: 'medium' },
      { pattern: /subscribe/i, type: 'signup', strength: 'medium' },
      { pattern: /learn more/i, type: 'information', strength: 'weak' },
      { pattern: /find out/i, type: 'information', strength: 'weak' },
      { pattern: /discover/i, type: 'information', strength: 'weak' },
      { pattern: /get started/i, type: 'action', strength: 'medium' },
      { pattern: /try (it )?free/i, type: 'trial', strength: 'strong' },
      { pattern: /download/i, type: 'download', strength: 'medium' },
      { pattern: /claim/i, type: 'offer', strength: 'strong' },
      { pattern: /call (us|now)/i, type: 'contact', strength: 'strong' }
    ];

    const detected = [];
    for (const { pattern, type, strength } of ctaPatterns) {
      const match = text.match(pattern);
      if (match) {
        detected.push({
          text: match[0],
          type,
          strength
        });
      }
    }

    return {
      ctas: detected,
      hasCTA: detected.length > 0,
      primaryCTA: detected[0] || null,
      ctaStrength: detected.length > 0
        ? (detected.some(c => c.strength === 'strong') ? 'strong' :
           detected.some(c => c.strength === 'medium') ? 'medium' : 'weak')
        : 'none'
    };
  }

  /**
   * Check ad compliance with common standards
   * @private
   */
  checkCompliance(text) {
    const issues = [];
    const lowerText = text.toLowerCase();

    // Check for misleading claims
    const misleadingPatterns = [
      { pattern: /guaranteed results/i, issue: 'Potentially misleading guarantee claim' },
      { pattern: /100% (success|effective|safe)/i, issue: 'Absolute claim may be misleading' },
      { pattern: /miracle/i, issue: 'Potentially misleading "miracle" claim' },
      { pattern: /no risk/i, issue: 'Risk-free claim may be misleading' }
    ];

    // Check for required disclosures
    const disclosureIssues = [];
    if (lowerText.includes('results may vary') === false &&
        (lowerText.includes('weight loss') || lowerText.includes('lose weight'))) {
      disclosureIssues.push('Weight loss claims may require "results may vary" disclosure');
    }

    if ((lowerText.includes('testimonial') || lowerText.includes('review')) &&
        !lowerText.includes('paid') && !lowerText.includes('sponsored')) {
      disclosureIssues.push('Testimonials may require disclosure of paid endorsement');
    }

    for (const { pattern, issue } of misleadingPatterns) {
      if (pattern.test(text)) {
        issues.push({ type: 'misleading', issue });
      }
    }

    for (const issue of disclosureIssues) {
      issues.push({ type: 'disclosure', issue });
    }

    // Check for sensitive content
    const sensitivePatterns = [
      { pattern: /\b(prescription|drug|medication)\b/i, category: 'pharmaceutical' },
      { pattern: /\b(alcohol|beer|wine|liquor)\b/i, category: 'alcohol' },
      { pattern: /\b(gambling|casino|bet)\b/i, category: 'gambling' },
      { pattern: /\b(crypto|bitcoin|investment returns)\b/i, category: 'financial' }
    ];

    const sensitiveCategories = [];
    for (const { pattern, category } of sensitivePatterns) {
      if (pattern.test(text)) {
        sensitiveCategories.push(category);
      }
    }

    return {
      issues,
      sensitiveCategories,
      issueCount: issues.length,
      complianceScore: Math.max(0, 1 - (issues.length * 0.2)),
      requiresReview: issues.length > 0 || sensitiveCategories.length > 0
    };
  }
}

module.exports = AdsAnalyzer;
