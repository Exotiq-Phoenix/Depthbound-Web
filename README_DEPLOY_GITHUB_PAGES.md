# Free GitHub Pages deployment
1. Create a GitHub repository, e.g. `depthbound-site`.
2. Copy the contents of this `Website` folder to the repository root.
3. Push to the `main` branch.
4. GitHub repository → Settings → Pages → Build and deployment → Deploy from a branch → `main` / root.
5. GitHub gives you a free `https://USERNAME.github.io/depthbound-site/` URL.
6. Edit `updates/latest.json` whenever a build is published. The site and launcher can consume the same manifest.
7. Optional later: point a custom domain at GitHub Pages without changing the site architecture.

Do not put signing keys, tokens or private release credentials into this public repository.
