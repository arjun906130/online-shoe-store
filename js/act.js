const links = document.querySelectorAll('nav a');
const currentPage = window.location.pathname.split("/").pop(); // Get current filename

links.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});