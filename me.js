  function toggleMobileMenu(icon) {
    const mobileNav = icon.querySelector(".mobile");
    mobileNav.classList.toggle("show");
  }

  function sendEmail () {
    const templateParams = {
      name: document.getElementById("#name").value,
      email: document.getElementById("#Email").value,
      message: document.getElementById("#message").value,
      phone: document.getElementById("#phone").value,
      birthdate: document.getElementById("#Birthdate").value,
  }

  emailjs
  .send("service_5mw71gy", "template_88pph0e", templateParams,)
  .then(() => {
    alert("Email sent successfully!");
  })
  .catch((error) => {
    console.error("Error sending email:", error);
    alert("Failed to send email. Please try again later.");
  });
}
