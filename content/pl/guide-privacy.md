# Tekst przewodnika: Prywatność

Polski tekst rozdziału o prywatności. To dokładny opis; krótka strona
marketingowa odsyła tu po szczegóły.

**Co jest tekstem strony.** Cytaty blokowe to tekst do publikacji. Reszta to
notatki. Kursywą przed cytatem oznaczono, czy tekst może się ukazać
(docs/adr/0001). W katalogu tekstów rozdział jest pod
`guide.chapters.privacy.sections`.

**Źródła.** Polityka prywatności i `SECURITY.md` z repozytorium Journal oraz
decyzje o szyfrowaniu: ADR-0018, ADR-0020 i ADR-0007. Polityka osobno opisuje
aplikację webową, wydania na Androida i pliki udostępniane poza urządzenie.
Ten rozdział zachowuje te granice.

**Sprawdzone 2026-11-11.** Rozdział poniżej sprawdzono z gałęzią
`functional-audit` aplikacji, czyli kandydatem na 1.0.0: z katalogami, ekranami
i `CHANGELOG.md`. Tam, gdzie notatki powyżej opisują starszą aplikację, aktualny
jest rozdział.

---

## Rozdział

### Gdzie jest dziennik

*Gate: shipped.*

> Dziennik zostaje na urządzeniu, na którym go używasz. Nie ma konta i nic, co piszesz, nie jest nigdzie wysyłane. Aplikacja na Androida i każdy profil przeglądarki mają osobne dzienniki. Co widzi serwer aplikacji w przeglądarce i strona, opisuje polityka prywatności.

### Szyfrowanie i dostęp

*Gate: shipped.*

> Baza dziennika i media są zaszyfrowane. Kilka ustawień potrzebnych aplikacji przed odblokowaniem nie jest i żadne z nich nie jest treścią dziennika.
>
> W Ustawieniach, w Blokadzie i odzyskiwaniu, wybierasz, jak otwiera się dziennik: hasłem, czterocyfrowym PIN-em, blokadą urządzenia albo bez pytania. Tam też ustawiasz, kiedy się blokuje. Dziennik i jego klucze są tylko na tym urządzeniu albo w tym profilu przeglądarki, więc wyczyszczenie danych aplikacji lub witryny usuwa ten dziennik na dobre.
>
> Klucz odzyskiwania jest opcjonalny. Ma 25 znaków i aplikacja pokazuje go raz. Otwiera dziennik tam, gdzie on już jest, gdy zawiedzie hasło, PIN albo biometria. Nie przenosi dziennika i nie otwiera kopii zapasowej. Bez niego nikt nie odzyska utraconych danych logowania.

### Co widzą inni

*Gate: shipped.*

> Kamuflaż aplikacji zmienia jej nazwę na Notatki w launcherze, na ekranie blokady, w widżetach, powiadomieniach i na karcie przeglądarki, a na Androidzie blokuje zrzuty ekranu. To nie szyfrowanie, a Android nadal pokazuje prawdziwą nazwę w informacjach o aplikacji. Powiadomienia ukrywają wrażliwe tytuły, dopóki tego nie wyłączysz.

### Android i połączenie z siecią

*Gate: shipped.*

> Aplikacja na Androida nie prosi o uprawnienie INTERNET. Nie otwiera połączeń sieciowych i wyłącza kopię zapasową Androida w chmurze. Listę jej uprawnień ma polityka prywatności.

### Kopie zapasowe i eksporty

*Gate: shipped.*

> Zaszyfrowaną kopię zapasową (.ttbackup) otwiera tylko hasło, które dla niej ustalasz, i nikt tego hasła nie odzyska. Na Androidzie Eksport automatyczny zapisuje ją w wybranym folderze co tydzień albo co miesiąc, a „Dołączaj kopie z innych urządzeń” dołącza nowsze kopie zapisane tam przez twoje inne urządzenia.
>
> Pozostałe eksporty służą do czytania i nie są szyfrowane: CSV i JSON, książka dziennika, podsumowanie dla osoby lekarskiej, kolaże i filmy poklatkowe, pliki PDF i pliki kalendarza. Aplikacja pyta, zanim taki plik utworzy.

### Usuwanie wszystkiego

*Gate: shipped.*

> „Usuń wszystko” w sekcji Prywatność i dane kasuje z tego urządzenia dziennik i jego klucze. Tego nie da się cofnąć. To samo robi odinstalowanie aplikacji albo wyczyszczenie danych witryny. Wyeksportowane pliki zostają tam, gdzie je zapisano.

### Zgłoszenia bezpieczeństwa

*Gate: shipped.*

> Problem z bezpieczeństwem zgłosisz przez prywatny formularz podatności na GitHubie. Podaj wersję aplikacji, urządzenie albo przeglądarkę i kroki odtworzenia błędu na zmyślonych danych. Projekt prowadzi jedna osoba, więc nie ma stałego terminu odpowiedzi.
