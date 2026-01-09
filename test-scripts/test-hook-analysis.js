// Test Video Hook Analysis logic from SKILL.md v3.4

const hookPatterns = {
  question: [/^(have you|do you|did you|what if|why do|how do|ever wonder|want to)/i, /\?$/],
  bold_claim: [/changed my life|game.?changer|finally|the secret|you need|must have|#1|best/i],
  problem: [/^(tired of|sick of|struggling|stop|don't|can't stand|hate when)/i],
  result_first: [/^(before|after|results|transformation|went from|lost \d+|gained \d+)/i],
  pattern_interrupt: [/^(stop\s+\w|hold on|pov:|ok but|no way)/i, /^wait[^f]/i],
  social_proof: [/viral|million|views|everyone|trending|famous|went viral/i],
  direct_address: [/^(hey|attention|calling all|if you're a|this is for)/i],
  curiosity_gap: [/wait for it|you won't believe|secret|hack|trick|nobody knows/i, /^wait\s*for/i]
};

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

// HOOK TYPE TESTS
console.log("=== HOOK TYPE TEST RESULTS ===\n");

const hookTestCases = [
  { text: "Have you ever tried this product?", expected: "question" },
  { text: "Did you know this secret hack?", expected: "question" },
  { text: "This changed my life forever - the #1 product", expected: "bold_claim" },
  { text: "Tired of slow results? Stop wasting time", expected: "problem" },
  { text: "Before and after transformation results", expected: "result_first" },
  { text: "POV: you just discovered this", expected: "pattern_interrupt" },
  { text: "Wait stop hold on - no way!", expected: "pattern_interrupt" },
  { text: "This went viral with 10 million views", expected: "social_proof" },
  { text: "Hey marketers! Attention - this is for you", expected: "direct_address" },
  { text: "Wait for it... you won't believe this secret", expected: "curiosity_gap" },
];

let hookPassed = 0;
let hookFailed = 0;

hookTestCases.forEach((tc, i) => {
  const result = detectHook(tc.text);
  const status = result.type === tc.expected ? "✅ PASS" : "❌ FAIL";

  if (result.type === tc.expected) {
    hookPassed++;
  } else {
    hookFailed++;
  }

  console.log(`Hook Test ${i + 1}: ${status}`);
  console.log(`  Text: "${tc.text}"`);
  console.log(`  Expected: ${tc.expected}, Got: ${result.type} (${result.confidence})`);
  console.log("");
});

console.log(`Hook Tests: ${hookPassed}/${hookTestCases.length} passed\n`);

// VIDEO FORMAT TESTS
console.log("=== VIDEO FORMAT TEST RESULTS ===\n");

const formatTestCases = [
  { text: "My honest experience trying this product @brand", expected: "ugc" },
  { text: "Let me tell you about this - here's the thing, listen up", expected: "talking_head" },
  { text: "Watch this - let me show you how it works", expected: "product_demo" },
  { text: "Day 30 transformation results - before and after", expected: "before_after" },
  { text: "Unboxing my first impressions - just arrived!", expected: "unboxing" },
  { text: "Step 1: Tutorial guide - easy way simple trick", expected: "tutorial" },
  { text: "My morning routine aesthetic - daily routine day in my life", expected: "lifestyle" },
  { text: "Professional studio brand official content", expected: "studio_polished" },
];

let formatPassed = 0;
let formatFailed = 0;

formatTestCases.forEach((tc, i) => {
  const result = detectFormat(tc.text);
  const status = result.format === tc.expected ? "✅ PASS" : "❌ FAIL";

  if (result.format === tc.expected) {
    formatPassed++;
  } else {
    formatFailed++;
  }

  console.log(`Format Test ${i + 1}: ${status}`);
  console.log(`  Text: "${tc.text.substring(0, 50)}..."`);
  console.log(`  Expected: ${tc.expected}, Got: ${result.format} (${result.confidence})`);
  console.log("");
});

console.log(`Format Tests: ${formatPassed}/${formatTestCases.length} passed\n`);

// PRODUCTION STYLE TESTS
console.log("=== PRODUCTION STYLE TEST RESULTS ===\n");

const styleTestCases = [
  { text: "POV storytime real honest no filter unedited content", expected: "ugc_authentic" },
  { text: "Professional studio cinematic brand official ad", expected: "studio_polished" },
  { text: "Just some random video content here", expected: "mixed" },
];

let stylePassed = 0;
let styleFailed = 0;

styleTestCases.forEach((tc, i) => {
  const result = detectProductionStyle(tc.text);
  const status = result.style === tc.expected ? "✅ PASS" : "❌ FAIL";

  if (result.style === tc.expected) {
    stylePassed++;
  } else {
    styleFailed++;
  }

  console.log(`Style Test ${i + 1}: ${status}`);
  console.log(`  Text: "${tc.text.substring(0, 50)}..."`);
  console.log(`  Expected: ${tc.expected}, Got: ${result.style}`);
  console.log(`  UGC Score: ${result.ugcScore}, Polished Score: ${result.polishedScore}`);
  console.log("");
});

console.log(`Style Tests: ${stylePassed}/${styleTestCases.length} passed\n`);

// SUMMARY
console.log("=== OVERALL SUMMARY ===");
const totalPassed = hookPassed + formatPassed + stylePassed;
const totalTests = hookTestCases.length + formatTestCases.length + styleTestCases.length;
console.log(`Total: ${totalPassed}/${totalTests} tests passed`);

process.exit((hookFailed + formatFailed + styleFailed) > 0 ? 1 : 0);
