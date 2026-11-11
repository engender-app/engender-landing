# Guide copy, Polish: Dziennik

Polska wersja rozdziału o drugiej karcie aplikacji, napisana w guide ticket 03
obok angielskiej i przepuszczona przez `humanizer-pl`.

**Co jest tekstem, a co nie.** Ta sama zasada co w `landing.md` i `privacy.md`:
tekstem jest wszystko w cytacie blokowym, reszta to komentarz, a kursywny znacznik
nad cytatem mówi, czy wolno go opublikować (docs/adr/0001).

**Słownictwo z aplikacji.** Z polskiego katalogu Journal: karta „Dziennik”,
„Ostatnie wpisy”, „Szukaj”, filtr „Ulubione” (gwiazdka), „Zapisane pytania”,
„Tryb”, „Mapa ciała”. „Dziennik” to w aplikacji zarówno karta, jak i całość
zapisów; tekst mówi „karta Dziennik”, gdzie chodzi o kartę.

**Źródła i decyzje** są te same co w `content/en/guide-calendar.md`, łącznie
z mapą ciała jako jednym suwakiem (ADR-0081).

**Sprawdzone 2026-11-11.** Rozdział poniżej sprawdzono z gałęzią
`functional-audit` aplikacji, czyli kandydatem na 1.0.0: z katalogami, ekranami
i `CHANGELOG.md`. Tam, gdzie notatki powyżej opisują starszą aplikację, aktualny
jest rozdział.

---

## Rozdział

### Miesiąc

*Gate: shipped.*

> Dziennik to druga karta i są na niej twoje dni. Na górze jest miesiąc,
> zwinięty do paska. „Pokaż miesiąc” rozwija go do mapy cieplnej: dni z wpisami
> są wypełnione kolorem według nastroju albo, jeśli to przełączysz, według
> jednej ze skal genderowych. Głębszy kolor oznacza wyższą wartość. Żaden kolor
> nie znaczy „dobrze” ani „źle”.
>
> Pod miesiącem są ostatnie wpisy, a przycisk pod nimi dokłada po pięć
> kolejnych dni.

### Jeden dzień

*Gate: shipped.*

> Dotknij dnia, żeby zobaczyć wszystko, co wtedy zapisano. Wpisów w jednym dniu
> może być dowolnie dużo, a dotknięcie pustego dnia z przeszłości zaczyna wpis
> z tego dnia. Małe oznaczenie na dniu, który jeszcze nie nadszedł, znaczy, że
> coś jest zaplanowane, na przykład wizyta albo list do otwarcia. Po dotknięciu
> widać co.

### Wyszukiwanie

*Gate: shipped.*

> Ikona lupy na górze karty Dziennik otwiera wyszukiwanie. Zanim cokolwiek
> wpiszesz, podpowiada najczęściej używane tagi i ostatnie wyszukiwania. Filtry
> zawężają wyniki do tagu, nastroju, trybu, obszaru ciała, zakresu na jednej ze
> skal, zakresu dat, ulubionych albo wpisów z notatką lub ze zdjęciem.
>
> Wyszukiwanie zagląda też poza wpisy, na przykład do tytułów dokumentów.
> To, co tam znajdzie, pokazuje w sekcji „Poza wpisami”.
>
> Wpis, do którego chcesz wrócić, oznacz gwiazdką. Filtr „Ulubione” pokaże
> wszystkie takie wpisy.

### Pisanie wpisu

*Gate: shipped.*

> Wpis to jedna chwila. Potrzebuje nastroju, a cała reszta jest dowolna.
>
> Nowy wpis zaczyna się od pytania „Jak się czujesz?”, z pięcioma nastrojami
> i twoimi skalami genderowymi. „Zapisz wpis” kończy w tym miejscu i to już
> jest pełny wpis. „Dodaj notatkę, tagi lub zdjęcia” prowadzi do całej strony
> wpisu.
>
> Tam na górze, pod datą, jest notatka, a pod nią tryb i skale genderowe.
> Nastroje i gwiazdka są na pasku zapisu na dole. Rząd przycisków otwiera
> resztę, po jednej sekcji naraz: tagi, mapę ciała, zdjęcia, głos i wideo.
> Zapisany wpis otwiera się do edycji od razu na tej stronie.
>
> Na mapie ciała zaznaczasz, jak czujesz daną część ciała. Wybierz miejsce
> i przesuń suwak w stronę dysforii albo euforii. Suwak zostawiony na środku
> niczego nie zapisuje.
