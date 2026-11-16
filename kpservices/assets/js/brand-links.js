"use strict";
(() => {
  const local = location.protocol === 'file:' || /^(localhost|127\.0\.1)$/i.test(location.hostname) || location.hostname.endsWith('.github.io');
  const base = {
    kp: local ? '../kpservices/' : 'https://kpservices.pl/',
    kacpy: local ? '../kacpy/' : 'https://kacpy.pl/'
  };
  window.KPBrandURL = (brand, path='') => base[brand] + path.replace(/^\//,'');
  document.querySelectorAll('a[data-brand]').forEach(a => {
    const target = a.dataset.brand;
    if (!base[target]) return;
    a.href = window.KPBrandURL(target,a.dataset.path||'index.html');
  });
})();
