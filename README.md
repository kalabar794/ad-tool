# WEO Ad Tool - Competitive Ads Extractor v3.4

**Enterprise-grade competitive ad intelligence.** Extract ads from Meta, TikTok, Google, and LinkedIn with video/hook analysis, ad copy extraction, creative categorization, landing page analysis, and executive-ready reports.

---

## Install

1. Download `competitive-ads-extractor.zip` from [Releases](../../releases)
2. In Claude Desktop: **Settings → Capabilities → Skills → Upload skill**
3. Select the zip file

That's it. Start asking.

---

## What's New in v3.4

- **Video Hook Analysis** — Identify hook types (question, bold claim, problem, etc.) in TikTok video ads
- **Video Format Detection** — Auto-categorize: UGC, talking head, product demo, before/after, tutorial
- **UGC vs Polished Scoring** — Detect if ads are lo-fi/authentic vs studio-produced
- **Hook Pattern Reports** — See which hook strategies competitors use most

## What's in v3.3

- **Executive Summary 1-Pager** — Auto-generate stakeholder-ready reports
- **Landing Page Analysis** — Extract CTAs, forms, trust signals from landing pages
- **Ad Copy Extraction** — Pull headlines, body text, CTAs, hashtags
- **Creative Categorization** — Auto-tag ads into 8 strategic categories
- **Copy Analysis** — Word frequency, CTA patterns, messaging themes

---

## Platform Support

| Platform | Ad Copy | Categories | Video Hooks | Targeting | Landing Pages |
|----------|---------|------------|-------------|-----------|---------------|
| **Meta** | ✅ Full | ✅ Auto | ❌ N/A | ⚠️ Limited | ✅ |
| **TikTok** | ✅ Full | ✅ Auto | ✅ Full | ✅ Full | ✅ |
| **Google** | ✅ Full | ✅ Auto | ❌ N/A | ⚠️ Region | ✅ |
| **LinkedIn** | ⚠️ Partial | ⚠️ Partial | ❌ N/A | ⚠️ Partial | ⚠️ |

---

## What You Can Do

| Ask Claude... | Get... |
|---------------|--------|
| *"What ads is Nike running on Meta?"* | Every active ad with copy, CTAs, and targeting |
| *"Analyze HubSpot's TikTok hooks"* | Hook types, video formats, UGC vs polished breakdown |
| *"Compare Salesforce vs HubSpot ads"* | Side-by-side competitive analysis |
| *"Create an executive summary"* | 1-page stakeholder-ready PDF/DOCX report |
| *"What video formats does [Competitor] use?"* | UGC, talking head, product demo, tutorial breakdown |
| *"What's their creative mix?"* | Category breakdown (testimonial, promo, educational...) |

---

## Capabilities

### Extract From 4 Platforms
- **Meta** — Facebook & Instagram ads with full copy
- **TikTok** — Ad Library with targeting data and reach metrics
- **Google** — Ads Transparency Center with headlines and descriptions
- **LinkedIn** — Ad Library (requires login)

### Pull Everything
- Ad copy (headlines, body text, descriptions)
- CTAs (Shop Now, Learn More, Book Now...)
- Hashtags and @mentions
- Targeting data (age, gender, location)
- Video URLs and creative assets (TikTok)
- Landing page destinations

### Auto-Categorize Ads (8 Categories)
| Category | What It Captures |
|----------|------------------|
| **Testimonial** | Reviews, social proof, customer stories |
| **Offer/Promo** | Discounts, deals, limited-time offers |
| **Educational** | How-to, tips, guides |
| **Brand Awareness** | Company story, values, mission |
| **Product Feature** | Benefits, specs, capabilities |
| **Urgency/Scarcity** | Time pressure, limited availability |
| **Problem/Solution** | Pain points and resolutions |
| **Comparison** | Us vs them, competitor callouts |

### Analyze Messaging
- Top keywords and phrases (word frequency)
- CTA patterns and distribution
- Messaging themes and angles
- Creative mix breakdown

### Video Hook Analysis (TikTok)
- **Hook Types** — Question, bold claim, problem, result-first, pattern interrupt, social proof, direct address, curiosity gap
- **Video Formats** — UGC, talking head, product demo, before/after, unboxing, tutorial, lifestyle, studio/polished
- **UGC Detection** — Identify authentic vs studio-produced content
- **Hook Pattern Reports** — See which hooks competitors use most

