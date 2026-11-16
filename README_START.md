# KP SERVICES V4 + KACPY V1 — DWA POWIĄZANE PROTOTYPY

## Jak uruchomić

1. Rozpakuj cały ZIP, nie wyciągaj pojedynczych plików HTML.
2. Otwórz **index.html** w katalogu głównym — pojawi się wybór marki.
3. Wybierz **KP Services** albo **KACPY**. Możesz przechodzić między nimi.
4. KP Services > Dla sportu > Konfigurator: wybierz problem albo usługi. Powiązania i propozycja aktualizują się automatycznie.
5. Z KACPY kliknij „Zbuduj zakres współpracy”: przeniesie Cię do KP Services z zaznaczonym Media & Creative.

## Co jest gotowe

- KP Services V4: wszystkie 13 podstron z V3 (struktura, treści i styl), nowy monogram KP + napis Services, odnośniki do KACPY oraz problem-first w konfiguratorze.
- KACPY V1: strona główna, fotografia, video, design, social, projekty i kontakt; 7 podstron.
- KACPY: filtrowanie albumów, podgląd slajdów w lightboxie (przycisk otwarcia, strzałki i Esc), menu mobilne, materiały demonstracyjne.
- Wspólny konfigurator oferty ma 5 wybieralnych filarów i 6 scenariuszy problemowych.
- Kontakt: prototypowy **mailto**, nie działa jako serwerowy formularz. Nie podawaj poufnych danych w materiałach testowych.

## Dwie domeny

- KP Services -> kpservices.pl
- KACPY -> kacpy.pl
- Linki są lokalne przy otwarciu plików albo na localhost; na produkcyjnych domenach prowadzą do właściwych adresów.
- W WordPress trzeba przygotować trwałe adresy /dla-sportu/ i /fotografia/ oraz dopasować ścieżki do zbudowanych podstron. Aktualne adresy HTML to prototyp, nie instalacja WordPress.

## Bezpieczeństwo i treść

- Wszystkie grafiki w portfolio to **DEMO**, nie są to autentyczne fotografie Kacpra Pyto.
- Opisy doświadczenia odziedziczono z V3, do weryfikacji przed publikacją (zgody na logo/nazwy, zakres kwalifikacji, referencje).
- KP Services, KACPY oraz domeny należy zweryfikować pod kątem kolizji nazw i praw do znaków.
- Dane firmowe i kontaktowe w publikacji: potwierdzenie adresu e-mail, NIP, polityki prywatności, RODO/cookies oraz dokumentów wymaganych prawem.
- Statyczny HTML/CSS/JS: żadna witryna nie została jeszcze opublikowana w internecie, nie jest to ukończony motyw WordPress.
- Formularze mailto są prototypowe. Na produkcji zastąpić bezpieczną obsługą SMTP i anti-spamem.
- Fonty KACPY pobierane z Google Fonts; bez internetu przeglądarka użyje Arial. Można zamienić na lokalnie hostowane fonty z licencją.

## Kontrola zmian

`kpservices/assets/css/ecosystem.css` — nowe elementy marki i konfiguratora.
`kpservices/assets/js/club-builder.js` — problem-first, wybór 1–5 obszarów, scenariusze, wynik i link do KACPY.
`kacpy/assets/css/kacpy.css` i `kacpy/assets/js/kacpy.js` — strona studia.
`assets/js/brand-links.js` w każdej marce — adresy cross-domain, automatyczna obsługa preview local/production.

## Sugerowane wdrożenie do WordPressa

Etap 1: review treści, realne zdjęcia i logo KACPY, zatwierdzenie domen.
Etap 2: przekształcenie obydwu projektów do lekkich motywów Gutenberg, albumy i case studies jako typy wpisów, formularz produkcyjny.
Etap 3: testy bezpieczeństwa, dostępności, wydajności, SEO, prawa autorskie i publikacja.
