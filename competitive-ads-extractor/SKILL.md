---
name: competitive-ads-extractor
description: Extract competitor ads from Meta, TikTok, Google, and LinkedIn Ad Libraries. Analyze ad copy, targeting, creative categories, landing pages, and generate reports with screenshots.
---

# Competitive Ads Extractor v3.4

**Enterprise-grade multi-platform competitive ad intelligence.** Extract ads from Meta, TikTok, Google, and LinkedIn with **video/hook analysis**, **ad copy extraction**, **creative categorization**, **landing page analysis**, **executive summaries**, targeting analysis, visual screenshots, and comprehensive reporting.

## What's New in v3.4
- **Video Hook Analysis** - Identify the hook (first 3-5 seconds) in TikTok video ads and categorize hook type
- **Video Format Detection** - Auto-categorize video ads: UGC, talking head, product demo, before/after, etc.
- **Caption Extraction** - Pull video captions and on-screen text from TikTok ads
- **Hook Pattern Report** - Analyze which hook types competitors use most frequently
- **UGC vs Polished Scoring** - Detect if ads are lo-fi/authentic vs studio-produced

## What's in v3.3
- **Executive Summary 1-Pager** - Auto-generate executive-ready PDF/DOCX summaries with key findings, strategic recommendations, and visual charts
- **Landing Page Analysis** - Extract and analyze competitor landing pages linked from ads (headlines, CTAs, offers, page structure, conversion elements)
- **Cross-Platform Landing Page Patterns** - Identify where competitors send traffic and what conversion strategies they use
- **Executive-Ready Outputs** - Professional 1-page summaries suitable for stakeholder presentations

## What's in v3.2
- **Ad Copy Extraction** - Pull actual text/copy from ads for messaging analysis
- **Creative Categorization** - Auto-tag ads by type (testimonial, offer, educational, brand)
- **Messaging Theme Detection** - Identify common angles and hooks across competitor ads
- **Copy Analysis Reports** - Word frequency, CTA patterns, emotional triggers

## What's in v3.1
- Screenshot Capture - Capture visual samples of competitor ads for reports
- AppleScript Screenshot Integration - Native macOS screenshot via Chrome automation
- Automatic Screenshot Organization - Screenshots saved per platform with timestamps
- Report Visual Integration - Include ad screenshots in final DOCX/PPTX reports

## What's in v3.0
- Full TikTok Ad Library Support - Search by advertiser name/keyword, extract ad details, video URLs, targeting data, reach metrics
- TikTok Ad Detail Pages - Deep extraction of targeting (age, gender, country), audience size, advertiser info
- Video Asset URLs - Direct links to TikTok ad videos and cover images
- Quick Mode vs Deep Dive Mode - Choose analysis depth based on needs
- Enhanced Destination URL Extraction - Systematically capture all ad landing pages

---

## Prerequisites

**CRITICAL**: Enable JavaScript access in Chrome before using:
1. Open Chrome
2. Go to **View → Developer → Allow JavaScript from Apple Events**

Without this, you'll get "Google Chrome is not running" errors.

**For LinkedIn**: Log into LinkedIn in Chrome first. The Ad Library often fails to load.

---

## Platform Support Matrix

| Platform | Ad Copy | Categorization | Screenshots | Targeting | Video URLs | Landing Pages |
|----------|---------|----------------|-------------|-----------|------------|---------------|
| **Meta Ad Library** | ✅ Full text | ✅ Auto-tagged | ✅ Full page | ⚠️ Limited | ❌ Embedded | ✅ Extract |
| **TikTok Ad Library** | ✅ Captions | ✅ Auto-tagged | ✅ Full page | ✅ Full | ✅ Direct | ✅ Extract |
| **Google Ads** | ✅ Headlines/Desc | ✅ Auto-tagged | ✅ Full page | ⚠️ Region | ❌ Preview | ✅ Extract |
| **LinkedIn** | ⚠️ When available | ⚠️ When available | ✅ Full page | ⚠️ When available | ❌ No | ⚠️ Limited |

---

## Creative Categories

Every ad is auto-tagged into one of 8 strategic categories:

| Category | Description | Signal Words/Patterns |
|----------|-------------|----------------------|
| **Testimonial** | Social proof, reviews, customer stories | "I love", "★★★★★", "customers say", quoted text, names with quotes |
| **Offer/Promo** | Discounts, limited time, special deals | "% off", "save $", "free", "limited time", "deal", "discount", "BOGO" |
| **Educational** | How-to, tips, informational content | "how to", "tips", "guide", "learn", "discover", "did you know" |
| **Brand Awareness** | Company story, values, mission | "about us", "our story", "mission", "values", "since [year]" |
| **Product Feature** | Specific product benefits, specs | "features", "benefits", "includes", "powered by", "introducing" |
| **Urgency/Scarcity** | Time pressure, limited availability | "ends soon", "last chance", "only X left", "today only", "hurry" |
| **Problem/Solution** | Pain point + resolution | "tired of", "struggling with", "finally", "say goodbye to", "solution" |
| **Comparison** | Us vs them, competitor callouts | "vs", "compared to", "unlike", "better than", "switch from" |

