# KP Consulting & Services — prototyp strony WWW v3.0

## Co jest w paczce

Działająca statyczna witryna HTML/CSS/JavaScript, 13 stron, z brandingiem KP oraz pięcioma równorzędnymi działami usług:
- IT & Networks
- Web & Digital
- Media & Creative
- Sport & Event Operations
- Project & Management

Dodatkowo: **Dla sportu — konfigurator usług**, **Dla małych klubów**, **Realizacje**, **O mnie**, **Fotografia — kolekcje meczów i wydarzeń**, **Kontakt**.

## Jak uruchomić

**Najszybciej:** wypakuj archiwum ZIP i otwórz `index.html` w przeglądarce (Chrome, Edge, Firefox). Większość funkcji działa również bez internetu.

**Polecam lokalny serwer, żeby sprawdzić zachowanie tak jak na hostingu:**

```bash
cd KP_website_prototype_v3
python -m http.server 8080
```

Otwórz `http://localhost:8080`.

## Co działa już teraz

- Nawigacja między 13 podstronami i menu mobilne.
- Responsywny układ na telefonie, tablecie i desktopie.
- Animacje wejścia podczas przewijania (z obsługą ustawień ograniczenia ruchu).
- Filtrowanie doświadczeń według obszaru.
- Portfolio fotograficzne w osobnych kolekcjach, filtrowanie typu galerii, podgląd albumu, lightbox ze strzałkami i obsługą klawiatury.
- Sekcja kwalifikacji technicznych oraz uprawnień/doświadczenia w bezpieczeństwie i organizacji wydarzeń.
- Rozwijane odpowiedzi FAQ.
- Walidacja formularza; **przygotowanie wiadomości przez mailto** w programie pocztowym.
- Autentyczne logo KP w SVG z zaakceptowanego pakietu, favicon i podstawowe meta SEO.
- Bez zewnętrznych frameworków, skryptów śledzących i płatnych zależności.

## Ważne: to prototyp, nie opublikowana witryna

1. Brak domeny, hostingu i instalacji WordPress. Nie ma panelu CMS. Projekt front-end będzie podstawą dedykowanego motywu WordPress.
2. Grafiki w `assets/img` to **autorskie demonstracyjne ilustracje SVG**, nie zdjęcia realizacji. Docelowo należy je podmienić na zatwierdzone zdjęcia / case studies.
3. Dane z doświadczeń Warta Poznań / Systemia odzwierciedlają informacje z CV i przekazane przez właściciela. Ich publikację, zakres i zgodę na użycie nazw/znaków należy zatwierdzić przed uruchomieniem.
4. Formularz **nie wysyła niczego na serwer** — uruchamia aplikację pocztową. Adres odbiorcy w `assets/js/site.js` to e-mail wskazany w przesłanym CV, wymaga potwierdzenia przed publikacją. W produkcji można zastosować np. formularz z zabezpieczeniem antyspamowym i backendem.
5. Brak polityki prywatności / cookies / warunków prawnych, które trzeba dostosować do faktycznych narzędzi po wdrożeniu. W prototypie nie uruchamiamy analityki ani marketingowych cookies.
6. Opisy usług organizacji wydarzeń oznaczają konsultacje i pomoc w przygotowaniach; nie zastępują prawnie wymaganych uprawnień, dokumentów formalnych ani decyzji instytucji.

## Struktura

- `index.html` — strona główna.
- `uslugi.html` — katalog usług.
- `it-networks.html`, `web-digital.html`, `media-creative.html`, `sport-event-operations.html`, `project-management.html` — pięć filarów.
- `dla-sportu.html` — landing branżowy z interaktywnym konfiguratorem.
- `male-kluby.html` — oferta i pakiety dla małych klubów.
- `realizacje.html` — portfolio / doświadczenie z filtrowaniem.
- `o-mnie.html` — doświadczenie, kwalifikacje i uprawnienia.
- `fotografia.html` — portfolio foto: albumy, filtry, podgląd zdjęć.
- `kontakt.html` — kontakt i formularz mailto.
- `assets/css/site.css` — cały design system.
- `assets/js/site.js` — interakcje.
- `assets/js/portfolio.js` — katalog albumów i przeglądarka zdjęć (łatwo podmienić ścieżki).
- `assets/css/portfolio.css` — style dodatkowych sekcji i galerii.
- `assets/portfolio/` — demonstracyjne okładki i zdjęcia zastępcze.
- `assets/brand/` — oficjalne pliki KP z wcześniej przygotowanego brand packa.
- `assets/img/` — demonstracyjne ilustracje SVG.
- `assets/js/club-builder.js` — katalog usług, gotowe scenariusze i reguły powiązań konfiguratora.
- `docs/STRATEGIA_MALE_KLUBY_V3.md` — research i strategia oferty dla małych klubów.

## Następne kroki

1. Akceptacja wyglądu i struktury; zamiana sztucznych ilustracji na autentyczne materiały.
2. Potwierdzenie adresu e-mail, ewentualnego telefonu, opisu zawodowego i publikowanych case studies.
3. Domena, hosting i WordPress (wskazana aktualna wersja PHP i WordPress, automatyczne kopie i SSL).
4. Zamiana projektu na motyw WordPress: edytowalne sekcje, oferta i typ wpisu „Realizacje”.
5. Formularz produkcyjny, polityka prywatności, testy wydajności, dostępności, SEO i backup.

