# Tekst przewodnika: Współtworzenie

Tekst źródłowy rozdziału o współtworzeniu. Cytaty blokowe są tekstem strony.
Pozostałe akapity podają źródła. W katalogu tekstów rozdział jest pod
`guide.chapters.contributing.sections`.

**Źródła.** `README.md`, `CONTEXT.md`, `src/lib/data/roadmap.ts` i
`docs/ui-copy.md` aplikacji.

## Rozdział

### Kod

*Gate: shipped.*

> Sklonuj repozytorium aplikacji z github.com/barankiewicz/gender-diary.
> Uruchom npm install, a potem npm run dev. W README znajdziesz listę
> testów. npm run check, npm test i npm run test:browser sprawdzają różne
> części aplikacji.
>
> Zgłoszenie zmian powinno dotyczyć jednej sprawy. Napisz, co i dlaczego
> zmieniasz oraz jakie testy udało się uruchomić. CI sprawdza każde
> zgłoszenie, także w przeglądarce. W testach i zrzutach ekranu używaj
> zmyślonych danych. Nie dołączaj niczyjego prawdziwego dziennika.

### Pakiety krajowe

*Gate: shipped.*

> Nie musisz pisać kodu, żeby pomóc przy pakiecie krajowym. Pakiet jest
> częścią aplikacji i opisuje procedury związane z tranzycją w jednym kraju
> jako cele planu. Każdy cel należy do jednej z czterech ścieżek:
> społecznej, prawnej, związanej z wyglądem albo medycznej. Na razie
> dostępny jest tylko pakiet polski.
>
> Do każdego proponowanego celu podaj źródła i zapisz datę ich sprawdzenia.
> Data reviewedOn jest widoczna w aplikacji, bo procedury się zmieniają.
> Opisuj, na czym polega dany krok, bez radzenia komuś, co ma zrobić we
> własnej sprawie. Możesz przesłać źródła, poprawki albo szkic celów bez
> edytowania aplikacji.

### Tłumaczenia

*Gate: shipped.*

> Teksty ekranów aplikacji są w plikach messages/en.json i messages/pl.json.
> Dodanie języka wymaga osobnego katalogu tekstów i sprawdzenia ekranów z
> prawdziwymi napisami, także z długimi etykietami na małym telefonie.
>
> Przed pisaniem zajrzyj do docs/ui-copy.md w repozytorium aplikacji. Są
> tam zasady języka używanego w etykietach, wyjaśnieniach i na ekranach
> dotyczących ryzyka. Zachowaj sens, ale napisz tekst naturalnie w nowym
> języku. Dziś aplikacja obsługuje angielski i polski. Kolejny język
> potrzebuje pełnego opracowania.