### Landing Page Analysis
- Page headlines (H1, H2, H3)
- Primary and secondary CTAs
- Form fields and friction level
- Trust signals (reviews, badges, guarantees)
- Offers (pricing, discounts, free trials)
- Page features (video, chat widget, testimonials)

### Generate Reports
- **Executive Summary** — 1-page stakeholder-ready brief
- **Word Documents** — Full analysis with embedded screenshots
- **PowerPoint Decks** — Visual presentations for clients
- **Gap Analysis** — Strategic opportunities vs competitor
- **JSON Output** — Structured data for further analysis

---

## Prompts That Work

### Quick Extraction
```
"Extract [Competitor]'s ads from Meta"
"What ads is [Competitor] running?"
"Quick scan of [Competitor]'s advertising"
```

### Deep Analysis
```
"Full competitive analysis of [Competitor]'s advertising"
"Deep dive on [Competitor] across all platforms"
"What messaging is [Competitor] using?"
```

### Ad Copy & Categories
```
"What headlines is [Competitor] testing?"
"Show me [Competitor]'s testimonial ads"
"What percentage of ads are promotional?"
"What's [Competitor]'s creative mix?"
```

### Targeting & Reach
```
"Who is [Competitor] targeting on TikTok?"
"What demographics does [Competitor] reach?"
"What age groups is [Competitor] targeting?"
```

### Video & Hook Analysis
```
"Analyze [Competitor]'s TikTok video hooks"
"What hook types does [Competitor] use?"
"Show me [Competitor]'s UGC vs polished ads"
"What video formats is [Competitor] running?"
"What percentage of ads are UGC style?"
```

### Landing Pages
```
"Analyze [Competitor]'s landing pages"
"What CTAs are on [Competitor]'s landing pages?"
"What trust signals does [Competitor] use?"
"How many form fields does [Competitor] require?"
```

### Screenshots & Reports
```
"Capture screenshots of [Competitor]'s ads"
"Create a Word report with screenshots"
"Generate a PowerPoint of [Competitor]'s advertising"
"Create an executive summary for stakeholders"
```

### Comparisons & Gaps
```
"Compare [Company A] vs [Company B] ads"
"What is [Competitor] NOT doing?"
"Find gaps in [Competitor]'s ad strategy"
"What messaging angles is [Competitor] missing?"
```

---

## Example Output

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
1. "Free CRM" (34% of ads)
2. "All-in-one platform" (28%)
3. "Grow better" (22%)

DOMINANT CTAs
-------------
• "Get started free" - 45%
• "Start free trial" - 25%
• "Learn more" - 18%

VIDEO HOOK ANALYSIS (TikTok)
----------------------------
Hook Types:
• Question: 35% ("Have you tried...?")
• Bold claim: 28% ("This changed everything")
• Problem: 18% ("Tired of spreadsheets?")

Video Formats:
• Talking head: 45%
• Product demo: 30%
• UGC: 20%

UGC vs Polished: 65% authentic / 35% studio

COMPETITIVE GAPS (OPPORTUNITIES)
--------------------------------
✗ No urgency/scarcity messaging
✗ No comparison ads
✗ Limited video testimonials
```

---

## Requirements

- Claude Desktop (Pro, Max, Team, or Enterprise)
- Code execution enabled in Settings → Capabilities
- For Chrome automation: View → Developer → Allow JavaScript from Apple Events
- For LinkedIn: Log into LinkedIn in Chrome first

---

## Technical Details

### CLI Tool (Optional)
This repo also includes a Node.js CLI tool for programmatic extraction:

```bash
npm install
node src/cli.js extract "https://example.com" --format json
node src/cli.js analyze "Your ad copy text here"
```

### Security
- SSRF protection (blocks internal/private IPs)
- Path traversal protection
- Input validation on all URLs

---

## Files in This Repo

```
├── competitive-ads-extractor/
│   └── SKILL.md              # Claude Desktop skill (v3.3)
├── competitive-ads-extractor.zip  # Ready to upload
├── src/
│   ├── index.js              # Main module
│   ├── extractor.js          # Ad extraction logic
│   ├── analyzer.js           # Analysis features
│   ├── utils.js              # Utilities
│   └── cli.js                # Command-line interface
├── SECURITY.md               # Security documentation
└── README.md                 # This file
```

---

## License

Apache-2.0
