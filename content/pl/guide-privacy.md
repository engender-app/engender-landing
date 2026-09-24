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

---

## Rozdział

### Gdzie jest dziennik

*Gate: shipped.*

> Dziennik zostaje w pamięci urządzenia, na którym go używasz. Nie ma konta,
> profilu na serwerze, analityki ani wysyłania wpisów. Dziennik w przeglądarce
> i ten w aplikacji na Androida to dwie osobne kopie, tak samo jak w dwóch
> profilach przeglądarki.
>
> Gdy aplikacja webowa się otwiera albo aktualizuje, serwer WWW widzi twój
> adres IP, godzinę zapytania, żądane pliki i ich rozmiary, a także nagłówki
> User-Agent i Referer. To ruch związany z aplikacją. Wpisy, zdjęcia, notatki
> i wyniki badań nie trafiają na serwer. Aplikacja webowa wysyła zapytania
> potrzebne do pobrania i aktualizacji. Dane dziennika zostają na urządzeniu.

### Szyfrowanie i dostęp

*Gate: shipped.*

> Baza jest szyfrowana w całości, razem z plikami pomocniczymi i kopią
> tworzoną przed aktualizacją. Zdjęcia i
> miniatury leżą poza bazą, więc każde szyfruje się osobno tym samym losowym
> kluczem do danych. Import przechodzi przez pamięć i nie trafia do pliku
> tymczasowego. Zaszyfrowane są też wrażliwe dane potrzebne przy uruchamianiu.
> Aplikacja nie obiecuje, że szyfruje każdy plik
> na urządzeniu. Poza szyfrowaniem zostają opakowany klucz i ustawienia do
> jego otwarcia, motyw, paleta i język, wybór blokady przy wyjściu i kamuflażu
> oraz znaczniki czasu błędnych prób PIN-u. Żadna z tych rzeczy nie jest
> treścią dziennika.
>
> Klucz do danych powstaje losowo. W przeglądarce hasło do dziennika jest
> przetwarzane przez Argon2id i służy do opakowania klucza szyfrem AES-GCM.
> Sama baza używa klucza do danych, nie hasła. Dzięki temu możesz zmienić
> hasło bez ponownego szyfrowania dziennika. Użyteczny klucz istnieje tylko
> w pamięci. Po zakończeniu sesji przeglądarki znów potrzebujesz hasła.
> Możesz też otworzyć dziennik czterocyfrowym PIN-em i kluczem powiązanym
> z urządzeniem, biometrią przez WebAuthn PRF w obsługiwanej przeglądarce
> albo kluczem powiązanym z urządzeniem, który nie wymaga dodatkowego pytania.
> Ten ostatni zostaje w profilu przeglądarki. Wyczyszczenie danych witryny,
> reset profilu albo utrata urządzenia może sprawić, że tej kopii nie da się
> już odczytać.
>
> Android ma cztery tryby dostępu: klucz powiązany z urządzeniem, chroniony
> blokadą ekranu albo biometrią; tryb bez pytania o odblokowanie, z bazą SQLCipher
> i kluczem z Keystore; czterocyfrowy PIN ze sprzętowym kluczem; albo wpisywane
> hasło przetwarzane przez Argon2id. Android Keystore wydaje klucz dopiero po
> sprawdzeniu przez telefon, kto prosi o dostęp.
>
> Klucz odzyskiwania jest opcjonalny. Ma 25 znaków i aplikacja pokazuje go
> tylko raz; sama nie zapisuje go poza urządzeniem. Dziennik w przeglądarce
> otworzy wyłącznie na urządzeniu i w profilu, w których ta kopia nadal jest.
> Na Androidzie otworzy dziennik na tym samym urządzeniu, jeśli dane logowania
> zawiodą. Nie przenosi dziennika ani nie odszyfrowuje archiwum. Bez klucza
> odzyskiwania osoba prowadząca projekt nie odzyska utraconych danych logowania.
> Nie odzyska też hasła do archiwum.

### Android i połączenie z siecią

*Gate: shipped.*

> Aplikacja na Androida nie prosi o uprawnienie INTERNET. Podczas zwykłego
> używania nie otwiera połączeń sieciowych i nie wysyła danych dziennika na
> serwer. Gdy wydania na Androida będą dostępne, operatorzy sklepów mogą
> zapisywać instalacje i aktualizacje na zasadach ze swoich regulaminów.
>
> Android prosi o POST_NOTIFICATIONS, SCHEDULE_EXACT_ALARM i
> RECEIVE_BOOT_COMPLETED, by wysyłać przypomnienia oraz codzienne pytanie,
> używać wybranej pory i przywracać je po restarcie telefonu. Prosi o
> RECORD_AUDIO i MODIFY_AUDIO_SETTINGS do notatek głosowych, a o CAMERA
> do notatek wideo. Zwykłe zdjęcie robi aplikacja aparatu w telefonie.
> Powiadomienia domyślnie pokazują ogólny tytuł, także na zablokowanym ekranie. Możesz
> włączyć wyświetlanie prawdziwego tytułu. Po skopiowaniu klucza odzyskiwania
> aplikacja usuwa go ze schowka po minucie.

### Archiwa i pozostałe eksporty

*Gate: shipped.*

> Miejsce zapisu lub udostępnienia pliku wybierasz samodzielnie. Dysk w
> chmurze albo dostawca dokumentów może zobaczyć nazwę i rozmiar pliku, datę
> zapisu oraz historię dostępu do konta.
>
> Zaszyfrowane archiwum .ttbackup, utworzone ręcznie albo według planu na
> Androidzie, używa szyfrowania AES-256-GCM w częściach i hasła, które
> wybierasz. Hasło chroni to archiwum, nie dziennik na urządzeniu.
> Nagłówek pozostaje czytelny, żeby aplikacja mogła rozpoznać format i wersję
> pliku. Pierwsze sześć bajtów to GDIARY, dalej są ustawienia Argon2id i sól.
> Nagłówek nie zawiera wpisów. Bez hasła nikt nie odczyta zawartości archiwum.
>
> Część eksportów jest jawna, bo służy do czytania, druku albo udostępnienia:
> dane CSV i JSON, książka dziennika do druku lub PDF, podsumowanie dla
> lekarza, kolaże i filmy poklatkowe ze zdjęć, udostępniane karty Wrapped,
> zapisane pliki PDF oraz pojedyncze pliki kalendarza .ics. Każda osoba, która
> dostanie taki plik, może przeczytać jego zawartość. Zanim aplikacja utworzy
> niezaszyfrowany plik, prosi o potwierdzenie albo wyraźne działanie.

### Zgłoszenia bezpieczeństwa

*Gate: shipped.*

> Problem z bezpieczeństwem możesz zgłosić przez prywatny formularz podatności
> na GitHubie. Podaj wersję aplikacji, urządzenie albo przeglądarkę, jasne
> kroki odtworzenia błędu oraz oczekiwany i otrzymany wynik. Do minimalnego
> przykładu użyj zmyślonych danych. Nie wysyłaj wpisów, archiwów, kluczy,
> zrzutów ekranu z prywatnymi danymi ani logów z treścią dziennika. Do
> pomocy ani potwierdzenia błędu nikomu nie jest potrzebny twój dziennik.
>
> Projekt prowadzi jedna osoba. Zgłoszenie przeczyta, gdy znów usiądzie do
> pracy; nie ma stałego terminu odpowiedzi.
