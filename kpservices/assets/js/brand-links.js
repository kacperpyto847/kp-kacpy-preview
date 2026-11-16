"use strict";
(()=>{
  const isPreview = location.protocol === 'file:' || /^(localhost|127\.0\.1)$/i.test(location.hostname) || location.hostname.endsWith('.github.io');
  const base = {
    kp: isPreview ? new URL('../kpservices/',location.href).href : 'https://kpservices.pl/',
    kacpy: isPreview ? new URL('../kacpy/',location.href).href : 'https://kacpy.pl/'
  };
  window.KPBrandURL=(brand,path='')=>base[brand]+path.replace(/^\//,'');
  document.querySelectorAll('a[data-brand]').forEach(a=>{
    const brand=a.dataset.brand;if(!base[brand])return;
    a.href=window.KPBrandURL(brand,a.dataset.path||'index.html');
  });
})();