---

## Video Format Categories

Video ads are auto-categorized into one of 8 format types:

| Format | Description | Detection Signals |
|--------|-------------|-------------------|
| **UGC** | User-generated content, authentic/amateur feel | Selfie-style, shaky cam, casual setting, personal testimonial |
| **Talking Head** | Person speaking directly to camera | Single speaker, direct address, educational tone |
| **Product Demo** | Showing product in action | Product focus, hands showing usage, features highlighted |
| **Before/After** | Transformation comparison | Split screen, "before", "after", transformation words |
| **Unboxing** | Opening/revealing product | Package opening, first impressions, reveal moment |
| **Tutorial** | Step-by-step instructions | Numbered steps, "how to", process demonstration |
| **Lifestyle** | Product in real-life context | Aspirational setting, daily use, emotional appeal |
| **Studio/Polished** | Professional production | Clean backgrounds, multiple angles, graphics/effects |

---

## Hook Types (First 3-5 Seconds)

Video hooks are categorized by opening strategy:

| Hook Type | Description | Example Patterns |
|-----------|-------------|------------------|
| **Question** | Opens with a question | "Have you ever...?", "What if...?", "Did you know...?" |
| **Bold Claim** | Strong statement to grab attention | "This changed my life", "The #1 mistake", "Finally..." |
| **Problem** | Starts with pain point | "Tired of...?", "Struggling with...?", "Stop doing..." |
| **Result First** | Shows outcome immediately | Before/after reveal, end result shown first |
| **Pattern Interrupt** | Unexpected visual/audio | Unusual action, loud sound, visual surprise |
| **Social Proof** | Leads with credibility | "10M views", "Viral", "Everyone's talking about" |
| **Direct Address** | Speaks to specific audience | "Hey [audience]", "If you're a...", "POV: you're..." |
| **Curiosity Gap** | Creates information gap | "Wait for it...", "You won't believe...", "Secret..." |

---

## JavaScript Extraction Scripts

### Meta Ad Copy Extraction Script

```javascript
// Meta Ad Library - Full Copy + Categorization Extraction
(function() {
  const categoryPatterns = {
    testimonial: [/testimonial|review|customer/i, /★{3,}/, /"[^"]{20,}"/, /\blove\b/i, /\d+\+?\s*happy/i],
    offer_promo: [/\d+%\s*off/i, /save\s*\$?\d+/i, /\bfree\b/i, /limited time|special|deal|discount/i],
    educational: [/\bhow to\b/i, /\d+\s*(tips|ways|steps|secrets)/i, /guide|learn|discover/i],
    brand_awareness: [/our story|about us|since\s*(19|20)\d{2}/i, /family.?owned|mission/i],
    product_feature: [/features?|benefits?|includes/i, /powered by|made with|technology/i],
    urgency_scarcity: [/ends?\s*soon|last\s*chance|limited/i, /today only|hurry|don't miss/i],
    problem_solution: [/tired of|struggling|finally|say goodbye/i, /solution|solve|no more/i],
    comparison: [/\bvs\.?\b/i, /compared to|unlike|better than|switch from/i]
  };

  function categorize(text) {
    let maxScore = 0, primary = 'uncategorized';
    const scores = {};
    Object.entries(categoryPatterns).forEach(([cat, patterns]) => {
      let score = 0;
      patterns.forEach(p => { if (p.test(text)) score++; });
      scores[cat] = score;
      if (score > maxScore) { maxScore = score; primary = cat; }
    });
    return { primary, scores, confidence: maxScore > 1 ? 'high' : maxScore > 0 ? 'medium' : 'low' };
  }

  const ads = [];
  const seen = new Set();

  document.querySelectorAll('div').forEach(el => {
    const text = el.innerText;
    if (text.length < 50 || text.length > 3000) return;
    if (!text.includes('Active') && !text.includes('Started running')) return;

    const sig = text.substring(0, 200);
    if (seen.has(sig)) return;
    seen.add(sig);

    const lines = text.split('\n').filter(l => l.trim().length > 10);
    const primaryText = lines.filter(l => l.length > 30).sort((a,b) => b.length - a.length)[0] || '';
    const ctaMatch = text.match(/(?:Shop Now|Learn More|Sign Up|Book Now|Get Offer|Contact Us|Download|Apply Now|Get Started)/gi);
    const hashtags = text.match(/#\w+/g) || [];
    const category = categorize(text);

    ads.push({
      primaryText: primaryText.substring(0, 500),
      cta: ctaMatch ? ctaMatch[0] : '',
      hashtags: [...new Set(hashtags)],
      category: category.primary,
      categoryConfidence: category.confidence,
      allCategoryScores: category.scores
    });
  });

  const categoryCounts = {};
  ads.forEach(a => { categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1; });

  return JSON.stringify({
    extractedAt: new Date().toISOString(),
    platform: 'Meta',
    totalAds: ads.length,
    categorySummary: categoryCounts,
    ads: ads
  }, null, 2);
})();
```

### TikTok Ad Copy Extraction Script

