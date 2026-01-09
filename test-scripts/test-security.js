// Test security features in extractor.js
const path = require('path');

// Simulate the validateUrl function from extractor.js
function validateUrl(urlString) {
  try {
    const parsed = new URL(urlString);

    // Only allow HTTP and HTTPS
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Only HTTP and HTTPS protocols are allowed');
    }

    const hostname = parsed.hostname.toLowerCase();

    // Block internal/private addresses
    const blockedPatterns = [
      /^localhost$/i,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^169\.254\./,
      /^0\./,
      /^\[::1\]$/,
      /^metadata\.google/i,
      /^169\.254\.169\.254/
    ];

    for (const pattern of blockedPatterns) {
      if (pattern.test(hostname)) {
        throw new Error('Access to internal/private addresses is not allowed');
      }
    }

    return parsed.href;
  } catch (error) {
    throw error;
  }
}

// Simulate path traversal check
function validateFilePath(filePath) {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, filePath);

  if (!absolutePath.startsWith(cwd + path.sep) && absolutePath !== cwd) {
    throw new Error('Access denied: path traversal attempt detected');
  }

  return absolutePath;
}

console.log("=== SSRF PROTECTION TESTS ===\n");

const ssrfTestCases = [
  // Should be BLOCKED
  { url: "http://localhost/admin", shouldBlock: true, reason: "localhost" },
  { url: "http://127.0.0.1/admin", shouldBlock: true, reason: "loopback IP" },
  { url: "http://10.0.0.1/internal", shouldBlock: true, reason: "private 10.x.x.x" },
  { url: "http://172.16.0.1/internal", shouldBlock: true, reason: "private 172.16-31.x.x" },
  { url: "http://192.168.1.1/router", shouldBlock: true, reason: "private 192.168.x.x" },
  { url: "http://169.254.169.254/metadata", shouldBlock: true, reason: "AWS metadata" },
  { url: "http://metadata.google.internal/", shouldBlock: true, reason: "GCP metadata" },
  { url: "ftp://example.com/file", shouldBlock: true, reason: "non-HTTP protocol" },
  { url: "file:///etc/passwd", shouldBlock: true, reason: "file protocol" },

  // Should be ALLOWED
  { url: "https://example.com", shouldBlock: false, reason: "public domain" },
  { url: "https://facebook.com/ads/library", shouldBlock: false, reason: "Meta Ad Library" },
  { url: "https://library.tiktok.com/ads", shouldBlock: false, reason: "TikTok Ad Library" },
];

let ssrfPassed = 0;
let ssrfFailed = 0;

ssrfTestCases.forEach((tc, i) => {
  let blocked = false;
  let error = null;

  try {
    validateUrl(tc.url);
  } catch (e) {
    blocked = true;
    error = e.message;
  }

  const expected = tc.shouldBlock ? "BLOCKED" : "ALLOWED";
  const actual = blocked ? "BLOCKED" : "ALLOWED";
  const status = (blocked === tc.shouldBlock) ? "✅ PASS" : "❌ FAIL";

  if (blocked === tc.shouldBlock) {
    ssrfPassed++;
  } else {
    ssrfFailed++;
  }

  console.log(`SSRF Test ${i + 1}: ${status}`);
  console.log(`  URL: ${tc.url}`);
  console.log(`  Reason: ${tc.reason}`);
  console.log(`  Expected: ${expected}, Got: ${actual}`);
  if (error) console.log(`  Error: ${error}`);
  console.log("");
});

console.log(`SSRF Tests: ${ssrfPassed}/${ssrfTestCases.length} passed\n`);

console.log("=== PATH TRAVERSAL PROTECTION TESTS ===\n");

const pathTestCases = [
  // Should be BLOCKED
  { path: "../../../etc/passwd", shouldBlock: true, reason: "parent directory traversal" },
  { path: "/etc/passwd", shouldBlock: true, reason: "absolute path outside cwd" },
  { path: "/tmp/test.txt", shouldBlock: true, reason: "absolute path outside cwd" },
  { path: "../../package.json", shouldBlock: true, reason: "relative traversal" },

  // Should be ALLOWED
  { path: "test-ads.html", shouldBlock: false, reason: "file in cwd" },
  { path: "src/extractor.js", shouldBlock: false, reason: "subdirectory file" },
  { path: "./package.json", shouldBlock: false, reason: "explicit current dir" },
];

let pathPassed = 0;
let pathFailed = 0;

pathTestCases.forEach((tc, i) => {
  let blocked = false;
  let error = null;

  try {
    validateFilePath(tc.path);
  } catch (e) {
    blocked = true;
    error = e.message;
  }

  const expected = tc.shouldBlock ? "BLOCKED" : "ALLOWED";
  const actual = blocked ? "BLOCKED" : "ALLOWED";
  const status = (blocked === tc.shouldBlock) ? "✅ PASS" : "❌ FAIL";

  if (blocked === tc.shouldBlock) {
    pathPassed++;
  } else {
    pathFailed++;
  }

  console.log(`Path Test ${i + 1}: ${status}`);
  console.log(`  Path: ${tc.path}`);
  console.log(`  Reason: ${tc.reason}`);
  console.log(`  Expected: ${expected}, Got: ${actual}`);
  if (error) console.log(`  Error: ${error}`);
  console.log("");
});

console.log(`Path Tests: ${pathPassed}/${pathTestCases.length} passed\n`);

// SUMMARY
console.log("=== SECURITY SUMMARY ===");
const totalPassed = ssrfPassed + pathPassed;
const totalTests = ssrfTestCases.length + pathTestCases.length;
console.log(`Total Security Tests: ${totalPassed}/${totalTests} passed`);

process.exit((ssrfFailed + pathFailed) > 0 ? 1 : 0);
