
/* cursor */

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let ringX = 0, ringY = 0;
let mouseX = 0, mouseY = 0;

// Mouse move tracking
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
});

// Smooth ring movement
function animateRing() {
    ringX += (mouseX - ringX) / 6;
    ringY += (mouseY - ringY) / 6;

    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animateRing);
}
animateRing();

// Detect interactive elements for hover effect
document.querySelectorAll('a, button, input, img')
    .forEach(el => {
        el.classList.add('hover-target');
    });
    /* me.js | place this in the same folder as your HTML */

document.addEventListener("DOMContentLoaded", () => {
  /* ───────────────────────────────────────────
     1. Mobile-nav hamburger toggle
  ────────────────────────────────────────────*/
  const mobileIcon  = document.getElementById("mobile-icon");
  const mobileLinks = mobileIcon.querySelector(".mobile");

  mobileIcon.addEventListener("click", () => {
    mobileIcon.classList.toggle("active");
  });

  /* close the menu after a link is clicked */
  mobileLinks.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => mobileIcon.classList.remove("active"))
  );

  /* ───────────────────────────────────────────
     2. Animate skill bars on first reveal
  ────────────────────────────────────────────*/
  const skillsSection = document.querySelector(".skills");
  const bars          = document.querySelectorAll(".skills .progress");

  /* Save each bar’s target width, then start at 0 */
  bars.forEach(bar => {
    bar.dataset.target = bar.style.width;
    bar.style.width = "0";
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => (bar.style.width = bar.dataset.target));
        observer.disconnect();                   // run only once
      }
    });
  }, { threshold: 0.45 });

  observer.observe(skillsSection);

  /* ───────────────────────────────────────────
     3. Fun flip on profile image tap / click
  ────────────────────────────────────────────*/
  const profileImg = document.querySelector(".NKO");
  if (profileImg) {
    profileImg.addEventListener("click", () =>
      profileImg.classList.toggle("flip"));
  }
});


 const button = document.getElementById('buildButton');
  let alreadyClicked = false;

  button.addEventListener('click', () => {
    if (alreadyClicked) return; // prevent double click
    alreadyClicked = true;

    button.classList.add('animate');

    // Wait for animation to finish (~1 second)
    setTimeout(() => {
      window.location.href = 'build.html'; // 🔁 Redirect to your page
    }, 1000);
  });

  // build/.//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      AOS.init();

    // Animate skill bars
    document.querySelectorAll('.skill-fill').forEach(el => {
      el.style.width = getComputedStyle(el).getPropertyValue('--value');
    });

    // Set year
    document.getElementById('year').textContent = new Date().getFullYear();
  particlesJS("particles-js", {
    particles: {
      number: { value: 60 },
      color: { value: "#00e6e6" },
      shape: { type: "circle" },
      opacity: { value: 0.2 },
      size: { value: 3 },
      line_linked: { enable: true, color: "#00e6e6", opacity: 0.1 },
      move: { enable: true, speed: 2 }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "repulse" } }
    }
  });

  let slideIndex = 0;
  const slides = document.querySelectorAll('.testimonial');
  function showNextTestimonial() {
    slides.forEach(s => s.classList.remove('active'));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
  }
  setInterval(showNextTestimonial, 4000);

