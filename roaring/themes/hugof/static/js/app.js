// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
    });
  }

  // Code preview language tabs
  document.querySelectorAll('.code-card').forEach(function (card) {
    const tabs   = card.querySelectorAll('.lang-tab');
    const panels = card.querySelectorAll('.code-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.dataset.lang;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        panels.forEach(p => p.classList.toggle('active', p.dataset.lang === target));
      });
    });
  });
});
