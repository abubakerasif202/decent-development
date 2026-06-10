# DECENT Development - Technical SEO Audit & Optimization Roadmap

This document serves as the master checklist, technical audit findings, keyword analysis, and development roadmap for optimizing the SEO health of the [DECENT Development](https://decentdevelopment.com.au/) website.

---

## Context
- **Site URL**: `https://decentdevelopment.com.au/` (and `https://www.decentdevelopment.com.au/`)
- **Scope of Audit**: Full site audit (including static pre-rendered routes, routing configuration, site performance, image formats, and structured data schemas)
- **Target Markets**: New South Wales (NSW), Australia (specifically Sydney metro areas including North Sydney, Auburn, Rouse Hill, Canley Vale, Canley Heights, Regents Park)
- **Primary Languages**: English (`en-AU`)
- **Primary Business Goals**: Drive project enquiries for high-end residential builds, attached duplexes/triplexes, project management, and renovation consultation.
- **Target Keyword Themes**: Duplex development Sydney, triplex development NSW, residential construction Sydney, custom home builder North Sydney, NSW contractor licence construction.

---

## Audit Tasks Checklist

- [x] **TASK-1.1: Discovery and Crawl Analysis**
  - Run checks on crawlability, sitemaps, canonical tags, and trailing slash behaviors. (Completed)
- [x] **TASK-1.2: Technical Health Assessment**
  - Measure performance, verify security protocols, and test mobile responsiveness. (Completed)
- [x] **TASK-1.3: On-Page and Content Analysis**
  - Verify heading hierarchies, title/meta tag relevance, image alt texts, and internal links. (Completed)
- [x] **TASK-1.4: Off-Page and Competitive Benchmarking**
  - Assess local citations, Google Business Profile details, and domain trust. (Completed)
- [x] **TASK-1.5: Analytics and Tracking Verification**
  - Ensure correct implementation of tracking scripts and configuration. (Completed)

---

## Audit Findings

- [x] **SEO-FIND-1.1 [FAQPage Schema Discrepancy between Client component and SEO Prerender script]**:
  - **Location**: [HomePage.jsx](file:///C:/Users/abuba/decent/decent-development/src/pages/HomePage.jsx#L9-L54) and [prerender-seo.mjs](file:///C:/Users/abuba/decent/decent-development/scripts/prerender-seo.mjs#L116-L146)
  - **Description**: The static schema injected for `FAQPage` during build time contained only 3 questions, whereas the dynamic React metadata contained 4 questions. This has been resolved.
  - **Impact**: High (causes structured data mismatch warnings in Google Search Console).
  - **Recommendation**: Align the pre-render script to include the exact 4-item FAQ schema array as rendered in React. (Fixed)

- [x] **SEO-FIND-1.2 [Flattened Breadcrumb List Schema in Prerender Output]**:
  - **Location**: [prerender-seo.mjs](file:///C:/Users/abuba/decent/decent-development/scripts/prerender-seo.mjs#L335-L354)
  - **Description**: The breadcrumb helper function in the pre-render script created a 2-hop breadcrumb list (`Home` -> `Project Title`) for individual project detail pages, bypassing the `/projects/` page. A dynamic `projectBreadcrumb` helper has been implemented.
  - **Impact**: Medium (dilutes internal link equity and page hierarchy in search result snippets).
  - **Recommendation**: Create a specific `projectBreadcrumb` helper in the pre-render script that maps out the full 3-hop breadcrumb list. (Fixed)

- [x] **SEO-FIND-1.3 [Mismatched Metadata (Title/Description) on Contact Page]**:
  - **Location**: [ContactPage.jsx](file:///C:/Users/abuba/decent/decent-development/src/pages/ContactPage.jsx#L55-L61) and [prerender-seo.mjs](file:///C:/Users/abuba/decent/decent-development/scripts/prerender-seo.mjs#L269-L272)
  - **Description**: The contact page meta titles and descriptions differed between the React component and the prerendering script. Prerender route `/contact/` has been updated to use the optimized version.
  - **Impact**: High (crawlers index the unoptimized, less local-keyword targeted title and description).
  - **Recommendation**: Align the `/contact/` route metadata in `prerender-seo.mjs` with the React component version. (Fixed)

- [x] **SEO-FIND-1.4 [Missing Trailing Slash Redirects on Server Level]**:
  - **Location**: [vercel.json](file:///C:/Users/abuba/decent/decent-development/vercel.json#L2-L33)
  - **Description**: While the site has strict canonical paths ending in trailing slashes, requests to `/collaboration` or `/projects/:slug` (without trailing slash) were not redirected at the Vercel server level to their trailing slash versions. Added redirects to vercel.json.
  - **Impact**: High (potential duplicate URL indexing).
  - **Recommendation**: Add permanent (301) redirects to `vercel.json` for `/collaboration` and `/projects/:slug` to normalize trailing slashes at the server level. (Fixed)

- [x] **SEO-FIND-1.5 [Missing Catch-All Route Rewrite for Client-Side Navigation Fallbacks]**:
  - **Location**: [vercel.json](file:///C:/Users/abuba/decent/decent-development/vercel.json#L34-L48)
  - **Description**: In `vercel.json`, only specific rewrites were defined. There was no catch-all rewrite to `/index.html`. Added catch-all routing fallback.
  - **Impact**: Medium (impacts user experience on broken links and crawler indexation on error pages).
  - **Recommendation**: Append a catch-all rewrite `{ "source": "/(.*)", "destination": "/index.html" }` to the end of the `rewrites` array in `vercel.json`. (Fixed)

- [x] **SEO-FIND-1.6 [Server-Side Reference to window in NotFoundPage.jsx]**:
  - **Location**: [NotFoundPage.jsx](file:///C:/Users/abuba/decent/decent-development/src/pages/NotFoundPage.jsx#L9)
  - **Description**: In `NotFoundPage.jsx`, `window.location.pathname` was accessed directly inside `usePageMeta`, which could crash server-side pre-render execution. Updated to be window-safe.
  - **Impact**: Low (preventative).
  - **Recommendation**: Make the hook invocation safe by checking `typeof window !== 'undefined' ? window.location.pathname : '*'` or passing a static path. (Fixed)

- [x] **SEO-FIND-1.7 [Hardcoded Sitemap Last Modification Date]**:
  - **Location**: [prerender-seo.mjs](file:///C:/Users/abuba/decent/decent-development/scripts/prerender-seo.mjs#L6)
  - **Description**: The sitemap generator used a hardcoded `const lastmod = '2026-06-08'`. Updated to dynamically capture ISO date at build time.
  - **Impact**: Low (search engines prefer accurate modification dates to prioritize crawling).
  - **Recommendation**: Set `lastmod` dynamically to the current ISO date during build time. (Fixed)

- [x] **SEO-FIND-1.8 [Non-WebP/AVIF Hero Images and Large Project Images]**:
  - **Location**: [src/assets/stitch/](file:///C:/Users/abuba/decent/decent-development/src/assets/stitch/) (`hero-building.jpg`, `project-multiuse.jpg`, `project-renovation.jpg`)
  - **Description**: Several critical high-impact images were served as `.jpg` or `.png` formats. E.g. `project-multiuse.jpg` was 460KB and `hero-building.jpg` was 112KB. Converted all 6 JPG/PNG images in `src/assets/stitch/` to WebP format, achieving up to 92% size reduction.
  - **Impact**: Medium (slows page speed on mobile devices).
  - **Recommendation**: Convert these assets to WebP/AVIF and update imports in data/components. (Fixed)

- [x] **SEO-FIND-1.9 [Multi-Type Declaration in Organization Schema]**:
  - **Location**: [prerender-seo.mjs](file:///C:/Users/abuba/decent/decent-development/scripts/prerender-seo.mjs#L30-L53)
  - **Description**: The organization schema used `["Organization", "LocalBusiness", "GeneralContractor"]` in the `@type` array. Resolved by single type declaration.
  - **Impact**: Medium (affects local SEO pack targeting).
  - **Recommendation**: Use a single, most specific type `GeneralContractor` which implicitly inherits from `LocalBusiness` and `Organization`. (Fixed)

- [x] **SEO-FIND-1.10 [Missing Security Headers in Vercel Configuration]**:
  - **Location**: [vercel.json](file:///C:/Users/abuba/decent/decent-development/vercel.json)
  - **Description**: The Vercel configuration lacked custom security headers. Strict security headers including Content-Security-Policy (CSP) have been integrated.
  - **Impact**: Low-Medium (minor signal in domain authority trust ranking).
  - **Recommendation**: Add a headers configuration block to `vercel.json` with recommended security directives. (Fixed)

---

## Remediation Recommendations

- [x] **SEO-REC-1.1 [Align FAQPage Schema & Metadata Discrepancies]**:
  - **Priority**: Critical
  - **Effort**: 1 hour
  - **Expected Outcome**: Resolved structured data warnings in Google Search Console, unified search snippets for contact and home page searches. (Completed)

- [x] **SEO-REC-1.2 [Correct Project Breadcrumb Schema Hierarchy]**:
  - **Priority**: High
  - **Effort**: 30 minutes
  - **Expected Outcome**: Google Search displays breadcrumbs correctly as `Home > Completed Projects > Project Name` for all 28+ projects, improving CTR. (Completed)

- [x] **SEO-REC-1.3 [Normalize Trailing Slashes & Enable SPA Catch-All Rewrites]**:
  - **Priority**: High
  - **Effort**: 1 hour
  - **Expected Outcome**: Prevents duplicate URL indexing, resolves sitemap discrepancies, and guarantees that deep links or broken links render the custom branded 404 page. (Completed)

- [x] **SEO-REC-1.4 [Automate lastmod Sitemap Generation]**:
  - **Priority**: Medium
  - **Effort**: 10 minutes
  - **Expected Outcome**: Search engines are automatically alerted when content changes on new builds. (Completed)

- [x] **SEO-REC-1.5 [Convert Visual Assets to Next-Gen Formats (WebP)]**:
  - **Priority**: Medium
  - **Effort**: 2 hours (automation script or manual conversion)
  - **Expected Outcome**: Reduces average image sizes by 40-60%, improving LCP scores to < 1.5s on desktop and < 2.2s on mobile. (Completed - achieving up to 92% size reduction)

- [x] **SEO-REC-1.6 [Configure Security Headers in vercel.json]**:
  - **Priority**: Medium
  - **Effort**: 30 minutes
  - **Expected Outcome**: Secure-by-default domain header response, boosting off-page security credibility. (Completed)

---

## Code Changes (Applied)

Check the git history or the corresponding source files for implementation details:
- [prerender-seo.mjs](file:///C:/Users/abuba/decent/decent-development/scripts/prerender-seo.mjs)
- [vercel.json](file:///C:/Users/abuba/decent/decent-development/vercel.json)
- [NotFoundPage.jsx](file:///C:/Users/abuba/decent/decent-development/src/pages/NotFoundPage.jsx)
- [Hero.jsx](file:///C:/Users/abuba/decent/decent-development/src/components/Hero.jsx)
- [Projects.jsx](file:///C:/Users/abuba/decent/decent-development/src/components/Projects.jsx)
- [ContactPage.jsx](file:///C:/Users/abuba/decent/decent-development/src/pages/ContactPage.jsx)
- [ProjectsPage.jsx](file:///C:/Users/abuba/decent/decent-development/src/pages/ProjectsPage.jsx)
- [TeamPage.jsx](file:///C:/Users/abuba/decent/decent-development/src/pages/TeamPage.jsx)

---

## Commands

### Local Development / Validation
```powershell
# Verify the build state compiles and runs the prerender script
Set-Location 'C:\Users\abuba\decent\decent-development'
npm run build

# Run eslint to ensure no code quality issues
npm run lint
```

### Production CI/CD & Verification
```powershell
# Deploy changes directly to Vercel production
Set-Location 'C:\Users\abuba\decent\decent-development'
npx vercel --prod --yes
```
