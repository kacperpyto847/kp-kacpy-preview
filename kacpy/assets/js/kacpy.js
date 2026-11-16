"use strict";
(()=>{
 const menu=document.querySelector('.menu-button'),nav=document.querySelector('.k-nav');
 menu?.addEventListener('click',()=>{const on=nav.classList.toggle('open');menu.setAttribute('aria-expanded',on?'true':'false');});
 const header=document.querySelector('.k-header');
 addEventListener('scroll',()=>header?.classList.toggle('fixed',scrollY>20),{passive:true});
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  document.querySelectorAll('.album').forEach(x=>x.hidden=b.dataset.filter!=='all' && x.dataset.category!==b.dataset.filter);
 }));
 const box=document.querySelector('.k-lightbox'),current=document.querySelector('#lb-img'),caption=document.querySelector('#lb-cap');
 let files=[],idx=0;
 function show(n){if(!box||!files.length)return;idx=(n+files.length)%files.length;const im=files[idx];current.src=im.dataset.src;current.alt=im.dataset.alt||'Przykładowy kadr';caption.textContent=(im.dataset.alt||'Kadr demonstracyjny')+' · '+(idx+1)+'/'+files.length;}
 document.querySelectorAll('[data-album-open]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();if(!box)return;
  const key=a.dataset.albumOpen;files=[...document.querySelectorAll('[data-album-id="'+key+'"]')];if(!files.length)return;box.hidden=false;document.body.style.overflow='hidden';show(0);document.querySelector('#lb-close')?.focus();
 }));
 function close(){if(!box)return;box.hidden=true;document.body.style.overflow='';current.removeAttribute('src');}
 document.querySelector('#lb-close')?.addEventListener('click',close);
 document.querySelector('#lb-prev')?.addEventListener('click',()=>show(idx-1));
 document.querySelector('#lb-next')?.addEventListener('click',()=>show(idx+1));
 box?.addEventListener('click',e=>{if(e.target===box)close()});
 addEventListener('keydown',e=>{if(box?.hidden===false){if(e.key==='Escape')close();if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1);}});
 const form=document.querySelector('#kacpy-contact');
 form?.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return;}
 const name=form.querySelector('[name=name]').value.trim();const email=form.querySelector('[name=email]').value.trim();const service=form.querySelector('[name=service]').value;const msg=form.querySelector('[name=message]').value.trim();
 const draft='[KACPY] '+service+'\n\n'+msg+'\n\n--\n'+name+'\n'+email;
 const status=document.querySelector('#mail-status');
 if(navigator.clipboard?.writeText){navigator.clipboard.writeText(draft).then(()=>{status.textContent='Wersja demonstracyjna: treść zapytania skopiowano. Nic nie zostało wysłane.';}).catch(()=>{status.textContent='Wersja demonstracyjna: wiadomość nie została wysłana.';});}
 else if(status) status.textContent='Wersja demonstracyjna: wiadomość nie została wysłana.';
 });
 document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
})();