```javascript
// TikTok Ad Library - Copy + Categorization Extraction
(function() {
  const categoryPatterns = {
    testimonial: [/testimonial|review|customer/i, /★{3,}/, /"[^"]{20,}"/, /\blove\b/i],
    offer_promo: [/\d+%\s*off/i, /save\s*\$?\d+/i, /\bfree\b/i, /limited|special|deal|discount/i],
    educational: [/\bhow to\b/i, /\d+\s*(tips|ways|steps|secrets)/i, /guide|learn|discover/i],
    brand_awareness: [/our story|about us|since\s*(19|20)\d{2}/i],
    product_feature: [/features?|benefits?|includes/i, /powered by|made with/i],
    urgency_scarcity: [/ends?\s*soon|last\s*chance|limited/i, /today only|hurry/i],
    problem_solution: [/tired of|struggling|finally|say goodbye/i, /solution|solve/i],
    comparison: [/\bvs\.?\b/i, /compared to|unlike|better than/i]
  };

  function categorize(text) {
    let maxScore = 0, primary = 'uncategorized';
    const scores = {};
    Object.entries(categoryPatterns).forEach(([cat, patterns]) => {
      let score = 0;
      patterns.forEach(p => { if (p.test(text)) score++; });
      scores[cat] = score;
      if (score > maxScore) { maxScore = score; primary = cat; }
    });
    return { primary, scores };
  }

  const ads = [];

  document.querySelectorAll('a[href*="/ads/detail/"]').forEach(link => {
    const container = link.closest('div[class]');
    if (!container) return;

    const text = container.innerText;
    const adId = link.href.match(/ad_id=(\d+)/)?.[1];
    if (!adId) return;

    const lines = text.split('\n').filter(l =>
      l.trim().length > 15 &&
      !l.includes('First shown') &&
      !l.includes('Last shown') &&
      !l.includes('Unique users')
    );

    const caption = lines[0]?.trim() || '';
    const hashtags = text.match(/#[\w\u4e00-\u9fa5]+/g) || [];
    const mentions = text.match(/@[\w.]+/g) || [];
    const ctaMatch = text.match(/(?:Shop Now|Learn More|Download|Sign Up|Get App|Play Game|Watch Now|Order Now|Book Now)/gi);
    const category = categorize(text);

    ads.push({
      adId,
      detailUrl: link.href,
      caption: caption.substring(0, 500),
      hashtags: [...new Set(hashtags)],
      mentions: [...new Set(mentions)],
      cta: ctaMatch ? ctaMatch[0] : '',
      category: category.primary,
      allCategoryScores: category.scores
    });
  });

  const unique = [...new Map(ads.map(a => [a.adId, a])).values()];
  const categoryCounts = {};
  unique.forEach(a => { categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1; });

  return JSON.stringify({
    extractedAt: new Date().toISOString(),
    platform: 'TikTok',
    totalAds: unique.length,
    categorySummary: categoryCounts,
    ads: unique
  }, null, 2);
})();
```

### TikTok Video Hook Analysis Script

