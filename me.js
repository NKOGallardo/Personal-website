
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
