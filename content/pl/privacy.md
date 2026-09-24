# Privacy copy, Polish

Source copy for the Privacy page. Blockquotes are shipping body copy; metadata
is separate. Claims follow the Journal PRODUCT.md, CONTEXT.md access and recovery
terms, and privacy policy. See ticket 09 for the audit and source map.

## Title and opening

*Gate: shipped.*

> Co engender chroni, a czego nie chroni
>
> Dziennik jest zaszyfrowany na twoim urządzeniu. Ochrona zależy też od sposobu
> odblokowania, miejsca przechowywania kopii i tego, kto ma dostęp do urządzenia.

## Gdzie jest twój dziennik

*Gate: shipped.*

> Dziennik zostaje na urządzeniu, na którym piszesz. Nie ma konta engender, serwera z
> kopią ani synchronizacji w tle. Dziennik w przeglądarce i ten na Androidzie są osobne.
> Kopię możesz przenieść za pomocą zaszyfrowanego archiwum.
>
> Aplikacja nie wysyła wpisów na serwer WWW. Pobieranie i aktualizacje aplikacji webowej
> wymagają jednak połączenia z siecią. Szczegóły są poniżej.

## Otwieranie dziennika

*Gate: shipped.*

> Dziennik szyfruje losowy klucz do danych. Wybrany sposób dostępu chroni ten klucz.
> Dzięki temu zmiana hasła nie wymaga ponownego szyfrowania wszystkich wpisów.
>
> **Hasło.** W przeglądarce i na Androidzie wpisywane hasło otwiera klucz do danych z
> użyciem Argon2id. Zapisz je w menedżerze haseł. Nie mogę odzyskać zapomnianego hasła.
>
> **PIN.** Cztery cyfry razem z kluczem powiązanym z urządzeniem chronią klucz do danych.
> Sama kopia pliku dziennika nie wystarczy do zgadywania PIN-u. W przeglądarce kopia
> całego profilu może ujawnić sekret urządzenia. Na Androidzie osoba, która może uruchomić
> własny kod na telefonie, może uzyskać go z Keystore. Z tym sekretem pozostaje tylko 10
> 000 PIN-ów do sprawdzenia. Jeśli obawiasz się takiego dostępu, wybierz hasło.
>
> **Biometria i klucze urządzenia.** W obsługiwanej przeglądarce dziennik otworzysz
> odciskiem palca lub twarzą. Tryb powiązany z urządzeniem otwiera go bez pytania, a klucz
> zostaje w profilu przeglądarki. Na Androidzie tryb powiązany z urządzeniem korzysta z
> Keystore i blokady ekranu lub biometrii. Android ma też osobny tryb bez pytania o
> odblokowanie. Utrata urządzenia lub profilu przeglądarki może oznaczać utratę tej kopii
> dziennika.
>
> Po błędnych próbach PIN-u aplikacja wydłuża czas do kolejnej próby. Nie kasuje
> automatycznie dziennika. To opóźnienie nie chroni przed zgadywaniem poza aplikacją.

## Szyfrowanie zapisanych danych

*Gate: shipped.*

> **Co obejmuje.** Zaszyfrowana jest baza dziennika, jej pliki robocze i kopia tworzona
> przed aktualizacją. Zdjęcia i miniatury są szyfrowane osobno tym samym kluczem do
> danych. Nagrania głosowe również trafiają do zaszyfrowanych plików. Import przechodzi
> przez pamięć, bez pliku tymczasowego.
>
> **Czego nie obejmuje.** Poza zaszyfrowanym dziennikiem zostaje opakowany klucz i
> ustawienia potrzebne do jego otwarcia. Tak samo motyw, paleta i język, ustawienia
> kamuflażu i blokady przy wyjściu oraz znaczniki czasu błędnych prób PIN-u. Nie ma w nich
> wpisów z dziennika.

## Gdy stracisz dostęp

*Gate: shipped.*

> Możesz utworzyć opcjonalny klucz odzyskiwania i zachować go poza urządzeniem. Aplikacja
> pokazuje go tylko raz. Kto ma ten klucz i dostęp do lokalnego dziennika, może go
> otworzyć bez twojego hasła, PIN-u czy biometrii.
>
> Klucz odzyskiwania otwiera tylko kopię, której dane nadal są na danym urządzeniu, a w
> przeglądarce także w tym samym profilu. Nie przywróci zgubionego urządzenia, nie
> przeniesie dziennika ani nie otworzy archiwum. Nie mogę odzyskać tego klucza ani hasła
> do archiwum.
>
> Jeśli nie działa żaden sposób dostępu i nie masz zapisanego klucza odzyskiwania, reset
> aplikacji usuwa lokalny dziennik. Zapisane archiwum pozwoli przywrócić zawarte w nim
> dane, jeśli znasz jego hasło.

## Archiwa i jawne eksporty

*Gate: shipped.*

> Archiwum to kopia dziennika zaszyfrowana hasłem, które wybierasz przed zapisaniem lub
> udostępnieniem pliku. To hasło chroni archiwum niezależnie od dziennika na urządzeniu.
> Kopie tworzone według harmonogramu na Androidzie też są zaszyfrowanymi archiwami.
>
> **Co zdradza archiwum.** Nagłówek jest czytelny: pierwsze sześć bajtów to GDIARY, dalej
> są ustawienia formatu i wyprowadzania klucza. Nagłówek pozwala rozpoznać archiwum
> engender, ale nie ujawnia wpisów. Dostawca miejsca na pliki może też widzieć nazwę i
> rozmiar pliku oraz historię dostępu.
>
> **Jeśli zgubisz hasło do archiwum,** plik pozostanie nieczytelny. Nie dotyczy to innych
> archiwów z innymi hasłami.
>
> Eksporty CSV i JSON, dziennik do druku, podsumowania dla lekarza, udostępniane zdjęcia i
> inne jawne eksporty nie są zaszyfrowane. Każda osoba, która dostanie plik, może go
> przeczytać. Przed utworzeniem pliku aplikacja wymaga potwierdzenia lub wyraźnego
> działania. Ty wybierasz, gdzie go zapiszesz lub udostępnisz.

## Co widzi serwer WWW

*Gate: shipped.*

> Gdy aplikacja webowa się otwiera albo sprawdza aktualizacje, serwer widzi adres IP, czas
> zapytania, żądane pliki i ich rozmiary oraz nagłówki User-Agent i Referer. Nie dostaje
> wpisów, zdjęć, notatek ani wyników badań. Po instalacji dziennik działa także bez
> internetu.
>
> Aplikacja na Androida nie prosi o uprawnienie INTERNET. Operatorzy sklepów mogą
> zapisywać pobrania i aktualizacje. Instalacja z Google Play jest powiązana z twoim
> kontem Google. Żadne ustawienie engender tego nie zmienia.

## Czego to nie chroni

*Gate: shipped.*

> Szyfrowanie zapisanych danych nie chroni otwartego dziennika na ekranie, danych
> odczytanych z pamięci ani przejętego systemu operacyjnego. Kto kontroluje urządzenie,
> może mieć dostęp do tego, co otwierasz. Jawne eksporty wymagają ochrony również tam,
> gdzie je zapisujesz lub udostępniasz.

## More detail

*Gate: shipped.*

> Szczegóły znajdziesz w rozdziale Prywatność Przewodnika.

## Search and share

Jak engender szyfruje dziennik, czym go otworzysz i do czego służy klucz odzyskiwania. Co ujawniają eksporty i co widzi serwer WWW.