```javascript
// TikTok Ad Library - Video Hook + Format Analysis
(function() {
  // Hook type patterns (detected from caption/first line)
  const hookPatterns = {
    question: [/^(have you|do you|did you|what if|why do|how do|ever wonder|want to)/i, /\?$/],
    bold_claim: [/changed my life|game.?changer|finally|the secret|you need|must have|#1|best/i],
    problem: [/^(tired of|sick of|struggling|stop|don't|can't stand|hate when)/i],
    result_first: [/^(before|after|results|transformation|went from|lost \d+|gained \d+)/i],
    pattern_interrupt: [/^(wait|stop|hold on|pov:|ok but|no way)/i],
    social_proof: [/viral|million|views|everyone|trending|famous|went viral/i],
    direct_address: [/^(hey|attention|calling all|if you're a|this is for)/i],
    curiosity_gap: [/wait for it|you won't believe|secret|hack|trick|nobody knows/i]
  };

  // Video format patterns
  const formatPatterns = {
    ugc: [/authentic|real|honest|my experience|i tried|unsponsored/i, /@\w+/],
    talking_head: [/let me tell you|here's the thing|listen|i'm going to/i],
    product_demo: [/watch this|how it works|let me show|using this|applying/i],
    before_after: [/before|after|transformation|results|day \d+|week \d+/i],
    unboxing: [/unbox|opening|first impressions|just arrived|got this/i],
    tutorial: [/step \d|how to|tutorial|guide|easy way|simple trick/i],
    lifestyle: [/daily routine|morning|night routine|day in|aesthetic/i],
    studio_polished: [/professional|studio|brand|official/i]
  };

  function detectHook(text) {
    const firstLine = text.split(/[.\n!?]/)[0] || '';
    let maxScore = 0, hookType = 'unknown';

    Object.entries(hookPatterns).forEach(([type, patterns]) => {
      let score = 0;
      patterns.forEach(p => { if (p.test(firstLine) || p.test(text.substring(0, 100))) score++; });
      if (score > maxScore) { maxScore = score; hookType = type; }
    });

    return { type: hookType, confidence: maxScore > 1 ? 'high' : maxScore > 0 ? 'medium' : 'low', firstLine: firstLine.substring(0, 80) };
  }

  function detectFormat(text) {
    let maxScore = 0, format = 'unknown';
    const scores = {};

    Object.entries(formatPatterns).forEach(([fmt, patterns]) => {
      let score = 0;
      patterns.forEach(p => { if (p.test(text)) score++; });
      scores[fmt] = score;
      if (score > maxScore) { maxScore = score; format = fmt; }
    });

    // Default to UGC if low scores (most TikTok ads are UGC-style)
    if (maxScore === 0) format = 'ugc';

    return { format, confidence: maxScore > 1 ? 'high' : maxScore > 0 ? 'medium' : 'low', scores };
  }

  function detectProductionStyle(text) {
    const ugcSignals = ['pov', 'storytime', 'grwm', 'ootd', 'real', 'honest', 'no filter', 'unedited'];
    const polishedSignals = ['professional', 'studio', 'cinematic', 'brand', 'ad', 'sponsored'];

    let ugcScore = 0, polishedScore = 0;
    ugcSignals.forEach(s => { if (text.toLowerCase().includes(s)) ugcScore++; });
    polishedSignals.forEach(s => { if (text.toLowerCase().includes(s)) polishedScore++; });

    return {
      style: ugcScore > polishedScore ? 'ugc_authentic' : polishedScore > ugcScore ? 'studio_polished' : 'mixed',
      ugcScore,
      polishedScore
    };
  }

  const ads = [];

  document.querySelectorAll('a[href*="/ads/detail/"]').forEach(link => {
    const container = link.closest('div[class]');
    if (!container) return;

    const text = container.innerText;
    const adId = link.href.match(/ad_id=(\d+)/)?.[1];
    if (!adId) return;

    const lines = text.split('\n').filter(l => l.trim().length > 10);
    const caption = lines.find(l => l.length > 20 && !l.includes('First shown')) || '';

    const hook = detectHook(caption);
    const format = detectFormat(text);
    const production = detectProductionStyle(text);

    ads.push({
      adId,
      detailUrl: link.href,
      caption: caption.substring(0, 300),
      hook: hook,
      videoFormat: format.format,
      formatConfidence: format.confidence,
      productionStyle: production.style,
      isUGC: production.style === 'ugc_authentic' || format.format === 'ugc'
    });
  });

  const unique = [...new Map(ads.map(a => [a.adId, a])).values()];

  // Aggregate stats
  const hookCounts = {};
  const formatCounts = {};
  let ugcCount = 0;

  unique.forEach(a => {
    hookCounts[a.hook.type] = (hookCounts[a.hook.type] || 0) + 1;
    formatCounts[a.videoFormat] = (formatCounts[a.videoFormat] || 0) + 1;
    if (a.isUGC) ugcCount++;
  });

  return JSON.stringify({
    extractedAt: new Date().toISOString(),
    platform: 'TikTok',
    analysisType: 'video_hook_analysis',
    totalAds: unique.length,
    summary: {
      hookTypes: hookCounts,
      videoFormats: formatCounts,
      ugcPercentage: unique.length > 0 ? Math.round((ugcCount / unique.length) * 100) : 0,
      topHook: Object.entries(hookCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || 'unknown',
      topFormat: Object.entries(formatCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || 'unknown'
    },
    ads: unique
  }, null, 2);
})();
```

### Google Ads Copy Extraction Script

```javascript
// Google Ads Transparency - Ad Copy Extraction
(function() {
  const ads = [];
  const text = document.body.innerText;

  document.querySelectorAll('div').forEach(el => {
    const content = el.innerText;

    if (content.length > 50 && content.length < 500) {
      const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

      if (lines.length >= 2) {
        const adData = {
          headline: '',
          displayUrl: '',
          description: '',
          sitelinks: [],
          rawText: content
        };

        if (lines[0] && lines[0].length < 100) {
          adData.headline = lines[0];
        }

        const urlLine = lines.find(l => l.match(/^[\w-]+\.(com|net|org|io)/i));
        if (urlLine) adData.displayUrl = urlLine;

        const desc = lines.filter(l => l.length > 50 && !l.match(/^[\w-]+\./)).sort((a, b) => b.length - a.length)[0];
        if (desc) adData.description = desc;

        const sitelinks = lines.filter(l => l.length > 5 && l.length < 30 && l !== adData.headline);
        adData.sitelinks = sitelinks.slice(0, 6);

        if (adData.headline || adData.description) {
          ads.push(adData);
        }
      }
    }
  });

  const unique = [...new Map(ads.map(a => [a.headline, a])).values()];

  return JSON.stringify({
    extractedAt: new Date().toISOString(),
    platform: 'Google',
    adsFound: unique.length,
    ads: unique.slice(0, 30)
  }, null, 2);
})();
```

### Landing Page Extraction Script

