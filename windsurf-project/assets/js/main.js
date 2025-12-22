// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    toggle.setAttribute('aria-expanded', String(!open));
  });
}

// Dropdown nav (Katalog)
(function(){
  const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
  if (dropdowns.length === 0) return;

  function closeAll(except){
    dropdowns.forEach(dd => {
      if (except && dd === except) return;
      dd.classList.remove('open');
      const trigger = dd.querySelector('.dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dd.classList.contains('open');
      closeAll(dd);
      dd.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    const clickedInside = dropdowns.some(dd => dd.contains(target));
    if (!clickedInside) closeAll();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();

// Theme (light/dark) handling
(function(){
  const docEl = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const storageKey = 'theme';
  const mql = window.matchMedia('(prefers-color-scheme: light)');

  function currentSystem() { return mql.matches ? 'light' : 'dark'; }

  function applyTheme(theme){
    const t = theme || 'dark';
    if (t === 'light') {
      docEl.setAttribute('data-theme','light');
    } else {
      docEl.removeAttribute('data-theme');
    }
    if (btn){
      if (t === 'light'){
        btn.textContent = '🌙';
        btn.setAttribute('aria-label','Basculer en mode sombre');
      } else {
        btn.textContent = '☀️';
        btn.setAttribute('aria-label','Basculer en mode clair');
      }
    }
  }

  // Initialize from localStorage or system
  let saved = localStorage.getItem(storageKey);
  if (saved !== 'light' && saved !== 'dark') saved = null;
  let initial = saved || currentSystem();
  applyTheme(initial);

  // Respond to system changes if user hasn't chosen explicitly
  mql.addEventListener('change', (e) => {
    const explicit = localStorage.getItem(storageKey);
    if (explicit === 'light' || explicit === 'dark') return;
    applyTheme(e.matches ? 'light' : 'dark');
  });

  // Button toggle
  if (btn){
    btn.addEventListener('click', () => {
      const now = docEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = now === 'light' ? 'dark' : 'light';
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }
})();

// Year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
