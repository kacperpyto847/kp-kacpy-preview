"use strict";
(() => {
  const root = document.getElementById('builder-options');
  const output = document.getElementById('builder-output');
  if (!root || !output) return;
  const counter = document.getElementById('selected-count');
  const catalogue = [
    {id:'it',title:'IT & Networks',short:'Sieci i technologia',desc:'Sieć, infrastruktura, dostęp i bezpieczeństwo urządzeń.',problems:['niestabilna lub źle skonfigurowana sieć','brak uporządkowanych dostępów i urządzeń'],deliver:['przegląd infrastruktury i najważniejszych ryzyk','plan konfiguracji lub modernizacji']},
    {id:'web',title:'Web & Digital',short:'Strona i obecność online',desc:'WordPress, domena, hosting, aktualizacje i formularze.',problems:['nieaktualna strona i rozproszone informacje','utrudniony kontakt z klubem i zapisy'],deliver:['uproszczona struktura strony i treści','plan utrzymania strony i dostępów']},
    {id:'media',title:'Media & Creative',short:'Content i komunikacja',desc:'Foto, wideo, grafiki, kalendarz treści, sponsorzy.',problems:['nieregularna komunikacja z kibicami i rodzicami','brak powtarzalnych materiałów i szablonów'],deliver:['plan komunikacji i formatów','pakiet szablonów lub zakres produkcji materiałów']},
    {id:'operations',title:'Sport & Event Operations',short:'Mecze i formalności',desc:'Matchday, dokumentacja, bezpieczeństwo, audyty.',problems:['nieprzejrzyste zadania przed meczem','braki w przygotowaniu wydarzenia lub do wymogów ligi'],deliver:['checklista organizacji wydarzenia','analiza obowiązków i dokumentów']},
    {id:'management',title:'Project & Management',short:'Zarządzanie i procesy',desc:'Projekty, ludzie, budżety, role i narzędzia.',problems:['zadania i decyzje bez właścicieli','brak planu, budżetu i miejsca do śledzenia postępów'],deliver:['mapa odpowiedzialności i priorytetów','prosta tablica zadań, harmonogram i sposób raportowania']},
  ];
  const combos = {
    'it+web': ['Stabilna obecność online','Łączymy niezawodny dostęp i konfigurację usług z utrzymaniem witryny, poczty oraz domen.'],
    'it+media': ['Media bez technicznych przeszkód','Przygotowujemy infrastrukturę do szybkiego przesyłania materiałów i pracę nad publikacją zdjęć oraz wideo.'],
    'it+operations': ['Technicznie przygotowany dzień meczu','Weryfikujemy łączność, dostęp i kluczowe urządzenia razem z procedurami działania w dniu wydarzenia.'],
    'it+management': ['Infrastruktura pod kontrolą','Łączymy przegląd sieci z ewidencją urządzeń, odpowiedzialnościami i cyklem utrzymania.'],
    'web+media': ['Spójna komunikacja klubu','Strona zbiera aktualne informacje, a social media i zdjęcia prowadzą kibiców do jednego źródła.'],
    'web+operations': ['Informacja przed i podczas wydarzenia','Zasady wejścia, harmonogram oraz kontakt z klubem są spójnie publikowane na stronie i w komunikatach.'],
    'web+management': ['Jedno źródło informacji','Łączymy uporządkowany obieg treści, dokumentów i odpowiedzialności z aktualną stroną klubu.'],
    'media+operations': ['Matchday od organizacji po relację','Plan dnia meczu zawiera miejsca, zadania i terminy dla fotografa, grafika oraz komunikacji.'],
    'media+management': ['Komunikacja, którą da się utrzymać','Wprowadzamy kalendarz, szablony, role i proces publikacji także przy niewielkim zespole.'],
    'operations+management': ['Sezon i mecze bez chaosu','Łączymy obowiązki formalne, przygotowanie meczów, harmonogram, budżet i odpowiedzialności.'],
  };
  const triples = [
    {ids:['management','media','web'],title:'Klubowa komunikacja jako proces',body:'Ustalamy kto pisze, akceptuje i publikuje, jak treść trafia na WWW oraz social media i jak regularnie informować sponsorów.'},
    {ids:['management','operations','it'],title:'Przygotowanie obiektu i organizacji',body:'Tworzymy listę zadań przed sezonem, wskazujemy odpowiedzialnych i łączymy aspekty techniczne z organizacją wydarzeń.'},
    {ids:['management','operations','media'],title:'Matchday zarządzany od A do Z',body:'Harmonogram, zadania służb i obsługi, plan komunikacji, wybrane materiały oraz sposób raportowania po spotkaniu.'},
    {ids:['operations','web','media'],title:'Kibic ma komplet informacji',body:'Zasady wejścia i informacje organizacyjne na stronie są zsynchronizowane z publikacjami w mediach społecznościowych.'},
    {ids:['it','web','media'],title:'Zaplecze dla działań cyfrowych',body:'Zadbamy o łączność, stronę i materiały wizualne tak, aby publikacja nie zależała od improwizacji w dniu meczu.'}
  ];
  const challenges = {
    awans:{ids:['management','operations','it'],label:'Awans i nowe wymagania',reason:'W pierwszej kolejności analizujemy wymagania rozgrywek, odpowiedzialności, obiekt i harmonogram. Dokładne obowiązki zależą od poziomu ligi.'},
    brakczas:{ids:['management','media'],label:'Brakuje ludzi i czasu',reason:'Szukamy zadań do uproszczenia, odpowiedzialnych osób i możliwej do utrzymania komunikacji. Rozważamy także rekrutację wolontariuszy.'},
    komunikacja:{ids:['media','web','management'],label:'Nie działa komunikacja',reason:'Diagnozujemy kanały, role, jakość materiałów, spójność komunikatów i drogę kibica od social mediów do strony.'},
    wydarzenie:{ids:['operations','media','it'],label:'Organizujemy wydarzenie',reason:'Łączymy operacje, obsługę medialną i zaplecze techniczne, tak aby mieć jedną listę kontrolną i plan awaryjny.'},
    infrastruktura:{ids:['it','web','management'],label:'Problemy z technologią',reason:'Sprawdzamy sieć, usługi internetowe, dostęp do narzędzi, dokumentację oraz sposób utrzymania.'},
    start:{ids:['management','web'],label:'Chcemy uporządkować klub',reason:'Rozpoczynamy od krótkiej diagnozy ról, bieżących zadań, dokumentacji i miejsc, gdzie giną informacje.'}
  };
  let activeChallenge = null;
  const presets = {
    maly:['management','media'],
    awans:['management','operations','it'],
    akademia:['management','web','media'],
    wizerunek:['web','media','management'],
    full:['it','web','media','operations','management']
  };
  let selected = new Set(['management','media']);
  const rawParams = new URLSearchParams(location.search);
  const incomingIds = (rawParams.get('obszary')||'').split(',').map(s=>s.trim().toLowerCase());
  const idAliases = {creative:'media',kacpy:'media',sport:'operations',project:'management'};
  const allowed = new Set(catalogue.map(x=>x.id));
  const validIncoming = incomingIds.map(x=>idAliases[x]||x).filter(x=>allowed.has(x));
  if(validIncoming.length) selected = new Set(validIncoming);
  const initialChallenge = rawParams.get('problem');
  if(initialChallenge && challenges[initialChallenge]) { activeChallenge=initialChallenge; selected=new Set(challenges[initialChallenge].ids); }
  // No HTML from user input is rendered into the output; only static catalog text.
  function elt(tag, cls, txt) { const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e; }
  function renderOptions() {
    root.replaceChildren();
    catalogue.forEach((item,i) => {
      const button=elt('button','builder-option');button.type='button';button.setAttribute('aria-pressed',String(selected.has(item.id)));
      const check=elt('span','builder-check',selected.has(item.id)?'✓':'+');check.setAttribute('aria-hidden','true');
      const copy=elt('span','builder-option-copy');copy.append(elt('b','',item.title),elt('small','',item.desc));
      button.append(check,copy,elt('span','builder-number',String(i+1).padStart(2,'0')));
      button.addEventListener('click',()=> { selected.has(item.id)?selected.delete(item.id):selected.add(item.id);render(); });
      root.append(button);
    });
  }
  function addHeading(parent,text){parent.append(elt('h4','',text));}
  function addParagraph(parent,text,cls=''){parent.append(elt('p',cls,text));}
  function keys(){return catalogue.filter(o=>selected.has(o.id)).map(o=>o.id);}
  function renderResult(){
    output.replaceChildren();const ids=keys();const n=ids.length;counter.textContent=n+' / 5';
    if(!n){output.append(elt('div','builder-output-empty','Wybierz przynajmniej jeden obszar, aby zobaczyć propozycję.'));return;}
    output.append(elt('div','builder-counter','TWÓJ ZESTAW / '+n+' Z 5'));
    if(activeChallenge && challenges[activeChallenge]) {const note=elt('div','builder-reason'); note.textContent=challenges[activeChallenge].label+' — '+challenges[activeChallenge].reason; output.append(note);}
    output.append(elt('h3','',n===5?'Kompleksowy plan dla klubu.':n===1?'Zacznijmy od jednego problemu.':n===2?'Dwa obszary. Wspólny efekt.':'Kilka kompetencji. Jeden projekt.'));
    addParagraph(output,n===5?'Kompletna diagnoza organizacji i infrastruktury, a następnie etapowe wdrożenie. Nie oznacza to automatycznie zakupu wszystkich możliwych usług.':'Wynik pokazuje typowe punkty wspólne wybranych kompetencji oraz przykładowe efekty. Zakres ustalamy dopiero po rozmowie.','summary');
    const tags=elt('div','builder-tags');catalogue.filter(o=>selected.has(o.id)).forEach(o=>tags.append(elt('span','',o.short)));output.append(tags);
    const relevantTriples=triples.filter(t=>t.ids.every(x=>selected.has(x))).slice(0,2);
    const pairs=[]; for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const k=ids[i]+'+'+ids[j];if(combos[k])pairs.push({k,description:combos[k]});}
    if(relevantTriples.length || pairs.length){addHeading(output,'JAK TE OBSZARY SIĘ ŁĄCZĄ');
      relevantTriples.forEach(t=>{const el=elt('div','builder-rel');el.append(elt('strong','',t.title));addParagraph(el,t.body);output.append(el);});
      pairs.slice(0,relevantTriples.length?2:3).forEach(item=>{const el=elt('div','builder-rel');el.append(elt('strong','',item.description[0]));addParagraph(el,item.description[1]);output.append(el);});
    }
    addHeading(output,'PROBLEMY DO SPRAWDZENIA PODCZAS DIAGNOZY');
    const issueList=elt('ul','builder-problems');catalogue.filter(o=>selected.has(o.id)).flatMap(o=>o.problems).slice(0,6).forEach(x=>issueList.append(elt('li','',x)));output.append(issueList);
    addHeading(output,'PRZYKŁADOWE REZULTATY');const delivers=elt('ul','');catalogue.filter(o=>selected.has(o.id)).flatMap(o=>o.deliver).slice(0,6).forEach(x=>delivers.append(elt('li','',x)));output.append(delivers);
    const message=(activeChallenge?'Problem: '+challenges[activeChallenge].label+'. ':'')+'Interesuje mnie połączenie usług: '+catalogue.filter(o=>selected.has(o.id)).map(o=>o.title).join(', ')+'. Chciałbym omówić możliwości i koszty. ('+n+'/5 obszarów)';
    if(selected.has('media')){
      const studio=elt('aside','builder-kacpy');studio.append(elt('strong','','KACPY Creative Studio'));
      addParagraph(studio,'Fotografia, wideo, design i komunikacja. Ten element może być częścią kompleksowej realizacji KP Services. Portfolio obejrzysz osobno, bez utraty wyboru.');
      const a=elt('a','','ZOBACZ REALIZACJE KACPY ↗');a.href=window.KPBrandURL?window.KPBrandURL('kacpy','fotografia.html'):'../kacpy/fotografia.html';a.target='_blank';a.rel='noopener noreferrer';studio.append(a);output.append(studio);
    }
    const link=elt('a','builder-offer' ,'POROZMAWIAJMY O TYM ZESTAWIE ↗');link.href='kontakt.html?type='+encodeURIComponent('Oferta łączona')+'&message='+encodeURIComponent(message);output.append(link);
    addParagraph(output,'To demonstracyjna rekomendacja. Formalne obowiązki, licencje, bezpieczeństwo i dokumentację weryfikujemy względem aktualnych zasad danego wydarzenia lub rozgrywek.','builder-disclaimer');
  }
  function render(){renderOptions();renderChallenges();renderResult();}
  function renderChallenges(){
    document.querySelectorAll('[data-problem]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.problem===activeChallenge)));
    const hint=document.getElementById('problem-hint');
    if(hint) hint.textContent=activeChallenge?challenges[activeChallenge].reason:'Wybierz sytuację, a zestaw zaznaczy się automatycznie. Możesz go później zmienić.';
  }
  document.querySelectorAll('[data-problem]').forEach(button=>button.addEventListener('click',()=>{
    const code=button.dataset.problem;
    activeChallenge=code===activeChallenge?null:code;
    if(activeChallenge) selected=new Set(challenges[activeChallenge].ids);
    render();
    document.getElementById('builder-output')?.scrollIntoView({behavior:'smooth',block:'nearest'});
  }));
  document.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>{const ids=presets[button.dataset.preset];if(!ids)return;activeChallenge=null;selected=new Set(ids);render();document.getElementById('builder-output')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});}));
  render();
})();