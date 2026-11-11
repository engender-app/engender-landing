# Tekst przewodnika: Współtworzenie

Tekst źródłowy rozdziału o współtworzeniu. Cytaty blokowe są tekstem strony.
Pozostałe akapity podają źródła. W katalogu tekstów rozdział jest pod
`guide.chapters.contributing.sections`.

**Źródła.** `README.md`, `CONTEXT.md`, `src/lib/data/roadmap.ts` i
`docs/ui-copy.md` aplikacji.

**Sprawdzone 2026-11-11.** Rozdział poniżej sprawdzono z gałęzią
`functional-audit` aplikacji, czyli kandydatem na 1.0.0: z katalogami, ekranami
i `CHANGELOG.md`. Tam, gdzie notatki powyżej opisują starszą aplikację, aktualny
jest rozdział.

## Rozdział

### Zgłaszanie problemów

*Gate: shipped.*

> Błąd zgłosisz w zgłoszeniach na github.com/engender-app/engender. Napisz,
> jaką masz wersję (Ustawienia, potem O aplikacji), czy to Android, czy
> przeglądarka, i jakie kroki prowadzą do problemu. Zgłoszenia są publiczne,
> więc opisz problem na zmyślonych danych i nie wklejaj niczego z dziennika.

### Kod

*Gate: shipped.*

> engender to wolne oprogramowanie na licencji GPLv3. Sklonuj repozytorium
> aplikacji z github.com/engender-app/engender. Mając Node.js 24, uruchom npm
> ci, a potem npm run dev. W README znajdziesz listę testów: npm run check, npm
> test i npm run test:browser sprawdzają różne części aplikacji, a dwa
> pierwsze potrzebują jednego builda w świeżo sklonowanym repozytorium.
>
> Zgłoszenie zmian powinno dotyczyć jednej sprawy i wychodzić z gałęzi
> aktualnej względem main. CI sprawdza każde zgłoszenie, także w przeglądarce,
> i musi przejść przed scaleniem. W testach i zrzutach ekranu używaj zmyślonych
> danych.

### Pakiety krajowe

*Gate: shipped.*

> Nie musisz pisać kodu, żeby pomóc przy pakiecie krajowym. Pakiet jest częścią
> aplikacji i opisuje procedury związane z tranzycją w jednym kraju jako kroki
> na mapie tranzycji. Na razie dostępny jest tylko pakiet polski. Obejmuje
> procedurę prawną i instytucje, w których po niej trzeba zmienić dane.
>
> Do każdego proponowanego kroku podaj źródła i zapisz datę ich sprawdzenia.
> Mapa pokazuje, kiedy jej treść ostatnio sprawdzono, bo procedury się
> zmieniają. Opisuj, na czym polega dany krok, bez radzenia komuś, co ma zrobić
> we własnej sprawie. Możesz przesłać źródła, poprawki albo szkic kroków bez
> edytowania aplikacji.

### Tłumaczenia

*Gate: shipped.*

> Teksty ekranów aplikacji są w plikach messages/en.json i messages/pl.json,
> a npm run strings otwiera edytor obu. Dziś aplikacja obsługuje angielski
> i polski. Kolejny język potrzebuje własnego katalogu tekstów, kilku zmian
> w kodzie, który wymienia języki, i sprawdzenia każdego ekranu z prawdziwymi
> napisami, także z długimi etykietami na małym telefonie.
>
> Tłumacz sens, a potem poprawiaj, aż tekst będzie brzmiał naturalnie w nowym
> języku.
