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

> Dziennik zostaje w pamięci urządzenia, na którym go używasz. Nie ma konta ani
> profilu na serwerze i nic, co piszesz, nie jest nigdzie wysyłane. Aplikacja
> na Androida i przeglądarka mają osobne dzienniki, tak samo jak dzienniki
> w dwóch profilach przeglądarki.
>
> Aplikację w przeglądarce trzeba jednak skądś pobrać. Gdy się otwiera albo
> aktualizuje, serwer widzi twój adres IP, godzinę zapytania, żądane pliki i ich
> rozmiary, a także nagłówki User-Agent i Referer. Wpisów, zdjęć, notatek ani
> wyników badań w tym ruchu nie ma. Strona i aplikacja w przeglądarce liczą
> też swoje otwarcia, jako sumy bez zapisów pojedynczych odwiedzin. Szczegóły
> są w polityce prywatności.

### Szyfrowanie i dostęp

*Gate: shipped.*

> Baza jest szyfrowana w całości, razem z plikami pomocniczymi i kopią tworzoną
> przed aktualizacją. Zdjęcia i miniatury leżą poza bazą, więc każde szyfruje
> się osobno tym samym losowym kluczem do danych.
>
> Kilka rzeczy nie jest zaszyfrowanych i żadna z nich nie jest treścią
> dziennika: opakowany klucz i ustawienia do jego otwarcia, motyw, paleta
> i język, czas blokady, wybór kamuflażu oraz godziny błędnych prób PIN-u. Na
> Androidzie zrobione zdjęcie trafia też najpierw do niezaszyfrowanego pliku
> tymczasowego, zanim aplikacja je zaimportuje i zaszyfruje.
>
> To, jak otwiera się dziennik, wybierasz w Ustawieniach, w Blokadzie
> i odzyskiwaniu. W przeglądarce może to być hasło, czterocyfrowy PIN razem
> z kluczem trzymanym w profilu przeglądarki, odblokowanie urządzenia przez
> WebAuthn PRF w przeglądarce, która je obsługuje, albo tryb bez blokady,
> z kluczem w profilu przeglądarki i bez pytania. Na Androidzie: blokada ekranu
> albo biometria przez Android Keystore, czterocyfrowy PIN z kluczem
> z Keystore, hasło albo tryb bez blokady, z kluczem z Keystore i bez pytania.
>
> Hasło przechodzi przez Argon2id i opakowuje klucz do danych szyfrem AES-GCM,
> więc możesz je zmienić bez ponownego szyfrowania dziennika. Pozostałe tryby
> zależą od klucza w profilu przeglądarki albo w Android Keystore. Po
> wyczyszczeniu danych witryny, resecie profilu, wyczyszczeniu danych aplikacji
> albo utracie urządzenia tej kopii dziennika nie da się już odczytać.
>
> W tym samym miejscu ustawiasz, kiedy dziennik się blokuje: od razu, po
> minucie, po 5 minutach albo dopiero po ponownym uruchomieniu aplikacji.
>
> Klucz odzyskiwania jest opcjonalny. Ma 25 znaków i aplikacja pokazuje go raz,
> przy tworzeniu. Gdy hasło, PIN albo biometria przestaną działać, otworzy
> dziennik na urządzeniu, a w przeglądarce także w profilu, w których ta kopia
> nadal jest. Nie przenosi dziennika i nie otwiera Archiwum. Bez klucza
> odzyskiwania nikt nie odzyska utraconych danych logowania. Zapomnianego hasła
> do Archiwum też nikt nie odzyska. Po skopiowaniu klucza aplikacja po minucie
> usuwa go ze schowka, o ile system na to pozwala.

### Co widzą inni

*Gate: shipped.*

> Kamuflaż aplikacji zmienia to, co widzi ktoś obok twojego telefonu. Ikona
> i nazwa w launcherze zmieniają się w Notatki, a ekran blokady, widżety,
> powiadomienia oraz, w przeglądarce, ikona i tytuł karty przestają nazywać
> engender. Na Androidzie kamuflaż blokuje też zrzuty ekranu i podgląd na
> liście ostatnio używanych aplikacji. Po odblokowaniu dziennika nic się nie
> zmienia. Kamuflaż to nie szyfrowanie, a Android nadal pokazuje prawdziwą
> nazwę w informacjach o aplikacji i przy prośbach o uprawnienia.
>
> Powiadomienia ukrywają wrażliwe tytuły, dopóki nie wyłączysz opcji „Ukryj
> wrażliwe tytuły”. Godziny przypomnień i codzienne pytanie nadal widać na
> zablokowanym ekranie.

