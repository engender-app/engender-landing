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

> Dziennik to druga karta. Na górze jest miesiąc zwinięty do paska, a „Pokaż miesiąc” rozwija go do mapy cieplnej: dni z wpisami mają kolor według nastroju albo jednej ze skal genderowych, głębszy przy wyższej wartości. Żaden kolor nie znaczy „dobrze” ani „źle”.
>
> Pod spodem są ostatnie wpisy.

### Jeden dzień

*Gate: shipped.*

> Dotknij dnia, żeby zobaczyć wszystko, co wtedy zapisano, albo zacząć wpis z pustego dnia w przeszłości. Oznaczony dzień, który jeszcze nie nadszedł, ma coś zaplanowanego. Po dotknięciu widać co.

### Wyszukiwanie

*Gate: shipped.*

> Ikona lupy otwiera wyszukiwanie z filtrami: tag, nastrój, tryb, obszar ciała, zakres na skali, daty, Ulubione oraz to, czy wpis ma notatkę albo zdjęcie. Znajduje też rzeczy spoza wpisów, na przykład dokumenty po tytule.

### Pisanie wpisu

*Gate: shipped.*

> Wpis potrzebuje nastroju, a reszta jest dowolna. Nowy wpis zaczyna się od pytania „Jak się czujesz?”, z nastrojami i twoimi skalami genderowymi. „Zapisz wpis” kończy w tym miejscu. „Dodaj notatkę, tagi lub zdjęcia” prowadzi do całej strony.
>
> Tam najpierw jest notatka, potem tryb i skale. Przyciski otwierają resztę: tagi, mapę ciała, zdjęcia, głos i wideo. Gwiazdka jest na pasku zapisu.
>
> Na mapie ciała wybierz miejsce i przesuń suwak w stronę dysforii albo euforii. Środek niczego nie zapisuje.
