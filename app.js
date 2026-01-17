
const $ = (s) => document.querySelector(s);
const navBtn = $('.navbtn');
const nav = $('#navlinks');
if (navBtn && nav){
  navBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navBtn.setAttribute('aria-expanded', String(open));
  });
}
const yearEl = $('#year');
if (yearEl) yearEl.textContent = `© ${new Date().getFullYear()}`;
