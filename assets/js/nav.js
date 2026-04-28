/**
 * assets/js/nav.js
 * Global navigation behaviours:
 *   1. Sync active state with IntersectionObserver (single-page sections)
 *   2. Smooth-scroll cards into view on click (home page)
 *   3. Keyboard-accessible submenu toggle
 *
 * No dependencies. Loaded deferred from _layouts/default.html.
 */

(function () {
  'use strict';

  // ── Active nav link on scroll ─────────────────────────────────
  const navLinks = document.querySelectorAll('.menu-bar__link:not(.menu-bar__link--action)');

  function clearActive () {
    navLinks.forEach(l => {
      l.classList.remove('is-active');
      l.removeAttribute('aria-current');
      l.closest('.menu-bar__item')?.classList.remove('active');
    });
  }

  function setActive (link) {
    clearActive();
    link.classList.add('is-active');
    link.setAttribute('aria-current', 'page');
    link.closest('.menu-bar__item')?.classList.add('active');
  }

  // Observe in-page anchor sections (home page usage)
  const sectionsToWatch = ['about', 'technology', 'literature', 'contracts'];

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = document.querySelector(
          `.menu-bar__link[href="#${entry.target.id}"]`
        );
        if (target) setActive(target);
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sectionsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // ── Card click → scroll + activate nav link ───────────────────
  window.setActive = function (card, section) {
    const target = document.querySelector(`.menu-bar__link[href="#${section}"]`);
    if (target) setActive(target);
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ── Keyboard: open submenu on Enter/Space, close on Escape ────
  document.querySelectorAll('.menu-bar__item--has-sub > .menu-bar__link').forEach(trigger => {
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        const submenu = trigger.nextElementSibling;
        if (submenu) {
          submenu.hidden = expanded;
        }
      }
      if (e.key === 'Escape') {
        trigger.setAttribute('aria-expanded', 'false');
        const submenu = trigger.nextElementSibling;
        if (submenu) submenu.hidden = true;
        trigger.focus();
      }
    });
  });

}());
