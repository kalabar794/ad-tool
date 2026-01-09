# ad-tool

A comprehensive toolkit for extracting and analyzing advertisements from various sources. Includes two complementary skills for different use cases.

## Skills Overview

| Skill | Purpose | Method | Best For |
|-------|---------|--------|----------|
| `ads-extractor.skill` | Extract ads from any HTML/URL/file | Automated (Node.js) | General web scraping, batch processing |
| `competitive-ads-extractor.md` | Extract from Meta/TikTok/Google/LinkedIn Ad Libraries | Browser-based (DevTools) | Competitive intelligence, ad library research |

---

## 1. Ads Extractor (Node.js)

A Node.js-based tool for extracting and analyzing advertisements from web pages, documents, and text.

### Features

- **Extract Ads**: Detect and extract advertisements from URLs, files, or raw text
- **Analyze Ads**: Perform sentiment analysis, keyword extraction, targeting analysis, CTA detection, and compliance checking
- **Filter Ads**: Filter extracted ads by categories, date range, or confidence score
- **Export Ads**: Export results to JSON, CSV, XLSX, or PDF formats

### Installation

```bash
npm install
```

### CLI Commands

```bash
# Extract ads from a URL
npm run extract -- https://example.com

# Extract ads from a file
npm run extract -- ./page.html -t file

# Analyze ad content
npm run analyze -- "Buy now! Limited time offer!" -a sentiment,keywords,cta

# Filter extracted ads
node src/cli.js filter ads.json -c ecommerce --min-confidence 0.5

# Export to different formats
node src/cli.js export ads.json output.xlsx -f xlsx
```

### Programmatic Usage

```javascript
const AdsExtractorSkill = require('./src/index');

const extractor = new AdsExtractorSkill();

// Extract ads from URL
const ads = await extractor.extractAds('https://example.com', {
  sourceType: 'url',
  outputFormat: 'json',
  includeMetadata: true
});

// Analyze an advertisement
const analysis = await extractor.analyzeAd(adContent, [
  'sentiment',
  'targeting',
  'keywords',
  'cta',
  'compliance'
]);

// Filter ads
const filtered = extractor.filterAds(ads, {
  categories: ['ecommerce'],
  minConfidence: 0.5
});

// Export ads
await extractor.exportAds(ads, 'pdf', './report.pdf');
```

### Skill Configuration

The `ads-extractor.skill` file contains the skill definition with:

- **Skills**: Available operations (extract-ads, analyze-ad, filter-ads, export-ads)
- **Dependencies**: Required npm packages
- **Patterns**: CSS selectors and text indicators for ad detection
- **Config**: Runtime settings (timeouts, retry attempts, caching)

---

## 2. Competitive Ads Extractor (Browser-based)

Enterprise-grade multi-platform competitive ad intelligence. Extract ads from Meta, TikTok, Google, and LinkedIn Ad Libraries using browser DevTools.

### Features (v3.3)

- **Multi-Platform Support**: Meta Ad Library, TikTok Ad Library, Google Ads Transparency, LinkedIn Ad Library
- **Ad Copy Extraction**: Pull actual text/copy from ads for messaging analysis
- **Creative Categorization**: Auto-tag ads (testimonial, offer, educational, brand, etc.)
- **Landing Page Analysis**: Extract and analyze competitor landing pages
- **Executive Summaries**: Generate stakeholder-ready 1-page reports
- **Screenshot Capture**: Visual documentation of competitor ads

### Platform Support

| Platform | Ad Copy | Categorization | Screenshots | Targeting | Landing Pages |
|----------|---------|----------------|-------------|-----------|---------------|
| Meta | Full text | Auto-tagged | Full page | Limited | Extract |
| TikTok | Captions | Auto-tagged | Full page | Full | Extract |
| Google | Headlines/Desc | Auto-tagged | Full page | Region | Extract |
| LinkedIn | When available | When available | Full page | When available | Limited |

### Prerequisites

1. Open Chrome
2. Go to **View → Developer → Allow JavaScript from Apple Events**
3. For LinkedIn: Log into LinkedIn in Chrome first

### Usage

See `competitive-ads-extractor.md` for:
- Complete JavaScript extraction scripts
- Step-by-step workflow guides
- Output templates and JSON structures
- Executive summary generation
- Troubleshooting guide

### Example Prompts

```
"Quick scan of [competitor]'s ads"
"Deep analysis of [competitor]'s ad strategy"
"Create an executive summary 1-pager for [competitor]"
"What CTAs is [competitor] using most?"
```

---

## Project Structure

```
ad-tool/
├── ads-extractor.skill          # Node.js skill definition (JSON)
├── competitive-ads-extractor.md # Browser-based skill (Markdown + JS)
├── package.json                 # Node.js dependencies
├── src/
│   ├── index.js                 # Main entry point
│   ├── extractor.js             # Core extraction logic
│   ├── analyzer.js              # Analysis module
│   ├── utils.js                 # Utility functions
│   └── cli.js                   # Command-line interface
├── README.md
└── LICENSE
```

## License

Apache-2.0
