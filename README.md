# WEO Ad Tool - Competitive Ads Extractor

A Claude Desktop skill for extracting competitor ads from Meta, TikTok, Google, and LinkedIn Ad Libraries.

## Setup

1. Download this repository
2. Copy `competitive-ads-extractor.md` to your Claude Desktop skills folder:
   - **Mac**: `~/.claude/skills/`
   - **Windows**: `%APPDATA%\Claude\skills\`
3. Restart Claude Desktop

---

## What This Skill Can Do

### Platforms Supported
- **Meta** (Facebook & Instagram ads)
- **TikTok** (TikTok Ad Library)
- **Google** (Google Ads Transparency Center)
- **LinkedIn** (LinkedIn Ad Library)

### Extraction Capabilities
- Pull all active ads from a competitor
- Extract ad copy/text and messaging
- Capture CTAs (Shop Now, Learn More, etc.)
- Get targeting data (age, gender, location)
- Find video URLs and creative assets
- Extract landing page URLs

### Analysis Features
- **Ad Categorization** - Auto-tag ads as promotional, testimonial, educational, brand awareness, urgency, problem/solution, or comparison
- **Messaging Analysis** - Identify top keywords, phrases, and themes
- **CTA Patterns** - See which calls-to-action competitors use most
- **Creative Mix** - Breakdown of ad types (% promo vs % testimonial, etc.)
- **Landing Page Analysis** - Analyze where competitors send traffic

### Reporting
- Executive summary 1-pagers
- Platform-by-platform breakdowns
- Competitive gap analysis
- Strategic recommendations

---

## Optimal Prompts

### Quick Scans
```
"Quick scan of [Competitor]'s ads"
"What ads is [Competitor] running on Meta?"
"Show me [Competitor]'s TikTok ads"
```

### Deep Analysis
```
"Deep dive on [Competitor]'s ad strategy across all platforms"
"Full competitive analysis of [Competitor]'s advertising"
"Analyze [Competitor]'s messaging and creative strategy"
```

### Specific Insights
```
"What CTAs is [Competitor] using most?"
"Show me [Competitor]'s testimonial ads"
"What offers is [Competitor] promoting?"
"What landing pages is [Competitor] driving traffic to?"
```

### Comparisons
```
"Compare [Competitor A] vs [Competitor B] ad strategies"
"How does [Competitor]'s Meta strategy differ from their TikTok?"
```

### Executive Reports
```
"Create an executive summary of [Competitor]'s ads"
"Generate a 1-page competitive brief for [Competitor]"
"What are the top 3 opportunities vs [Competitor]?"
```

### By Platform
```
"Extract all [Competitor] ads from Meta Ad Library"
"Get [Competitor]'s Google Ads"
"Pull [Competitor]'s TikTok ad library"
"Find [Competitor] on LinkedIn Ad Library"
```

### By Ad Type
```
"Show me [Competitor]'s promotional/discount ads"
"Find [Competitor]'s testimonial and review ads"
"What educational content is [Competitor] running?"
```

---

## Example Output

When you ask for a competitive analysis, you'll get:

- **Ad Count** - Total ads per platform
- **Top Messages** - Most common words and phrases
- **Creative Mix** - % breakdown by ad type
- **CTA Strategy** - Which buttons they use
- **Offers** - Discounts, free trials, promotions
- **Gaps** - What they're NOT doing (your opportunities)

---

## Usage

Just ask Claude. No coding required.

```
"Extract ads from Nike on Meta"
```

Claude handles everything automatically.

---

## License

Apache-2.0
