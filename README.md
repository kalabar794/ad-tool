# ad-tool

A powerful tool for extracting and analyzing advertisements from various sources including web pages, documents, and media files.

## Features

- **Extract Ads**: Detect and extract advertisements from URLs, files, or raw text
- **Analyze Ads**: Perform sentiment analysis, keyword extraction, targeting analysis, CTA detection, and compliance checking
- **Filter Ads**: Filter extracted ads by categories, date range, or confidence score
- **Export Ads**: Export results to JSON, CSV, XLSX, or PDF formats

## Installation

```bash
npm install
```

## Usage

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

## Skill Configuration

The `ads-extractor.skill` file contains the skill definition with:

- **Skills**: Available operations (extract-ads, analyze-ad, filter-ads, export-ads)
- **Dependencies**: Required npm packages
- **Patterns**: CSS selectors and text indicators for ad detection
- **Config**: Runtime settings (timeouts, retry attempts, caching)

## License

Apache-2.0