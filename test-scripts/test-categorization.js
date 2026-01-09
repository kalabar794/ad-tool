// Test categorization logic from SKILL.md
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

// Test cases
const testCases = [
  { text: "★★★★★ I love this product! 500+ happy customers say it's amazing", expected: "testimonial" },
  { text: "50% off limited time offer - don't miss out! Save $100 today", expected: "offer_promo" },
  { text: "How to improve your marketing in 5 easy steps - discover tips", expected: "educational" },
  { text: "Our story: Family-owned since 1985, our mission is quality", expected: "brand_awareness" },
  { text: "Features include: powered by AI technology, benefits your workflow", expected: "product_feature" },
  { text: "Ends soon! Last chance - today only, hurry before it's gone", expected: "urgency_scarcity" },
  { text: "Tired of struggling? Finally say goodbye to problems - solution here", expected: "problem_solution" },
  { text: "Better than competitors - vs the rest, switch from old tools", expected: "comparison" },
  { text: "Random text with no ad patterns at all", expected: "uncategorized" }
];

console.log("=== CATEGORIZATION TEST RESULTS ===\n");

let passed = 0;
let failed = 0;

testCases.forEach((tc, i) => {
  const result = categorize(tc.text);
  const status = result.primary === tc.expected ? "✅ PASS" : "❌ FAIL";

  if (result.primary === tc.expected) {
    passed++;
  } else {
    failed++;
  }

  console.log(`Test ${i + 1}: ${status}`);
  console.log(`  Text: "${tc.text.substring(0, 60)}..."`);
  console.log(`  Expected: ${tc.expected}`);
  console.log(`  Got: ${result.primary} (confidence: ${result.confidence})`);
  console.log(`  Scores: ${JSON.stringify(result.scores)}`);
  console.log("");
});

console.log("=== SUMMARY ===");
console.log(`Passed: ${passed}/${testCases.length}`);
console.log(`Failed: ${failed}/${testCases.length}`);

process.exit(failed > 0 ? 1 : 0);