```javascript
// Landing Page Analysis - Extract Conversion Elements
(function() {
  const data = {
    url: window.location.href,
    extractedAt: new Date().toISOString(),
    title: document.title,
    metaDescription: document.querySelector('meta[name="description"]')?.content || '',

    headlines: {
      h1: [...document.querySelectorAll('h1')].map(h => h.innerText.trim()).filter(Boolean),
      h2: [...document.querySelectorAll('h2')].map(h => h.innerText.trim()).filter(Boolean).slice(0, 10),
      h3: [...document.querySelectorAll('h3')].map(h => h.innerText.trim()).filter(Boolean).slice(0, 10)
    },

    ctas: { primary: [], secondary: [] },
    forms: [],
    trustSignals: [],
    offers: [],

    structure: {
      hasVideo: false,
      hasTestimonials: false,
      hasPricing: false,
      hasForm: false,
      hasChatWidget: false
    }
  };

  // Extract CTAs
  const buttons = document.querySelectorAll('button, a.btn, a.button, [class*="cta"], input[type="submit"]');
  buttons.forEach(btn => {
    const text = (btn.innerText || btn.value || '').trim();
    if (text && text.length > 2 && text.length < 50) {
      const ctaData = { text, type: btn.tagName.toLowerCase(), href: btn.href || null };
      if (btn.matches('[class*="primary"], [class*="cta"]') ||
          text.match(/get started|book now|schedule|contact|free|claim/i)) {
        data.ctas.primary.push(ctaData);
      } else {
        data.ctas.secondary.push(ctaData);
      }
    }
  });

  data.ctas.primary = [...new Map(data.ctas.primary.map(c => [c.text, c])).values()].slice(0, 5);
  data.ctas.secondary = [...new Map(data.ctas.secondary.map(c => [c.text, c])).values()].slice(0, 10);

  // Extract Forms
  document.querySelectorAll('form').forEach(form => {
    const fields = [...form.querySelectorAll('input, select, textarea')].map(f => ({
      type: f.type || f.tagName.toLowerCase(),
      name: f.name || f.placeholder || '',
      required: f.required
    })).filter(f => !['hidden', 'submit', 'button'].includes(f.type));

    if (fields.length > 0) {
      data.forms.push({ fieldCount: fields.length, fields: fields.slice(0, 10) });
    }
  });

  // Detect Trust Signals
  const pageText = document.body.innerText.toLowerCase();
  if (pageText.match(/★{3,}|⭐{3,}|\d+(\.\d+)?\s*(stars?|rating)/i)) data.trustSignals.push('star_ratings');
  if (pageText.match(/\d+\+?\s*(reviews?|testimonials?)/i)) data.trustSignals.push('review_count');
  if (pageText.match(/money.?back|satisfaction\s*guarante|risk.?free/i)) data.trustSignals.push('guarantee');
  if (pageText.match(/\d{1,3}(,\d{3})+\s*(patients?|customers?|clients?|users?)/i)) data.trustSignals.push('customer_count');

  // Detect Offers
  if (pageText.match(/\$\d+[\d,]*(\.\d{2})?/g)) data.offers.push({ type: 'price' });
  if (pageText.match(/\d+%\s*off/gi)) data.offers.push({ type: 'discount_percent' });
  if (pageText.match(/free\s+(consultation|exam|quote|trial|shipping)/gi)) data.offers.push({ type: 'free_offer' });

  // Page Structure
  data.structure.hasVideo = !!document.querySelector('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
  data.structure.hasTestimonials = !!pageText.match(/testimonial|what\s*(our\s*)?(patients?|customers?)\s*say/i);
  data.structure.hasPricing = !!pageText.match(/pricing|price|cost|\$\d+|packages?/i);
  data.structure.hasForm = data.forms.length > 0;
  data.structure.hasChatWidget = !!document.querySelector('[class*="chat"], [class*="intercom"], [class*="drift"]');

  return JSON.stringify(data, null, 2);
})();
```

### Copy Analysis Script (Word Frequency + CTA)

```javascript
// Copy Analysis - Word Frequency + CTA Analysis
(function(adsJson) {
  const data = JSON.parse(adsJson);
  const allText = data.ads.map(a => a.primaryText || a.caption || '').join(' ').toLowerCase();

  const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','is','are','was','were','be','been','have','has','had','do','does','did','will','would','could','should','may','might','can','this','that','these','those','it','its','i','you','your','we','our','they','their','he','she','him','her','from','as','all','also','just','get','now','more','out','up','so','what','when','how']);

  const words = allText.match(/\b[a-z]{3,}\b/g) || [];
  const freq = {};
  words.forEach(w => { if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1; });

  const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 30);

  // Bigrams
  const bigrams = {};
  for (let i = 0; i < words.length - 1; i++) {
    if (!stopWords.has(words[i]) && !stopWords.has(words[i+1])) {
      const phrase = `${words[i]} ${words[i+1]}`;
      bigrams[phrase] = (bigrams[phrase] || 0) + 1;
    }
  }
  const topPhrases = Object.entries(bigrams).filter(([_, c]) => c > 1).sort((a, b) => b[1] - a[1]).slice(0, 15);

  // CTA Analysis
  const ctaCounts = {};
  data.ads.forEach(a => {
    const cta = (a.cta || '').toLowerCase().trim();
    if (cta) ctaCounts[cta] = (ctaCounts[cta] || 0) + 1;
  });
  const ctaDistribution = Object.entries(ctaCounts).sort((a, b) => b[1] - a[1]);

  return JSON.stringify({
    platform: data.platform,
    totalAdsAnalyzed: data.totalAds || data.ads.length,
    wordAnalysis: { topWords, topPhrases },
    ctaAnalysis: { topCTA: ctaDistribution[0]?.[0] || 'none', distribution: ctaDistribution }
  }, null, 2);
})( /* PASTE ADS JSON HERE */ );
```

