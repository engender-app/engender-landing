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

> Błąd zgłosisz na github.com/engender-app/engender. Podaj wersję (Ustawienia, potem O aplikacji), czy to Android, czy przeglądarka, i kroki. Zgłoszenia są publiczne, więc nie wklejaj niczego z dziennika.

### Kod

*Gate: shipped.*

> engender to wolne oprogramowanie na licencji GPLv3. Sklonuj repozytorium i, mając Node.js 24, uruchom npm ci, a potem npm run dev. Listę testów znajdziesz w README. Jedno zgłoszenie zmian to jedna sprawa. CI musi przejść przed scaleniem.

### Pakiety krajowe

*Gate: shipped.*

> Pakiet opisuje procedurę tranzycji w jednym kraju jako kroki na mapie tranzycji. Na razie dostępny jest tylko pakiet polski. Pomóc można bez pisania kodu: prześlij poprawki ze źródłami albo szkic kroków, z datą sprawdzenia każdego źródła. Opisuj, na czym polega krok, bez radzenia komuś, co ma zrobić we własnej sprawie.

### Tłumaczenia

*Gate: shipped.*

> Teksty ekranów są w plikach messages/en.json i messages/pl.json, a npm run strings otwiera edytor obu. Aplikacja obsługuje angielski i polski. Kolejny język potrzebuje własnego katalogu i sprawdzenia każdego ekranu z prawdziwymi napisami.
