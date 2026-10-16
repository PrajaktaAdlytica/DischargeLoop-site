# DischargeLoop complete concept website

33 substantive pages, a custom 404, the approved connected homepage story and an isolated synthetic workbench. Built from the supplied brief, researched IA, Safe Harbor brand kit and the user’s Dawn motion reference.

The local site is running at **http://localhost:8732/**.

## Page inventory

- Homepage and Why handoffs break.
- Product overview and five dedicated proposed-module pages: Desk, Review, Proof, Signal, Report.
- Shared platform, How it works and the isolated Demo.
- Solutions overview, Hospital transitions and ACO population health.
- Pilot/pricing, Evidence, Oversight and Integration readiness.
- Request audit, Request demo, Request pilot and Contact.
- Resources overview plus four complete guides: handoff audit, pilot scorecard, source notes and workflow teardown.
- Company, Sign in, Access help, Privacy, Terms and Accessibility.
- Custom 404 with working recovery links. Pricing/results/about/trust/integration/legal aliases resolve to the substantive destination.

`site-map.json` is the complete route register. `website-coverage.json` maps the brief and IA to actual pages.

## Brand and motion

The user requested less cream and more of the selected Safe Harbor direction. Teal and harbor ink now carry the canvas, with restrained sage chapters and neutral product surfaces. Newsreader, Source Sans 3, the approved outlined logo, favicon and buoy-orange route remain intact.

Every page has **one scroll-driven background canvas**, transparent narrative sections and a continuous measured route. Scroll changes the entire canvas rather than exposing separately painted blocks. A quiet atmospheric shade sits behind the story. Route geometry reflows after font, viewport or content-height changes.

Purposeful motion includes connected line drawing, chapter reveals, an unsent draft typed once when visible, source/evidence reveals, progressive workflow states and local controls. Scrolling stays native. The motion control persists between routes during client navigation; system reduced-motion is respected and still mode shows complete content.

## Functional frontend flows

- Full product/platform/team/resource mega menus, mobile navigation, sign-in entry and complete footer.
- Product-specific workflow tabs, source dialogs, input contracts, FAQs and module-prefilled inquiry routes.
- Nine-record synthetic queue: 4 pending, 2 blocked, 2 completed, 1 rejected. Filters, search/empty state, opened records, owners, evidence, outreach and timeline views work. Clean cases expose the fictional closure checklist. Blocked cases never become approved.
- Local review acknowledgement is labelled simulation, attributable, resettable and does not change the seeded episode state. Synthetic report download works locally.
- Business forms validate minimum role/organisation/work email/site-region/workflow-fit context and preview acknowledgement. Preparing, not-submitted result, edit and local-summary download states are implemented. Pilot readiness and product interest remain explicit.
- Sign-in has example email/password inputs, show/hide, optional email retention during the tab flow, secure-link preview and access-help route. Results explicitly state that nothing authenticated or emailed. Example passwords clear after preview.
- Resource guides, a downloadable blank evaluation worksheet and source links are included.
- Legal notices describe the actual local preview; they do not imply completed production legal review.

## Run and build

```sh
npm install
npm run dev -- --host 0.0.0.0 --port 8732 --strictPort
npm run build
npm run test:sites
```

Build output includes `dist/client`, a serving worker and Sites-compatible metadata. Vendor and motion code are separate cached bundles. The original worker contract and tests are preserved.

## Deploy on Vercel

The repository includes `vercel.json` so direct visits to client-side routes such as `/oversight` and `/request-audit` resolve to the app shell. When importing the GitHub repository into Vercel, use the repository root (`/`) and verify these project settings:

- Framework preset: **Vite**
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist/client`

The app currently has no required environment variables. Keep `node_modules`, build output, `.vercel`, and `.env` files out of Git; set any future secrets in Vercel Project Settings instead of committing them.

## Source layout

- `Website.jsx`, `router.jsx`: route registry, aliases, history, shared motion preference and client links.
- `SiteChrome.jsx`: global navigation, footer and motion control.
- `App.jsx`, `Homepage.jsx`: original homepage story and complete marketing chapters.
- `JourneyCanvas.jsx`: shared background interpolation, contrast adaptation and continuous route.
- `PageParts.jsx`: narrative primitives, native downloads and keyboard tab handling.
- `siteData.js`: exact module inventory, product detail content, fictional episodes, sources and guides.
- `ProductPages.jsx`, `StoryPages.jsx`, `DemoPage.jsx`, `RequestPages.jsx`, `ReadingPages.jsx`: substantive page families and working interactions.
- `styles.css`, `homepage.css`, `journey-canvas.css`, `website.css`: approved foundations and responsive site styling.
- `public/brand`: original brand assets and licensed locally hosted fonts.
- `qa/full-site`, `design-qa.md`: actual browser captures, route checks and interaction evidence.

## Accurate scope

The **frontend website is complete**. No live identity, lead delivery, messaging, calendar, EHR, analytics or billing service is connected. Forms and authentication are explicitly isolated previews. No PHI, real provider endpoint, outcome, compliance certification or reimbursement assurance is represented. No external system has been changed and the site has not been publicly deployed or connected to a domain.

Production collection/authentication, legal review, authorised source access and deployment remain separate integrations. The proposed pilot is not treated as ready or achieved by this website.

### Refinement audit

The latest brief/IA, desktop/mobile continuity and motion review is appended to `design-qa.md`. Fresh evidence is under `qa/refinement/`. It adds direct module/pilot shortcuts, form-first mobile inquiries, a visible line frontier over its continuous track, staged evidence and bounded product depth. All new motion has complete still states.

### Option 2 intro — The Unfinished Ledger

A 12-second editable Remotion intro now sits above the hero. Giant Newsreader type, a typed event timestamp, four staged handoffs, next-owner reveals and a drawing rail establish the story. The background belongs to the shared canvas; the orange rail joins the hero dot through measured SVG geometry. It plays once and holds, with pause/play/replay, keyboard timeline, still view and a skip into the journey. Playback pauses offscreen or when the document is hidden.

`src/intro/IntroFilm.jsx` contains the Player and accessible controls; `src/intro/intro.css` handles responsive integration. The canonical film source lives in the sibling `dischargeloop-intro-film` project, with a `sync:website` script to update the embedded copy. Studio is running at http://localhost:8734/TheUnfinishedLedger. No MP4 export is required for the browser intro. The Remotion runtime loads in a separate homepage chunk.

Final intro screenshots, a source comparison and timing evidence are in `qa/intro-film/`; the focused verification is appended to `design-qa.md`.