---

## Complete Deep Dive Workflow

```
1. CREATE OUTPUT STRUCTURE
   mkdir -p /home/claude/competitive-intel/[COMPETITOR]/{tiktok,meta,google,linkedin,landing-pages,screenshots,analysis}

2. META AD LIBRARY (Full Extraction + Copy + Categorization)
   a. Open: facebook.com/ads/library/?q=[COMPETITOR]
   b. Wait 5 seconds
   c. Execute auto-scroll script (load ALL ads)
   d. Scroll to top, CAPTURE SCREENSHOT
   e. Run META COPY EXTRACTION SCRIPT
   f. Save JSON to meta/ads-with-copy.json
   g. Run destination URL extraction
   h. Save category summary to analysis/meta-categories.json

3. TIKTOK AD LIBRARY (Full Extraction + Copy)
   a. Calculate date range, open search URL
   b. Wait, load more results
   c. CAPTURE SCREENSHOT
   d. Run TIKTOK COPY EXTRACTION SCRIPT
   e. Run categorization on extracted copy
   f. Save to tiktok/ads-with-copy.json

4. GOOGLE ADS TRANSPARENCY
   a. Open: adstransparency.google.com/?domain=[DOMAIN]
   b. Wait, CAPTURE SCREENSHOT
   c. Run GOOGLE COPY EXTRACTION SCRIPT
   d. Categorize extracted ads
   e. Save to google/ads-with-copy.json

5. COPY ANALYSIS
   a. Run WORD FREQUENCY ANALYSIS on all platforms
   b. Run CTA PATTERN ANALYSIS
   c. Save to analysis/copy-analysis.json

6. LANDING PAGE ANALYSIS
   a. Compile unique destination URLs from all platforms
   b. For each URL (top 3-5 most common):
      - Open in Chrome
      - Wait 3-5 seconds for full load
      - Run LANDING PAGE EXTRACTION SCRIPT
      - Capture screenshot
      - Save to landing-pages/[domain]-[id].json
   c. Aggregate insights to landing-pages/landing-page-summary.json

7. GENERATE COMPREHENSIVE REPORT
   Include sections:
   - Executive Summary (key findings)
   - Platform Overview (ad counts, presence)
   - Messaging Analysis: Top words/phrases
   - Creative Mix: Category breakdown
   - CTA Strategy: What actions competitors are driving
   - Landing Page Strategy: Conversion approach
   - Messaging Gaps: Categories NOT being used
   - Sample Ad Copy: Top performing ad text

8. GENERATE EXECUTIVE SUMMARY 1-PAGER
   a. Aggregate all extracted data
   b. Calculate key metrics
   c. Identify top 3 strategic opportunities
   d. Generate executive-summary.docx
   e. Keep to ONE PAGE
   f. Copy to /mnt/user-data/outputs/ for download
```

---

## How to Use

### Basic Extraction
```
"Extract [Competitor]'s ads from Meta"
"What ads is [Competitor] running?"
"Pull all [Competitor] ads across platforms"
```

### Ad Copy Analysis
```
"What messaging is [Competitor] using?"
"Extract all ad copy from [Competitor]"
"What headlines is [Competitor] testing?"
"Show me [Competitor]'s ad text and CTAs"
```

### Creative Categorization
```
"Categorize [Competitor]'s ads by type"
"What percentage of [Competitor]'s ads are testimonials?"
"Show me [Competitor]'s promotional ads"
"Find [Competitor]'s educational content"
"What's [Competitor]'s creative mix?"
```

### Video & Hook Analysis
```
"Analyze [Competitor]'s TikTok video hooks"
"What hook types does [Competitor] use?"
"Show me [Competitor]'s UGC vs polished ads"
"What video formats is [Competitor] running?"
"Extract [Competitor]'s top-performing hooks"
"What percentage of [Competitor]'s ads are UGC?"
"Find [Competitor]'s before/after videos"
"Show me [Competitor]'s talking head ads"
```

### Targeting Data
```
"Who is [Competitor] targeting?"
"What demographics does [Competitor] reach?"
"Extract targeting data from [Competitor]'s TikTok ads"
"What age groups is [Competitor] targeting?"
```

### Landing Page Analysis
```
"Where does [Competitor] send their ad traffic?"
"Analyze [Competitor]'s landing pages"
"What CTAs are on [Competitor]'s landing pages?"
"What trust signals does [Competitor] use?"
"How many form fields does [Competitor] require?"
```

