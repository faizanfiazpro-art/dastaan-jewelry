const menuButton = document.querySelector('.nav-toggle');
const menu = document.querySelector('[data-menu]');
const backToTop = document.querySelector('.back-to-top');
const year = document.querySelector('#year');
const filterButtons = document.querySelectorAll('[data-filter]');
const products = document.querySelectorAll('[data-category]');
const revealItems = document.querySelectorAll('.reveal');

year.textContent = new Date().getFullYear();

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    const filter = button.dataset.filter;
    products.forEach((product) => {
      const categories = product.dataset.category.split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      product.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 600);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));
