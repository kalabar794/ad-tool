#!/usr/bin/env node

/**
 * Ads Extractor CLI
 * Command-line interface for extracting and analyzing advertisements
 */

const { Command } = require('commander');
const AdsExtractorSkill = require('./index');
const fs = require('fs').promises;

const program = new Command();

program
  .name('ads-extractor')
  .description('Extract and analyze advertisements from various sources')
  .version('1.0.0');

// Extract command
program
  .command('extract')
  .description('Extract advertisements from a source')
  .argument('<source>', 'URL, file path, or - for stdin')
  .option('-t, --type <type>', 'Source type: url, file, or text', 'url')
  .option('-f, --format <format>', 'Output format: json, csv, or text', 'json')
  .option('-o, --output <path>', 'Output file path')
  .option('--no-metadata', 'Exclude metadata from output')
  .action(async (source, options) => {
    try {
      const extractor = new AdsExtractorSkill();

      // Handle stdin
      let actualSource = source;
      if (source === '-') {
        actualSource = await readStdin();
        options.type = 'text';
      }

      const ads = await extractor.extractAds(actualSource, {
        sourceType: options.type,
        outputFormat: options.format,
        includeMetadata: options.metadata
      });

      const output = options.format === 'json'
        ? JSON.stringify(ads, null, 2)
        : ads;

      if (options.output) {
        await fs.writeFile(options.output, output);
        console.log(`Output saved to: ${options.output}`);
      } else {
        console.log(output);
      }

      console.error(`\nExtracted ${Array.isArray(ads) ? ads.length : 0} advertisement(s)`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Analyze command
program
  .command('analyze')
  .description('Analyze advertisement content')
  .argument('<content>', 'Ad content or file path')
  .option('-a, --analysis <types>', 'Analysis types (comma-separated)', 'sentiment,keywords')
  .option('-o, --output <path>', 'Output file path')
  .action(async (content, options) => {
    try {
      const extractor = new AdsExtractorSkill();

      // Check if content is a file path
      let actualContent = content;
      try {
        const stats = await fs.stat(content);
        if (stats.isFile()) {
          actualContent = await fs.readFile(content, 'utf-8');
        }
      } catch {
        // Not a file, use as content
      }

      const analysisTypes = options.analysis.split(',').map(t => t.trim());
      const results = await extractor.analyzeAd(actualContent, analysisTypes);

      const output = JSON.stringify(results, null, 2);

      if (options.output) {
        await fs.writeFile(options.output, output);
        console.log(`Analysis saved to: ${options.output}`);
      } else {
        console.log(output);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Filter command
program
  .command('filter')
  .description('Filter extracted ads')
  .argument('<input>', 'Input JSON file with extracted ads')
  .option('-c, --categories <cats>', 'Filter by categories (comma-separated)')
  .option('--min-confidence <score>', 'Minimum confidence score (0-1)', parseFloat)
  .option('-o, --output <path>', 'Output file path')
  .action(async (input, options) => {
    try {
      const extractor = new AdsExtractorSkill();

      const inputData = await fs.readFile(input, 'utf-8');
      const ads = JSON.parse(inputData);

      const filters = {};
      if (options.categories) {
        filters.categories = options.categories.split(',').map(c => c.trim());
      }
      if (options.minConfidence !== undefined) {
        filters.minConfidence = options.minConfidence;
      }

      const filtered = extractor.filterAds(ads, filters);
      const output = JSON.stringify(filtered, null, 2);

      if (options.output) {
        await fs.writeFile(options.output, output);
        console.log(`Filtered ads saved to: ${options.output}`);
      } else {
        console.log(output);
      }

      console.error(`\nFiltered: ${ads.length} -> ${filtered.length} ads`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Export command
program
  .command('export')
  .description('Export ads to different formats')
  .argument('<input>', 'Input JSON file with ads')
  .argument('<output>', 'Output file path')
  .option('-f, --format <format>', 'Export format: json, csv, xlsx, pdf', 'json')
  .action(async (input, output, options) => {
    try {
      const extractor = new AdsExtractorSkill();

      const inputData = await fs.readFile(input, 'utf-8');
      const ads = JSON.parse(inputData);

      await extractor.exportAds(ads, options.format, output);
      console.log(`Exported ${ads.length} ads to: ${output}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Utility function to read from stdin
async function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', () => {
      let chunk;
      while ((chunk = process.stdin.read()) !== null) {
        data += chunk;
      }
    });
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
}

program.parse();
