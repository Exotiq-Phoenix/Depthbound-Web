# Depthbound Website 2.0 — GitHub Pages deployment

This is a static, dependency-free website prepared for the existing public site:

- Live site URL (provided by the project owner): `https://exotiq-phoenix.github.io/Depthbound-Web/`
- GitHub repository: `https://github.com/Exotiq-Phoenix/Depthbound-Web`

## Source of this upgrade

Built from the `Website/` directory contained in `Depthbound_V7_0B_PlayerExperience_UI_Website_Launcher.zip` (the provided V7.0B package). The live GitHub repository could **not** be inspected or synchronized from this environment. Treat this as a site upgrade candidate, not a verified replacement for newer commits.

## What's new

- Seven linked responsive pages: Home, The Game, Engineering, Development, Library, Downloads, Changelog
- Redesigned navigation, mobile menu, keyboard-driven site search (Ctrl/Cmd+K), responsive layout
- Engineering portfolio with filterable case studies, real source references and honest alpha status
- Filterable roadmap, accessible native documentation accordions, image viewer, development notes
- Shared manifest-consuming downloads and release status; no fake public download URLs
- Original V7 HUD and menu wireframes reused and labelled as design studies
- `favicon.svg`, `sitemap.xml`, `.nojekyll`, `robots.txt`, SEO description tags

## Preserve before replacing

**Back up the live repository**, then compare its files with this ZIP. If the current repo contains newer pages, assets, scripts, or update metadata, merge changes rather than overwriting them wholesale.

1. Open the repository and confirm whether Pages uses the `main` branch root, `/docs` folder, or a build workflow (Settings → Pages).
2. If Pages deploys **from branch root**: copy the **contents** of this package's `Website/` folder into the repository root (not a nested `Website/`).
3. If Pages deploys from **`/docs`**: copy the `Website/` contents into `/docs` instead.
4. **Preserve your current `updates/latest.json` if newer.** The supplied one is the original V7.0B development manifest; it has no public download URLs. Never add fabricated build URLs.
5. Preserve any existing launcher integration files and actual downloadable archives. Do not change the public manifest URL without updating launcher config.
6. Commit to a branch and review the GitHub Pages preview / repository diff before merging into the publishing branch.
7. Once deployed, manually check navigation, menu, search, both wireframes, all local links, and the manifest-loading download states on mobile and desktop.

## Launcher compatibility

`updates/latest.json` is intentionally **byte-for-byte unchanged** from the supplied V7.0B package. Properties such as `version`, `channel`, `title`, `summary`, `gameDownload`, `launcherDownload`, `sha256`, `archiveSize`, `publishedUtc`, and `minimumLauncherVersion` remain available. The website fetches exactly `updates/latest.json`, and no new required manifest field was introduced.

The zip contains **website files only**: it does not modify the Unity project or Windows launcher source. Its JavaScript only permits `http:` or `https:` URLs in download buttons and does not enable buttons for blank URLs.

## Local preview

The site is static HTML/CSS/JS. Opening `index.html` directly works for page navigation and interactions, but browsers may block `fetch('updates/latest.json')` when using a `file://` URL. For a complete preview, use any local static HTTP server, for example:

```sh
cd Website
python -m http.server 8000
```

Then browse `http://localhost:8000/` (on your own computer). No npm, bundler, framework, credentials or build step needed.

## Claims and assets

The existing `assets/hud-wireframe.png` and `assets/ui-systems.png` are **design studies**, not verified gameplay screenshots. Alpha-stage case studies and roadmap items should be updated whenever runtime testing changes their status. Do not include private source, secrets or unlicensed images in the public repository.