### Android i połączenie z siecią

*Gate: shipped.*

> Aplikacja na Androida nie prosi o uprawnienie INTERNET. Nie otwiera połączeń
> sieciowych i nie wysyła danych dziennika na serwer. Wyłącza też kopię
> zapasową Androida w chmurze i przenoszenie danych między telefonami. Sklep,
> z którego ją instalujesz, może zapisywać instalacje i aktualizacje na
> własnych zasadach.
>
> Android prosi o POST_NOTIFICATIONS, SCHEDULE_EXACT_ALARM
> i RECEIVE_BOOT_COMPLETED, żeby przypomnienia i codzienne pytanie przychodziły
> o wybranej porze i wracały po restarcie telefonu. WAKE_LOCK pozwala
> zaplanowanej kopii zapisać się przy wyłączonym ekranie. RECORD_AUDIO
> i MODIFY_AUDIO_SETTINGS służą do notatek głosowych, a CAMERA do notatek wideo
> i zdjęć, które robi aplikacja aparatu w telefonie. USE_BIOMETRIC
> i USE_FINGERPRINT pozwalają pokazać systemowe pytanie o odcisk palca, twarz
> albo blokadę ekranu.

### Archiwa i pozostałe eksporty

*Gate: shipped.*

> Miejsce zapisu lub udostępnienia pliku wybierasz samodzielnie. Dysk
> w chmurze albo dostawca dokumentów może zobaczyć nazwę i rozmiar pliku, datę
> zapisu oraz historię dostępu do konta.
>
> Zaszyfrowane Archiwum .ttbackup używa szyfrowania AES-256-GCM w częściach
> i hasła, które wybierasz. Hasło chroni to Archiwum, nie dziennik na
> urządzeniu. Nagłówek pozostaje czytelny: pierwsze sześć bajtów to GDIARY,
> dalej są wersja formatu, ustawienia Argon2id i sól. Aplikacja potrzebuje ich,
> żeby rozpoznać plik i wyprowadzić klucz. Nagłówek zdradza format, nie wpisy,
> a reszty bez hasła nikt nie odczyta.
>
> Na Androidzie Eksport automatyczny zapisuje Archiwum w wybranym folderze, co
> tydzień albo co miesiąc. Przy włączonej opcji „Dołączaj kopie z innych
> urządzeń” aplikacja przy otwarciu zagląda do tego folderu i dołącza nowsze
> Archiwum, które inne urządzenie zapisało tam z tym samym hasłem. Nic nie jest
> nigdzie wysyłane. Oba urządzenia tylko czytają i zapisują ten folder.
>
> Część eksportów jest jawna, bo służy do czytania, druku albo udostępnienia:
> dane CSV i JSON, książka dziennika do druku lub PDF, podsumowanie dla osoby
> lekarskiej, kolaże i filmy poklatkowe ze zdjęć, zapisane pliki PDF oraz
> pojedyncze pliki kalendarza .ics. Każda osoba, która dostanie taki plik, może
> przeczytać jego zawartość. Zanim aplikacja utworzy niezaszyfrowany plik,
> prosi o potwierdzenie albo wyraźne działanie.

### Usuwanie wszystkiego

*Gate: shipped.*

> „Usuń wszystko” w Ustawieniach, w sekcji Prywatność i dane, kasuje z tego
> urządzenia dziennik, zdjęcia i nagrania, ustawienia i klucze. Tego nie da się
> cofnąć, a aplikacja proponuje najpierw zrobić kopię zapasową. To samo usuwa
> odinstalowanie aplikacji na Androidzie albo wyczyszczenie danych witryny
> w przeglądarce. Pliki, które już zostały wyeksportowane, zostają tam, gdzie
> je zapisano.

### Zgłoszenia bezpieczeństwa

*Gate: shipped.*

> Problem z bezpieczeństwem możesz zgłosić przez prywatny formularz podatności
> na GitHubie. Podaj wersję aplikacji, urządzenie albo przeglądarkę, jasne
> kroki odtworzenia błędu oraz oczekiwany i otrzymany wynik. Do minimalnego
> przykładu użyj zmyślonych danych.
>
> Projekt prowadzi jedna osoba. Zgłoszenie przeczyta, gdy znów usiądzie do
> pracy. Nie ma stałego terminu odpowiedzi.
