/**
 * Utility functions for Ads Extractor
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Load skill configuration from ads-extractor.skill file
 * @returns {Object} Skill configuration
 */
function loadSkillConfig() {
  try {
    const skillPath = path.join(__dirname, '..', 'ads-extractor.skill');
    const content = require('fs').readFileSync(skillPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn('Could not load skill config, using defaults');
    return {
      patterns: {
        adSelectors: [
          "[class*='ad-']",
          "[class*='advertisement']",
          "[class*='sponsored']"
        ],
        adIndicators: ['sponsored', 'advertisement', 'ad', 'promoted']
      },
      config: {
        maxConcurrentRequests: 5,
        requestTimeout: 30000,
        retryAttempts: 3
      }
    };
  }
}

/**
 * Export ads to various formats
 * @param {Array} ads - Array of ads to export
 * @param {string} format - Export format (json, csv, xlsx, pdf)
 * @param {string} outputPath - Optional output file path
 * @returns {Promise<string|Buffer>} Exported data
 */
async function exportToFormat(ads, format, outputPath = null) {
  let data;

  switch (format) {
    case 'json':
      data = JSON.stringify(ads, null, 2);
      break;
    case 'csv':
      data = await exportToCSV(ads);
      break;
    case 'xlsx':
      data = await exportToXLSX(ads);
      break;
    case 'pdf':
      data = await exportToPDF(ads);
      break;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }

  if (outputPath) {
    await fs.writeFile(outputPath, data);
    return outputPath;
  }

  return data;
}

/**
 * Export to CSV format
 * @private
 */
async function exportToCSV(ads) {
  const { stringify } = require('csv-stringify/sync');

  if (ads.length === 0) return '';

  // Flatten nested objects for CSV
  const flattened = ads.map(ad => flattenObject(ad));

  return stringify(flattened, {
    header: true,
    quoted: true
  });
}

/**
 * Export to XLSX format
 * @private
 */
async function exportToXLSX(ads) {
  const XLSX = require('xlsx');

  const flattened = ads.map(ad => flattenObject(ad));
  const worksheet = XLSX.utils.json_to_sheet(flattened);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ads');

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

/**
 * Export to PDF format
 * @private
 */
async function exportToPDF(ads) {
  const PDFDocument = require('pdfkit');

  return new Promise((resolve, reject) => {
    const chunks = [];
    const doc = new PDFDocument();

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Title
    doc.fontSize(20).text('Extracted Advertisements Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).text(`Generated: ${new Date().toISOString()}`, { align: 'center' });
    doc.moveDown(2);

    // Ads
    ads.forEach((ad, index) => {
      doc.fontSize(14).text(`Ad #${index + 1}`, { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(10);
      if (ad.content) {
        doc.text(`Content: ${ad.content.substring(0, 200)}${ad.content.length > 200 ? '...' : ''}`);
      }
      if (ad.category) {
        doc.text(`Category: ${ad.category}`);
      }
      if (ad.confidence !== undefined) {
        doc.text(`Confidence: ${Math.round(ad.confidence * 100)}%`);
      }
      if (ad.source) {
        doc.text(`Source: ${ad.source}`);
      }

      doc.moveDown();

      // Add page break if needed
      if (doc.y > 700 && index < ads.length - 1) {
        doc.addPage();
      }
    });

    doc.end();
  });
}

/**
 * Flatten nested object for CSV/XLSX export
 * @private
 */
function flattenObject(obj, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}_${key}` : key;

    if (value === null || value === undefined) {
      result[newKey] = '';
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else if (Array.isArray(value)) {
      result[newKey] = value.join(', ');
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in ms
 * @returns {Promise} Result of the function
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

/**
 * Sleep for specified duration
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Chunk array into smaller arrays
 * @param {Array} array - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array} Array of chunks
 */
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

module.exports = {
  loadSkillConfig,
  exportToFormat,
  retryWithBackoff,
  sleep,
  chunkArray,
  flattenObject
};
