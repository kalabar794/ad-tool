# Ad Tool - Competitive Ad Intelligence

> **Extract and analyze competitor ads from Meta, TikTok, Google, and LinkedIn Ad Libraries**

This toolkit helps marketing teams gather competitive intelligence by extracting ads from public ad libraries. No coding experience required for the main features.

---

## What Can This Tool Do?

| Feature | Description |
|---------|-------------|
| **Extract Competitor Ads** | Pull ads from Meta (Facebook/Instagram), TikTok, Google, and LinkedIn |
| **Ad Copy Analysis** | See exactly what text/messaging competitors are using |
| **Creative Categorization** | Auto-tag ads as testimonial, promotional, educational, etc. |
| **Landing Page Analysis** | Analyze where competitors send their ad traffic |
| **Executive Reports** | Generate 1-page summaries for stakeholder presentations |

---

## Quick Start Guide (5 Minutes)

### Step 1: Open Chrome and Enable JavaScript Access

**On Mac:**
1. Open **Google Chrome**
2. Click **View** in the menu bar
3. Click **Developer**
4. Click **Allow JavaScript from Apple Events**

**On Windows:**
- This step is not required on Windows

### Step 2: Go to an Ad Library

Choose the platform you want to research:

| Platform | URL | What to Search |
|----------|-----|----------------|
| **Meta (Facebook/Instagram)** | [facebook.com/ads/library](https://www.facebook.com/ads/library) | Competitor name or page |
| **TikTok** | [library.tiktok.com](https://library.tiktok.com) | Advertiser name or keyword |
| **Google** | [adstransparency.google.com](https://adstransparency.google.com) | Domain (e.g., competitor.com) |
| **LinkedIn** | [linkedin.com/ad-library](https://www.linkedin.com/ad-library/) | Company name |

### Step 3: Open Developer Tools

1. On the ad library page, **right-click** anywhere
2. Click **Inspect** (or press `F12` on Windows, `Cmd+Option+I` on Mac)
3. Click the **Console** tab at the top

### Step 4: Run the Extraction Script

1. Open the file `competitive-ads-extractor.md` in this repository
2. Find the script for your platform (Meta, TikTok, or Google)
3. **Copy** the entire script
4. **Paste** it into the Console
5. Press **Enter**
6. The extracted data will appear - **copy and save it**

---

## Detailed Instructions by Platform

### Extracting Meta (Facebook/Instagram) Ads

**Step-by-step:**

1. Go to [facebook.com/ads/library](https://www.facebook.com/ads/library)
2. In the search box, type your competitor's name
3. Select their page from the dropdown
4. Wait for ads to load (scroll down to load more)
5. Open Console (`Right-click → Inspect → Console`)
6. Copy this script and paste it:

```javascript
// Meta Ad Library - Extract All Ads
(function() {
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

    ads.push({
      adText: primaryText.substring(0, 500),
      callToAction: ctaMatch ? ctaMatch[0] : 'None found',
      rawPreview: text.substring(0, 300)
    });
  });

  console.log('=== EXTRACTED ' + ads.length + ' ADS ===');
  console.log(JSON.stringify(ads, null, 2));
  return ads;
})();
```

7. Press Enter
8. Copy the output (the list of ads that appears)

---

### Extracting TikTok Ads

**Step-by-step:**

1. Go to [library.tiktok.com](https://library.tiktok.com)
2. Search for your competitor's name
3. Wait for results to load
4. Open Console (`Right-click → Inspect → Console`)
5. Copy this script and paste it:

```javascript
// TikTok Ad Library - Extract All Ads
(function() {
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
      !l.includes('Last shown')
    );

    ads.push({
      adId: adId,
      caption: lines[0]?.trim() || '',
      detailUrl: link.href
    });
  });

  const unique = [...new Map(ads.map(a => [a.adId, a])).values()];
  console.log('=== EXTRACTED ' + unique.length + ' ADS ===');
  console.log(JSON.stringify(unique, null, 2));
  return unique;
})();
```

6. Press Enter
7. Copy the output

---

### Extracting Google Ads

**Step-by-step:**

1. Go to [adstransparency.google.com](https://adstransparency.google.com)
2. Search for competitor's domain (e.g., `competitor.com`)
3. Wait for ads to load
4. Open Console (`Right-click → Inspect → Console`)
5. Copy this script and paste it:

```javascript
// Google Ads - Extract All Ads
(function() {
  const ads = [];
  const seen = new Set();

  document.querySelectorAll('div').forEach(el => {
    const content = el.innerText;
    if (content.length < 50 || content.length > 500) return;

    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return;

    const sig = lines[0];
    if (seen.has(sig)) return;
    seen.add(sig);

    ads.push({
      headline: lines[0] || '',
      description: lines.filter(l => l.length > 50)[0] || '',
      rawText: content.substring(0, 300)
    });
  });

  console.log('=== EXTRACTED ' + ads.length + ' ADS ===');
  console.log(JSON.stringify(ads, null, 2));
  return ads;
})();
```

6. Press Enter
7. Copy the output

---

## Understanding Your Results

After running a script, you'll get output that looks like this:

```json
[
  {
    "adText": "Transform your smile with our award-winning dental implants...",
    "callToAction": "Book Now"
  },
  {
    "adText": "Limited time offer: 50% off your first consultation...",
    "callToAction": "Learn More"
  }
]
```

**What each field means:**

| Field | Description |
|-------|-------------|
| `adText` | The main message/copy of the ad |
| `callToAction` | The button text (Shop Now, Learn More, etc.) |
| `headline` | The main headline of the ad |
| `description` | The body text of the ad |
| `adId` | Unique identifier for the ad |
| `detailUrl` | Link to see more details about the ad |

---

## Saving Your Results

### Option 1: Save as a Text File
1. Copy the output from the Console
2. Open Notepad (Windows) or TextEdit (Mac)
3. Paste the content
4. Save as `competitor-ads.json`

### Option 2: Save to a Spreadsheet
1. Copy the output
2. Go to [json-csv.com](https://json-csv.com)
3. Paste your JSON data
4. Download as CSV/Excel

### Option 3: Use with ChatGPT/Claude
1. Copy the output
2. Paste into ChatGPT or Claude
3. Ask: *"Analyze these competitor ads and identify their main messaging themes"*

---

## Creating an Executive Summary

After extracting ads, you can create a professional summary:

### What to Include:

1. **Competitor Overview**
   - Company name
   - Platforms they advertise on
   - Total number of active ads

2. **Messaging Analysis**
   - Top themes/angles they use
   - Common words and phrases
   - Types of offers (discounts, free trials, etc.)

3. **Creative Mix**
   - % promotional ads
   - % testimonial ads
   - % educational content

4. **Strategic Opportunities**
   - What they're NOT doing (gaps)
   - Platforms they're missing
   - Messaging angles they don't use

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **"No ads found"** | Scroll down on the page first to load more ads, then run the script again |
| **Script shows error** | Make sure you copied the entire script including the first `(` and last `);` |
| **Console won't open** | Try pressing `F12` or `Cmd+Option+I` (Mac) |
| **LinkedIn not loading** | Log into LinkedIn first, then go to the Ad Library |
| **Page looks different** | Ad libraries update frequently; check `competitive-ads-extractor.md` for latest scripts |

---

## Need More Advanced Features?

The `competitive-ads-extractor.md` file contains:
- Full extraction scripts with categorization
- Landing page analysis scripts
- Word frequency analysis
- Executive summary templates
- Complete workflow guides

---

## For Developers

If you want to run automated extractions, this repo also includes a Node.js tool:

```bash
# Install dependencies
npm install

# Extract ads from any URL
npm run extract -- https://example.com

# Analyze ad content
npm run analyze -- "Buy now! Limited time offer!"
```

See `ads-extractor.skill` for the full API documentation.

---

## Files in This Repository

| File | What It's For |
|------|---------------|
| `README.md` | This guide - start here |
| `competitive-ads-extractor.md` | Advanced scripts and workflows |
| `ads-extractor.skill` | Technical skill definition |
| `src/` | Node.js source code (for developers) |
| `package.json` | Dependencies (for developers) |

---

## Questions?

If you run into issues:
1. Check the Troubleshooting section above
2. Review `competitive-ads-extractor.md` for detailed scripts
3. Open an issue on this GitHub repository

---

## License

Apache-2.0 - Free to use for commercial and personal projects.
