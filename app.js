/* Depthbound Web 2.0 — progressive, dependency-free enhancements. */
(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  const menu = $('#mobileNav'), toggle = $('#menuToggle');
  function closeMenu(){ if(!menu||!toggle)return; menu.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open menu'); }
  if(menu&&toggle){toggle.addEventListener('click',()=>{const willOpen=menu.hidden;menu.hidden=!willOpen;toggle.setAttribute('aria-expanded',String(willOpen));toggle.setAttribute('aria-label',willOpen?'Close menu':'Open menu');});$$('a',menu).forEach(a=>a.addEventListener('click',closeMenu));window.addEventListener('resize',()=>{if(window.innerWidth>1030)closeMenu()});}

  const index = [
    ['Overview','The world of Depthbound','A private-alpha action RPG and its design pillars.','index.html'],
    ['The game','Combat and resources','Melee, stamina, blocking and the player experience.','game.html#combat'],
    ['The game','Procedural dungeons','Seeded layouts, modular rooms and exploration.','game.html#dungeons'],
    ['The game','Progression and mastery','Training, equipment and evolving player abilities.','game.html#progression'],
    ['The game','Arcana and mana','Magic foundations and long-term design.','game.html#arcana'],
    ['The game','HUD design wireframes','Adaptive user interface and UX concepts.','game.html#arcana'],
    ['Engineering','Dungeon generation case study','Deterministic generation, route graphs and validation.','engineering.html#dungeon-generation'],
    ['Engineering','Adaptive HUD architecture','C# UI controller, state-driven interfaces and context.','engineering.html#adaptive-hud'],
    ['Engineering','Enemy AI and combat','Perception, movement, combat-state decisions.','engineering.html#enemy-ai'],
    ['Engineering','Module Studio and tools','Editor tooling, JSON schemas and workflows.','engineering.html#tooling'],
    ['Engineering','Launcher and release systems','Manifest, .NET, downloads and verification.','engineering.html#release-system'],
    ['Development','Project status','Private alpha, roadmap, development progress.','development.html#status'],
    ['Development','Roadmap','Foundations, work in progress and future plans.','development.html#roadmap'],
    ['Development','Development journal','Iteration notes and current technical work.','development.html#journal'],
    ['Library','Documentation','Systems, reference notes and development FAQs.','docs.html'],
    ['Changelog','Development history','V7 foundation and technical milestones.','changelog.html'],
    ['Downloads','Game and launcher availability','Public download links and version manifest.','downloads.html']
  ];
  const searchOverlay = $('#searchOverlay'), searchInput=$('#siteSearch'), searchResults=$('#searchResults');
  let previousFocus=null;
  function renderSearch(term){if(!searchResults)return;const q=term.trim().toLowerCase();searchResults.replaceChildren();if(!q){const p=document.createElement('p');p.textContent='Type a topic to explore pages, systems and technical notes.';searchResults.append(p);return;}const words=q.split(/\s+/).filter(Boolean);const ranked=index.map(item=>({item,score:words.reduce((n,w)=>n+(item[1].toLowerCase().includes(w)?3:0)+(item[2].toLowerCase().includes(w)?1:0)+(item[0].toLowerCase().includes(w)?1:0),0)})).filter(x=>x.score>=words.length).sort((a,b)=>b.score-a.score).slice(0,9);if(!ranked.length){const p=document.createElement('p');p.textContent='No results. Try “dungeons”, “AI”, “HUD” or “downloads”.';searchResults.append(p);return;}ranked.forEach(({item})=>{const a=document.createElement('a');a.href=item[3];a.className='search-result';const type=document.createElement('span'),title=document.createElement('strong'),desc=document.createElement('small');type.textContent=item[0].toUpperCase();title.textContent=item[1];desc.textContent=item[2];a.append(type,title,desc);searchResults.append(a);});}
  function openSearch(){if(!searchOverlay)return;closeMenu();previousFocus=document.activeElement;searchOverlay.hidden=false;document.body.classList.add('no-scroll');searchInput.value='';renderSearch('');searchInput.focus();}
  function closeSearch(){if(!searchOverlay)return;searchOverlay.hidden=true;document.body.classList.remove('no-scroll');if(previousFocus?.focus)previousFocus.focus();}
  $$('.search-trigger').forEach(el=>el.addEventListener('click',openSearch));$('.close-search')?.addEventListener('click',closeSearch);searchOverlay?.addEventListener('click',e=>{if(e.target===searchOverlay)closeSearch();});searchInput?.addEventListener('input',e=>renderSearch(e.target.value));

  const lightbox=$('#lightbox');let lightboxOrigin=null;
  function closeLightbox(){if(!lightbox)return;lightbox.hidden=true;document.body.classList.remove('no-scroll');if(lightboxOrigin?.focus)lightboxOrigin.focus();}
  $$('.media-open').forEach(btn=>btn.addEventListener('click',()=>{if(!lightbox)return;lightboxOrigin=btn;const img=$('img',lightbox);img.src=btn.dataset.image||'';img.alt=btn.dataset.caption||'Depthbound design study';$('.lightbox-caption',lightbox).textContent=btn.dataset.caption||'';lightbox.hidden=false;document.body.classList.add('no-scroll');$('.lightbox-close',lightbox).focus();}));
  $('.lightbox-close')?.addEventListener('click',closeLightbox);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){if(lightbox&&!lightbox.hidden)closeLightbox();else if(searchOverlay&&!searchOverlay.hidden)closeSearch();else closeMenu();}
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(searchOverlay?.hidden)openSearch();else closeSearch();}
    if(e.key==='Tab'&&searchOverlay&&!searchOverlay.hidden){const focusables=$$('button, input, a[href]',searchOverlay).filter(el=>!el.disabled);if(focusables.length){const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}
  });

  function setupFilters(buttonAttr,itemSelector,itemAttr){const buttons=$$(`[${buttonAttr}]`);if(!buttons.length)return;buttons.forEach(button=>button.addEventListener('click',()=>{const value=button.getAttribute(buttonAttr);buttons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});$$(itemSelector).forEach(item=>{item.hidden=value!=='all'&&item.getAttribute(itemAttr)!==value;});}));}
  setupFilters('data-filter','.case-study','data-category');setupFilters('data-roadmap','.roadmap-list article','data-phase');

  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){const items=$$('.pillar-card,.system-preview,.journal-card,.case-study,.feature-triad article,.gallery-tile');items.forEach(el=>el.classList.add('reveal'));const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}},{threshold:.06});items.forEach(el=>observer.observe(el));}

  // Keep this manifest contract compatible with the original V7 launcher.
  async function loadManifest(){let manifest=null;try{const response=await fetch('updates/latest.json',{cache:'no-store'});if(!response.ok)throw new Error(`HTTP ${response.status}`);manifest=await response.json();}catch(_){/* A missing manifest must not enable imaginary download links. */}
    const version=typeof manifest?.version==='string'?manifest.version:'';
    const channel=typeof manifest?.channel==='string'?manifest.channel:'';
    const summary=typeof manifest?.summary==='string'?manifest.summary:'';
    const game=typeof manifest?.gameDownload==='string'?manifest.gameDownload.trim():'';
    const launcher=typeof manifest?.launcherDownload==='string'?manifest.launcherDownload.trim():'';
    const safeDownload=url=>{try{const u=new URL(url,location.href);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch(_){return null;}};
    const gameHref=safeDownload(game),launcherHref=safeDownload(launcher);
    function setText(id,value){const el=document.getElementById(id);if(el)el.textContent=value;}
    setText('manifestVersion',gameHref?`${version||'Build'} · available`:'NOT PUBLISHED');
    setText('manifestSummary',summary||'No public release notes available.');
    setText('manifestInfo',manifest?`Version ${version||'unlisted'} · Channel ${channel||'unspecified'} · Game ${gameHref?'link available':'not published'} · Launcher ${launcherHref?'link available':'not published'}`:'Manifest could not be loaded. No downloads enabled.');
    setText('changelogManifestTitle',manifest?.title||'Development version');
    setText('changelogManifestSummary',summary||'No development manifest available.');
    setText('downloadStatus',gameHref?'A game build link is available':'No public game build announced');
    setText('downloadStatusDetail',gameHref?`Manifest channel: ${channel||'unspecified'}. Check release notes before downloading.`:'The project remains in private development; an internal version number does not mean a public release exists.');
    for(const [id,href,label] of [['gameDownload',gameHref,'DOWNLOAD GAME ↗'],['launcherDownload',launcherHref,'DOWNLOAD LAUNCHER ↗']]){const a=document.getElementById(id);if(!a)continue;if(href){a.href=href;a.textContent=label;a.classList.remove('disabled');a.removeAttribute('aria-disabled');a.removeAttribute('tabindex');a.target='_blank';a.rel='noopener noreferrer';}}
  }
  loadManifest();
})();
