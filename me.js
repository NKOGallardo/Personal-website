  function toggleMobileMenu(icon) {
    const mobileNav = icon.querySelector(".mobile");
    mobileNav.classList.toggle("show");
  }

  emailjs.sendForm('service_5mw71gy', 'template_88pph0e', '#myForm').then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (error) => {
      console.log('FAILED...', error);
    },
  );
