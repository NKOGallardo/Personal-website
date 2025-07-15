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