# Security

## Security Measures

### SSRF Protection
URL fetching includes validation to prevent Server-Side Request Forgery:
- Only HTTP/HTTPS protocols allowed
- Blocks private/internal IP ranges (127.x, 10.x, 172.16-31.x, 192.168.x)
- Blocks localhost and link-local addresses
- Blocks cloud metadata endpoints (169.254.169.254)

### Path Traversal Protection
File reading is restricted to the current working directory:
- Resolved paths are validated against cwd
- Paths containing `../` that escape cwd are rejected

## Known Vulnerabilities

### xlsx (SheetJS) - HIGH
**Status:** No fix available

**CVEs:**
- GHSA-4r6h-8v6p-xvw6: Prototype Pollution
- GHSA-5pgg-2g8v-p4x9: Regular Expression DoS (ReDoS)

**Mitigation:**
- Only use xlsx export with trusted data
- Consider using an alternative library if processing untrusted spreadsheet files
- Alternative: `exceljs` package (requires code changes)

## Reporting Security Issues

Please report security vulnerabilities by opening an issue or contacting the maintainers directly.

## Audit History

- 2026-01-09: Initial security audit
  - Fixed SSRF vulnerability in URL fetching
  - Fixed path traversal in file reading
  - Updated puppeteer (tar-fs, ws vulnerabilities)
  - Documented xlsx vulnerability (no fix available)
