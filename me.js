/* ═══════════════════════════════════════════════
   NKO_GALLARDO — me.js
   All site interactivity
═══════════════════════════════════════════════ */

// ── 1. CUSTOM CURSOR ──────────────────────────
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mx = -200, my = -200;
let rx = -200, ry = -200;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

// Smooth lerp ring
(function animateCursor() {
  requestAnimationFrame(animateCursor);
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
})();

// Hover expand
document.querySelectorAll('a, button, input, select, textarea, .project-card, .achievement-item, .tech-tags span').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '58px';
    ring.style.height = '58px';
    ring.style.borderColor = 'rgba(184,249,89,0.9)';
    dot.style.width  = '3px';
    dot.style.height = '3px';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(184,249,89,0.6)';
    dot.style.width  = '6px';
    dot.style.height = '6px';
  });
});

// Click feedback
document.addEventListener('mousedown', () => {
  dot.style.transform  = 'translate(-50%,-50%) scale(0.4)';
  ring.style.transform = 'translate(-50%,-50%) scale(0.8)';
});
document.addEventListener('mouseup', () => {
  dot.style.transform  = 'translate(-50%,-50%) scale(1)';
  ring.style.transform = 'translate(-50%,-50%) scale(1)';
});


// ── 2. HEADER SCROLL ──────────────────────────
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });


// ── 3. MOBILE MENU ────────────────────────────
const mobileIcon = document.getElementById('mobile-icon');

if (mobileIcon) {
  mobileIcon.addEventListener('click', () => {
    mobileIcon.classList.toggle('active');
  });

  // Close menu when a link is clicked
  mobileIcon.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileIcon.classList.remove('active');
    });
  });
}

// Close on outside click
document.addEventListener('click', e => {
  if (mobileIcon && !mobileIcon.contains(e.target)) {
    mobileIcon.classList.remove('active');
  }
});


// ── 4. SKILL BAR ANIMATION ────────────────────
const progressBars = document.querySelectorAll('.progress');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const target = bar.getAttribute('data-width');
      bar.style.width = target + '%';
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

progressBars.forEach(bar => skillObserver.observe(bar));


// ── 5. SCROLL REVEAL ──────────────────────────
const revealEls = document.querySelectorAll(
  '.skill-item, .achievement-item, .project-card, .stat, .tech-tags span, .about-text p, .about-lead, .belief-inner'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay based on position
      const siblings = [...entry.target.parentElement.children];
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (index * 0.07) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});


// ── 6. ACTIVE NAV HIGHLIGHT ───────────────────
const sections = document.querySelectorAll('section[id], main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--green)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));


// ── 7. PROJECT CARD TILT ──────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const x     = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y     = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.4s ease, background 0.2s';
  });
});


// ── 8. FORM SUBMIT FEEDBACK ───────────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
  });
}