## Autorstwo i prawa

Layout, kod i demonstracyjne ilustracje opracowane na potrzeby prototypu. Logo pochodzi z uzgodnionego wcześniej brand packa KP. Nie dołączano cudzych zdjęć ani bibliotek z restrykcyjnymi licencjami.

## Jak podmienić grafiki w portfolio na autentyczne zdjęcia

1. Włóż własne fotografie do folderu `assets/portfolio/real/`. Użyj WEBP albo JPG, np. `warta-lech-01.webp`.
2. Otwórz `assets/js/portfolio.js`. W tablicy `KP_PHOTO_ALBUMS` znajdziesz sześć przykładowych kolekcji. Zmień `name`, `description`, `category`, ścieżkę `cover` i tablicę `photos`. Każdy wpis tablicy `photos` to ścieżka do pliku.
3. W `fotografia.html` podmień okładkę albumu (`img src`) i jego tytuł / opis. Aby dodać nowy album, skopiuj jeden przycisk `.album-card`, ustaw nowe `data-album` i dopisz ten sam `id` w `portfolio.js`.
4. Galerie są sortowane w interfejsie według `data-category`: `mecze`, `wydarzenia`, `zawodnicy`, `komercja`. W WordPress przekształcimy je w galerie i kategorie zarządzane z panelu, bez edycji kodu.
5. Przed publikacją sprawdź zgody i prawa do publikacji zdjęć (w szczególności zdjęć małoletnich, materiałów klubowych i zdjęć objętych zasadami akredytacji).

## Kwalifikacje i bezpieczeństwo — do potwierdzenia

Na podstawie dostarczonego CV potwierdzone są: MTCNA, MTCRE, kurs Cisco CCNA Intro, szkolenia Linux, kwalifikacje E.12/E.13/E.14, zaświadczenie ze szkolenia służb porządkowych i informacyjnych i szkolenia zarządzania projektami.
KPOF dodałem na podstawie oświadczenia właściciela w rozmowie. Przed publikacją trzeba zweryfikować aktualny wpis na listę i dokładne brzmienie uprawnienia. "Kierownik ds. bezpieczeństwa" jest opisem pełnionej funkcji, a nie automatycznie osobnym certyfikatem. Jeśli istnieje zaświadczenie ze szkolenia kierowników ds. bezpieczeństwa, można dodać je po potwierdzeniu nazwy i organizatora.

## Uwaga dla developera

Źródłem wersji V3 są gotowe pliki HTML, CSS i JS. Starszy generator V1 został usunięty z paczki, ponieważ nie uwzględniał wszystkich zmian i mógł nadpisać nowe podstrony.


## Zmiany w V3

- `project-management.html` — nowy filar dla firm, klubów i organizacji: audyt procesów, koordynacja projektów, budżety, role, dokumenty i dobór narzędzi.
- `dla-sportu.html#konfigurator` — interaktywny selektor 1–5 specjalizacji, gotowe scenariusze, dynamiczne powiązania obszarów, problemy, deliverables i CTA. Dane scenariuszy znajdują się w `assets/js/club-builder.js`; działają lokalnie bez backendu.
- `male-kluby.html` — osobna oferta dla klubów grassroots i akademii: diagnoza potrzeb, propozycje ograniczonych pakietów, jasne wyłączenia, połączenie z konfiguracją usług.
- Zaktualizowano homepage, katalog usług, stopki, treść O mnie i wybór usług w formularzu.
- Ceny pakietów są roboczymi przykładami, nie zaakceptowaną polityką cenową — wymagają zatwierdzenia przed publikacją.
- W CTA konfiguratora dane wyboru są przekazywane do strony kontaktowej w URL, a formularz otwiera aplikację e-mail (bez serwerowego wysyłania).
- Obowiązki licencyjne i dokumentacyjne wynikają z aktualnych regulaminów konkretnej ligi, WZPN i rodzaju wydarzenia; nie ma automatycznej gwarancji licencji, dotacji czy zezwolenia.
- Dostępność: kontrolki konfiguratora to natywne przyciski z aria-pressed, automatyczne aktualizacje wyniku, obsługa klawiatury i prefers-reduced-motion.

### Źródła uzasadniające nową ofertę (research, nie materiały na stronie)
- The FA / England Football Growing Volunteers: https://www.englandfootball.com/participate/volunteer/growing-volunteers
- The FA Learning and Development for Volunteers: https://www.englandfootball.com/participate/volunteer/Learning-and-Development-for-Volunteers
- KS Pomorzanin rekrutacja social media (2026): https://kspomorzanin.pl/dolacz-do-zespolu-ks-pomorzanin-torun/
- Biali Sądów rekrutacja social media (2026): https://www.mksdrawadrawno.pl/pilka-lokalna/biali-sadow-poszukuja-osoby-do-prowadzenia-mediow-spolecznosciowych-klubu-7c256e
- PZPN podręczniki licencyjne: https://www.pzpn.pl/federacja/dokumenty
- MSiT wyniki Programu KLUB 2026: https://www.gov.pl/web/sport/wyniki-naboru-wnioskow-w-ramach-rzadowego-programu-klub--edycja-2026

### Uwaga o aktualizacji plików

Stary `docs/generate_site.py` pochodzi z V1 i nie odtwarza wszystkich zmian V2/V3. Nie uruchamiać bez synchronizacji. Źródłem wersji V3 są gotowe HTML/CSS/JS w paczce.
