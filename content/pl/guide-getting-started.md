# Guide copy, Polish: Na początek

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

> engender działa w przeglądarce albo jako aplikacja na Androida. W przeglądarce niczego nie pobierasz: otwierasz dziennik i piszesz. Możesz go zainstalować z menu przeglądarki, wtedy otwiera się we własnym oknie i działa bez internetu. Skąd pobrać aplikację na Androida, przeczytasz na stronie głównej.
>
> Dziennik zostaje tam, gdzie go zaczniesz. Aplikacja na Androida i każda przeglądarka mają osobne dzienniki. Żeby przenieść dziennik, wyeksportuj kopię zapasową, a przy pierwszym uruchomieniu engender w nowym miejscu wybierz „Mam już kopię zapasową”.

### Bez konta

*Gate: shipped.*

> Nie ma rejestracji ani serwera. To, co piszesz, jest zaszyfrowane na twoim urządzeniu i opuszcza je tylko wtedy, gdy to wyeksportujesz. Dlatego nikt nie odda ci dziennika, jeśli zgubisz urządzenie. Rób co jakiś czas kopię zapasową i trzymaj ją w bezpiecznym miejscu.

### Pierwsze uruchomienie

*Gate: shipped.*

> Nowy dziennik zaczyna od dziewięciu pytań. Każdą odpowiedź możesz później zmienić.
>
> **Powitanie.** Zaczynasz nowy dziennik albo wybierasz „Mam już kopię zapasową”.
>
> **Imię.** Jak aplikacja ma się do ciebie zwracać. Imię trafia też do kopii zapasowych.
>
> **Flaga.** Jej kolory barwią całą aplikację.
>
> **Skale.** Które skale genderowe oceniasz we wpisie.
>
> **Funkcje.** Które części aplikacji mają być widoczne. Reszta jest ukryta, dopóki nie włączysz jej w Ustawieniach.
>
> **Blokada.** Jak otwiera się dziennik: hasłem, PIN-em, blokadą urządzenia albo bez pytania. Zapomnianego hasła ani PIN-u nikt nie odzyska.
>
> **Uprawnienia.** O co aplikacja może poprosić telefon, na przykład o powiadomienia. Żadne nie jest potrzebne do pisania.
>
> **Kamuflaż.** Czy na ekranie głównym i ekranie blokady aplikacja ma się nazywać Notatki i mieć inną ikonę. Jest wyłączony, dopóki go nie włączysz.
>
> **Gotowe.** „Otwórz Dziś” przenosi cię do dziennika.
>
> Każdy krok oprócz Blokady można pominąć, a „Od razu do aplikacji” kończy konfigurację wcześniej i zachowuje to, co już wybrano. Po przywróceniu kopii zapasowej aplikacja pyta tylko o blokadę, uprawnienia i kamuflaż.