### Screenshots & Visual Capture
```
"Capture screenshots of [Competitor]'s ads"
"Screenshot [Competitor]'s Meta ad library"
"Take screenshots of [Competitor]'s top ads"
"Screenshot each platform for [Competitor]"
```

### Reports with Screenshots
```
"Create a competitive report with screenshots for [Competitor]"
"Build a Word doc with [Competitor]'s ad screenshots"
"Generate a PowerPoint of [Competitor]'s advertising"
"Create a presentation deck of [Competitor]'s ads"
```

### Executive Summaries
```
"Create an executive summary of [Competitor]'s ads"
"Generate a 1-page competitive brief for [Competitor]"
"Build a stakeholder report on [Competitor]'s advertising"
"What are the top 3 opportunities vs [Competitor]?"
```

### Competitive Comparison
```
"Compare [Competitor A] vs [Competitor B] ad strategies"
"How does [Competitor]'s Meta differ from their TikTok?"
"Benchmark [Competitor] against industry leaders"
```

### Gap Analysis
```
"What is [Competitor] NOT doing?"
"Find gaps in [Competitor]'s ad strategy"
"What platforms is [Competitor] missing?"
"What messaging angles is [Competitor] not using?"
```

---

## Example Output

**User:** "Full competitive analysis of HubSpot's advertising"

**Output:**
```
HUBSPOT COMPETITIVE AD ANALYSIS
===============================

PLATFORM PRESENCE
-----------------
• Meta: 156 active ads
• TikTok: 43 active ads
• Google: 89 active ads
• LinkedIn: 12 active ads

CREATIVE MIX
------------
• Educational: 42%
• Product Feature: 28%
• Testimonial: 15%
• Offer/Promo: 10%
• Brand Awareness: 5%

TOP MESSAGING THEMES
--------------------
1. "Free CRM" (appears in 34% of ads)
2. "All-in-one platform" (28%)
3. "Grow better" (22%)
4. "Sales and marketing" (19%)

DOMINANT CTAs
-------------
• "Get started free" - 45%
• "Start free trial" - 25%
• "Learn more" - 18%
• "See pricing" - 12%

TARGETING DATA (TikTok)
-----------------------
• Age: 25-44 primary
• Gender: All genders
• Regions: US, UK, Canada, Australia
• Reach: 2.3M - 8.7M unique users per ad

LANDING PAGE STRATEGY
---------------------
• Primary destination: Free tool signup
• Form fields: 3 (email, company, size) — LOW FRICTION
• Trust signals: G2 badges, customer logos, "150,000+ customers"
• Offers: Free forever tier, no credit card required

VIDEO HOOK ANALYSIS (TikTok)
----------------------------
Hook Types Used:
• Question hooks: 35% ("Have you tried...?", "Did you know...?")
• Bold claim: 28% ("This changed everything", "The #1 tool")
• Problem hooks: 18% ("Tired of messy spreadsheets?")
• Direct address: 12% ("Hey marketers!", "If you're in sales...")
• Curiosity gap: 7% ("Wait for it...")

Video Formats:
• Talking head: 45%
• Product demo: 30%
• UGC/authentic: 20%
• Tutorial: 5%

Production Style:
• UGC/Authentic: 65%
• Studio/Polished: 35%

Top Performing Hook Examples:
1. "Stop using spreadsheets for your CRM" (problem hook)
2. "The free tool that replaced our $500/mo software" (bold claim)
3. "POV: You just discovered HubSpot" (pattern interrupt)

COMPETITIVE GAPS (OPPORTUNITIES)
--------------------------------
✗ Heavy educational focus — opportunity for more direct offers
✗ No urgency/scarcity messaging — time-limited offers untapped
✗ No comparison ads — direct competitor callouts could work
✗ Limited video testimonials — authentic customer stories opportunity

SAMPLE AD COPY BY CATEGORY
--------------------------

[Educational]
"5 ways to automate your sales process without losing the personal touch.
Free guide inside."
CTA: Learn More

[Product Feature]
"HubSpot's free CRM gives you everything you need to organize, track,
and nurture your leads and customers."
CTA: Get Started Free

[Testimonial]
"We increased qualified leads by 200% in 6 months using HubSpot's
marketing automation. Here's how."
CTA: Read Case Study
```

---

## Output JSON Structure

### Categorized Ads JSON
```json
{
  "competitor": "Company Name",
  "platform": "Meta",
  "extractionDate": "2025-12-14",
  "totalAds": 45,
  "categorySummary": {
    "offer_promo": 18,
    "testimonial": 12,
    "product_feature": 8,
    "educational": 4,
    "urgency_scarcity": 2,
    "uncategorized": 1
  },
  "ads": [
    {
      "primaryText": "Transform your smile with our award-winning dental implants...",
      "cta": "Book Now",
      "hashtags": ["#DentalImplants"],
      "category": "testimonial",
      "categoryConfidence": "high",
      "allCategoryScores": {
        "testimonial": 3,
        "product_feature": 1,
        "offer_promo": 0
      }
    }
  ]
}
```

