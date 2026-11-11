# Guide copy, Polish: Zaczynamy

Polska wersja pierwszego rozdziału Przewodnika, napisana w guide ticket 02 obok
angielskiej (Alicja poprosiła o obie wersje w tym tickecie, choć spec odkładał
polską na ticket 08). Napisana po polsku, nie tłumaczona zdanie po zdaniu, i
przepuszczona przez `humanizer-pl`.

**Co jest tekstem, a co nie.** Ta sama zasada co w `landing.md` i `privacy.md`:
tekstem jest wszystko w cytacie blokowym, reszta to komentarz, a kursywny znacznik
nad cytatem mówi, czy wolno go opublikować (docs/adr/0001).

**Słownictwo z aplikacji.** Nazwy kroków i przycisków wzięte z polskiego
katalogu Journal: „Mam już kopię”, „Od razu do aplikacji”, „Dziś”, „Ustawienia”.
Nazwa produktu to engender, małą literą, jak w wersji angielskiej.

**Źródła i decyzje** są te same co w `content/en/guide-getting-started.md`:
dziewięć kroków według `SCREENS.md`, aplikacja na Androida nie jest opisana jako
dostępna.

**Sprawdzone 2026-11-11.** Rozdział poniżej sprawdzono z gałęzią
`functional-audit` aplikacji, czyli kandydatem na 1.0.0: z katalogami, ekranami
i `CHANGELOG.md`. Tam, gdzie notatki powyżej opisują starszą aplikację, aktualny
jest rozdział.

---

## Rozdział

### Instalacja

*Gate: shipped.*

> engender działa w przeglądarce albo jako aplikacja na Androida. W przeglądarce
> niczego nie pobierasz: otwierasz dziennik i od razu możesz pisać. Aplikację
> na Androida trzeba najpierw zainstalować, a skąd ją pobrać, przeczytasz na
> stronie głównej.
>
> Wersję z przeglądarki też możesz zainstalować, z menu przeglądarki albo
> dodając ją do ekranu głównego. Otwiera się wtedy we własnym oknie i działa
> bez internetu.
>
> Dziennik zostaje tam, gdzie go zaczniesz. Aplikacja na Androida
> i przeglądarka w telefonie mają dwa osobne dzienniki, tak samo jak dwie różne
> przeglądarki. Żeby przenieść dziennik, wyeksportuj kopię zapasową, a przy
> pierwszym uruchomieniu engender w nowym miejscu wybierz „Mam już kopię
> zapasową”.

### Bez konta

*Gate: shipped.*

> Nie ma rejestracji ani konta w engender. Nic, co piszesz, nie trafia na
> serwer. Wpisy są zaszyfrowane na twoim urządzeniu i opuszczają je tylko
> wtedy, gdy je wyeksportujesz.
>
> Dlatego nikt nie odda ci dziennika, jeśli zgubisz urządzenie albo je
> wyczyścisz. Przetrwa tylko kopia, którą wcześniej wyeksportujesz, więc rób ją
> co jakiś czas i trzymaj w bezpiecznym miejscu.

### Pierwsze uruchomienie

*Gate: shipped.*

> Przy pierwszym otwarciu engender zadaje kilka pytań, zanim zobaczysz
> dziennik. W nowym dzienniku kroków jest dziewięć, a każdą odpowiedź możesz
> później zmienić.
>
> **Powitanie.** Krótko o tym, czym jest aplikacja. Jeśli masz kopię zapasową,
> wybierz tu „Mam już kopię zapasową” zamiast zaczynać nowy dziennik.
>
> **Imię.** Jak aplikacja ma się do ciebie zwracać. Będzie cię tak witać,
> a imię trafia też do kopii zapasowych.
>
> **Flaga.** Wybierasz flagę. Jej kolory barwią całą aplikację.
>
> **Skale.** Które skale genderowe mają się pojawiać przy wpisie.
>
> **Funkcje.** Które części aplikacji mają być widoczne. Te najczęściej używane
> są już włączone, a to, co zostawisz wyłączone, będzie ukryte, dopóki nie
> włączysz tego w Ustawieniach.
>
> **Blokada.** Jak otwiera się dziennik: hasłem, PIN-em, blokadą urządzenia
> albo bez pytania. Przy każdej opcji jest napisane, co zyskujesz i czym
> ryzykujesz, zanim ją wybierzesz. Zapomnianego hasła ani PIN-u nikt nie
> odzyska.
>
> **Uprawnienia.** O co aplikacja może poprosić telefon, na przykład
> o powiadomienia, i po co. Żadne z nich nie jest potrzebne, żeby napisać wpis.
>
> **Kamuflaż.** Czy poza aplikacją, na przykład na ekranie głównym telefonu
> i na ekranie blokady, ma się nazywać Notatki i mieć inną ikonę. Po
> odblokowaniu dziennika nic się nie zmienia. Jest wyłączony, dopóki go nie
> włączysz.
>
> **Gotowe.** Konfiguracja skończona, a „Otwórz Dziś” przenosi cię do
> dziennika.
>
> Większość kroków ma przycisk „Od razu do aplikacji”, który kończy
> konfigurację wcześniej i zachowuje to, co już wybrano, oraz „Pomiń”, który
> zostawia jedno ustawienie bez zmian. Blokada nie ma żadnego z nich, bo
> dziennik musi się jakoś otwierać.
>
> Po przywróceniu kopii zapasowej konfiguracja jest krótsza. Imię, flaga, skale
> i funkcje są już w kopii, więc aplikacja pyta tylko o blokadę, uprawnienia
> i kamuflaż.
