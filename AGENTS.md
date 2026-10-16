# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved DischargeLoop direction

- Preserve the selected Safe Harbor identity: Newsreader headlines, Source Sans 3 UI, warm paper, sea-glass, harbor teal, ink and buoy orange. Reuse supplied logos/fonts/favicons.
- The user approved the connected Mira story and asked to extend it into the complete homepage using the brief, research, brand kit and IA.
- The user specifically requested that route lines meet their dots and that the opening background change light-to-dark with scroll. Keep measured geometry; do not return to a stretched fixed viewBox.
- Preserve native scrolling, still mode, source-linked human review and unsent drafts. The site is a synthetic concept preview, not a clinical product.
- Current user authorization supersedes historical no-build text in the attached research brief. Homepage work does not authorize outbound contact, clinical systems, actual analytics, deployment or changes to external records.
- Keep the exact five proposed responsibilities in order. The initial pilot candidate is one-service-line Discharge Desk. Pricing remains an explicit hypothesis; the 8/2/1 gate and stop conditions are prerequisites, not achievements.
- The user rejected independent section-color blocks and disconnected orange decorative paths. The entire homepage must remain one continuous scroll-driven canvas, with one measured buoy-orange route from the hero handoff through the bridge, later chapters and footer on desktop and mobile. Keep section backgrounds transparent; retain neutral surfaces only for actual product interfaces. Re-measure the route when content expands or viewport/font geometry changes.
- Full-site phase: implement the IA’s substantive supporting routes, including all five product pages, both buyer paths, demo, evidence, oversight, integration readiness, pilot and request flows, resources, company/contact, sign-in/help, legal/accessibility and 404.
- The user explicitly requested less white/cream even on the homepage. Use harbor ink and teal as the dominant continuous canvas, with limited pale sage contrast and stable readable product surfaces. Preserve the approved fonts, brand mark and orange thread.
- Every page must share the continuous-background/motion language. Never reintroduce opaque alternating chapter blocks. The native line geometry must re-measure when content changes.
- Frontend sign-in must be polished but honest: no customer accounts or identity service exists. Use example credentials only, clear example passwords, and never claim a secure link or recovery email was sent.
- Inquiry forms remain local previews until an actual delivery service and approved notice are configured. Product-interest query parameters should prefill the relevant inquiry. Do not collect patient narratives, records or payments.

- Refinement audit: preserve the direct homepage links to the five modules and pilot, direct inquiry-form jumps, and form-first mobile inquiry layout. The user requested more motion based on the supplied recording: use a visible route frontier over a faint continuous track, staged source/owner reveals, bounded product depth, and scroll-linked harbor light. Keep all of it removable in still mode; never animate synthetic states into completion.
- The navigation must stay visible throughout scrolling on every route, including mobile. Keep a contrast-safe canvas-colored sticky header above the route/sections; account for its height in anchor jumps and sticky product/reading panels. Mobile menus must remain scrollable within the viewport.

- Intro film decision: the user selected option 2, “The Unfinished Ledger.” Preserve the giant editorial “Discharged.”, four unresolved rows, attributed timestamp, next-owner reveal and buoy-orange rail. Its transparent Remotion Player sits above the original hero; the same page canvas changes with film time and then with scroll. The measured route must meet the film exit and hero dot on every breakpoint. Canonical motion source lives in the sibling `dischargeloop-intro-film/src/film/LedgerFilm.jsx`; run its `sync:website` script after edits. Keep the one-play hold, pause/replay/seek/skip controls and complete still frame. Do not replace the connected intro with an opaque looping player.