### Video Hook Analysis JSON
```json
{
  "competitor": "Company Name",
  "platform": "TikTok",
  "analysisType": "video_hook_analysis",
  "extractionDate": "2025-12-14",
  "totalAds": 43,
  "summary": {
    "hookTypes": {
      "question": 15,
      "bold_claim": 12,
      "problem": 8,
      "direct_address": 5,
      "curiosity_gap": 3
    },
    "videoFormats": {
      "talking_head": 19,
      "product_demo": 13,
      "ugc": 8,
      "tutorial": 3
    },
    "ugcPercentage": 65,
    "topHook": "question",
    "topFormat": "talking_head"
  },
  "ads": [
    {
      "adId": "12345678",
      "detailUrl": "https://library.tiktok.com/ads/detail/?ad_id=12345678",
      "caption": "Have you tried this CRM hack? It saves me 2 hours a day...",
      "hook": {
        "type": "question",
        "confidence": "high",
        "firstLine": "Have you tried this CRM hack?"
      },
      "videoFormat": "talking_head",
      "formatConfidence": "medium",
      "productionStyle": "ugc_authentic",
      "isUGC": true
    }
  ]
}
```

### Landing Page Analysis JSON
```json
{
  "url": "https://example.com/landing",
  "title": "Get Your Free Consultation",
  "headlines": {
    "h1": ["Transform Your Smile Today"],
    "h2": ["Why Choose Us", "Our Process"]
  },
  "ctas": {
    "primary": [{"text": "Book Free Consultation", "type": "button"}],
    "secondary": [{"text": "Learn More", "type": "a"}]
  },
  "forms": [{"fieldCount": 4, "fields": ["name", "email", "phone", "message"]}],
  "trustSignals": ["star_ratings", "review_count", "guarantee"],
  "offers": [{"type": "free_offer"}],
  "structure": {
    "hasVideo": true,
    "hasTestimonials": true,
    "hasPricing": false,
    "hasForm": true,
    "hasChatWidget": true
  }
}
```

---

## Executive Summary Template

```markdown
# Competitive Intelligence: [COMPETITOR NAME]
**Analysis Date:** [DATE]

---

## Key Finding
[COMPETITOR] focuses heavily on [PRIMARY THEME] messaging, with [X]% of ads
promoting [TOP CATEGORY]. **Key opportunity:** [GAP DESCRIPTION].

---

## Advertising Footprint

| Platform | Active Ads | Primary Focus |
|----------|------------|---------------|
| Meta | [X] | [Focus] |
| Google | [X] | [Focus] |
| TikTok | [X] | [Focus] |
| LinkedIn | [X] | [Focus] |

---

## Messaging Strategy
**Top Keywords:** [word1], [word2], [word3]
**Dominant CTA:** "[CTA]" ([X]% of ads)

---

## Creative Mix

| Category | % of Ads |
|----------|----------|
| Offer/Promotional | [X]% |
| Testimonial | [X]% |
| Educational | [X]% |
| Brand Awareness | [X]% |

---

## Strategic Opportunities
1. [Opportunity 1]
2. [Opportunity 2]
3. [Opportunity 3]

---

## Recommended Actions
1. [Action 1]
2. [Action 2]
3. [Action 3]
```

---

## Files Generated

```
/home/claude/competitive-intel/[COMPETITOR]/
├── screenshots/
│   └── [platform screenshots]
├── meta/
│   ├── ads-with-copy.json
│   └── destination-urls.json
├── tiktok/
│   ├── ads-with-copy.json
│   └── video-urls.json
├── google/
│   └── ads-with-copy.json
├── landing-pages/
│   ├── [domain]-page1.json
│   └── landing-page-summary.json
├── analysis/
│   ├── copy-analysis.json
│   ├── category-summary.json
│   └── messaging-insights.md
├── executive-summary.docx
└── report.docx
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Chrome is not running" error | Enable JavaScript: View → Developer → Allow JavaScript from Apple Events |
| Copy extraction returns empty | Increase wait time; ensure ads are loaded; try different selector |
| Wrong categorization | Review scores in output; category uses text patterns |
| Missing CTAs | Not all ads have visible CTAs; check if button text is in image |
| LinkedIn not loading | Log into LinkedIn in Chrome first |
| Landing page blocked | Some sites block automated access; try manual screenshot |
| Landing page dynamic content | Increase wait time; SPAs need longer to render |
| Executive summary too long | Focus on top 3 insights per section; use bullet points |

---

## Best Practices

### Ethical Use
✓ Use insights for inspiration and strategy
✓ Create original ads informed by patterns
✓ Identify gaps to differentiate your brand
✗ Never copy ad creative directly
✗ Don't plagiarize competitor copy
✗ Avoid using competitor trademarks

### Analysis Tips
1. Look for consistency — ads that run repeatedly are working
2. Focus on gaps — what they don't do is often more valuable
3. Track over time — monthly monitoring reveals strategy shifts
4. Cross-reference platforms — different channels show different strategies
5. Analyze landing pages — the ad is only half the story

---

Final reports copied to `/mnt/user-data/outputs/` for download.
