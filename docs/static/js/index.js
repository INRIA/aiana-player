(function() {
  const menuBtn = document.querySelector('#menu-btn');

  menuBtn.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
  });
})();
