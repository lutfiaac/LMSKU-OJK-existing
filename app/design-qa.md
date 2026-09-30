# Design QA — LMSKU frontend

final result: passed

Scope: the four supplied internal screens and their frontend navigation. This is not a verification of authenticated OJK content, backend behavior, or every page of the production site.

## Evidence and normalization

Source visual truth: `C:/Users/LENOVO/Downloads/`:

- `screencapture-lmsku-ojk-go-id-Dashboard-2026-09-30-09_24_18.png` — 1920 × 7505.
- `screencapture-lmsku-ojk-go-id-Course-show-16-acs-2026-09-30-09_29_38.png` — 1920 × 1728.
- `screencapture-lmsku-ojk-go-id-Activity-show-47-2026-09-30-09_29_59.png` — 1920 × 2601.
- `screencapture-lmsku-ojk-go-id-Activity-detail-2026-09-30-09_30_28.png` — 1920 × 1743.

Implementation: http://127.0.0.1:4173. Chromium, device scale 1. Desktop viewport width 1920 CSS pixels; viewport heights match each source. Full-page output dimensions: dashboard 1920 × 7640, category 1920 × 1730, activities 1920 × 2609, detail 1920 × 1743. Source and implementation are shown beside one another at identical 0.5 scale in `evidence/compare-{dashboard,category,activities,detail}.png`. Source is on the left. Differing document heights are padded, not stretched. State: initial dashboard, Basic category, incomplete activities, first lesson locked.

Rendered captures: `evidence/local-{dashboard,category,activities,detail}.png`. Focused evidence: `evidence/compare-dashboard-top.png` (top 2160 source pixels of both captures). Category and detail comparisons are readable at the full paired scale and were also inspected for headings, notices, cards, and profile typography.

Mobile captures: `evidence/mobile-{dashboard,category,activities,detail}.png`, 390 × 844 CSS viewport, density 1; `evidence/mobile-320-category.png`, 320 × 844. Mobile is an inferred responsive adaptation, not a match to an unavailable mobile source.

## Comparison history and findings

1. Initial comparison found P1 red rail ending at the first viewport, P2 duplicated text in portrait crops, P2 white rectangular background behind the header avatar, P2 activity-grid vertical spacing, and P2 dashboard/Academy density mismatch.
   Fixes: body-relative full-document rail, tighter portrait extraction, separate source header-avatar crop, reduced material row spacing, adjusted card heights and section-heading typography. Recaptured all four screens. The paired comparison files contain the post-fix results.
2. The 320 px automated check found P2 horizontal overflow in the course/profile layout. Fixed minimum grid sizing, narrow-screen typography, and illustration width. All six viewport widths now pass overflow checks. Inspected the post-fix 320 px screenshot.
3. Final comparisons found no remaining actionable P0/P1/P2 issues within this prototype scope. Minor source differences remain below.

## Required fidelity surfaces

- Typography: local original Poppins regular file; synthesized bold matches hierarchy closely. Arial is used for the activity display label and selected source-style alert/card text. Remaining differences in small font weight and wrapping are P3.
- Layout: matching blue header, red rail, white bordered content, profile column, activity card grid, locked notice, and return-button placement. The long dashboard has a 135 px document-height difference (about 1.8%) due to uniform card rows; P3. Category and activity heights differ by 2 and 8 px.
- Colors: blue/red shell and pale peach, yellow, and red semantic regions follow the references. Focus styling is added for keyboard navigation.
- Assets: original source/screenshot-derived logo, hero, thumbnails, document/test/video icons, learning illustration, student, point illustration, and chat mark are local assets. Standard control/statistic/medal icons use Font Awesome and differ in small details (P3). Screenshot thumbnails retain the source capture's sharpness limitations.
- Copy: four core page titles, module names, activity names, notices, and navigation labels follow the references. Quiz content, unlocked lesson content, point rules, profile dialogs, and forum are explicitly local simulations. Academy metadata is illustrative. Screenshot dashboard and activity profile/statistics differ in the source and are retained as sample display states.

## Interaction and runtime checks

`node scripts/check-ui.mjs` passed:

- Dashboard → category → Basic activities → locked material → back.
- Post-test remains locked before completing materials.
- Pre-test answer submission and score; all ten materials unlock.
- Mark each material complete; post-test unlocks and can be submitted.
- Module search, empty state, reset search, and descending sort.
- Profile editing, photo selection, notification opening and Escape dismissal.
- Local forum message send and close.
- Browser history back navigation.
- No horizontal overflow on all four routes at 320, 390, 768, 1024, 1440, and 1920 px.
- No uncaught JavaScript page errors; no broken images on initial desktop captures.

`npm run build` passed. No deployment or backend implemented. Frontend preview remains running.

## Follow-up polish / limitations

- P3: exact original vector control/medal icons could replace Font Awesome if supplied.
- P3: individual dashboard card heights and metadata could be made exact with authenticated DOM data.
- No real video, real tests, PDF modules, certificates, authentication, or service integration is available from the supplied screenshots. These are intentionally outside the frontend-only simulation.
- Source home/login were inspected; internal dashboard redirected to login. No production credentials were requested or used.

## Implementation checklist

- [x] Four referenced screens implemented.
- [x] Key frontend journey and secondary controls functional.
- [x] Local assets and font.
- [x] Side-by-side source comparison and fixes.
- [x] Responsive and interaction tests.
- [x] Production frontend build.
