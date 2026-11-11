# Guide copy, Polish: Statystyki

Polska wersja rozdziału o trzeciej karcie aplikacji, napisana w guide ticket 03
obok angielskiej i przepuszczona przez `humanizer-pl`.

**Co jest tekstem, a co nie.** Ta sama zasada co w `landing.md` i `privacy.md`:
tekstem jest wszystko w cytacie blokowym, reszta to komentarz, a kursywny znacznik
nad cytatem mówi, czy wolno go opublikować (docs/adr/0001).

**Słownictwo z aplikacji.** Z polskiego katalogu Journal: karta „Statystyki”,
„Odczyty”, nazwy odczytów („Dzień po dniu”, „Dwie skale naraz”, „Jak rozłożyły
się dni”, „Słowa, które się wyróżniają”, „Tagi i to, jak poruszyła się skala”,
„Najwyższe dni”, „Mapa ciała”, „Porównanie okresów”, „Motywy dające spokój”),
„Bilans”, „Wspomnienia”, „Licznik”. Wybrany odcinek czasu aplikacja nazywa
okresem („Początek okresu”, „Wybierz okres z listy”), więc tekst też.

**Źródła i decyzje** są te same co w `content/en/guide-stats.md`.

**Sprawdzone 2026-11-11.** Rozdział poniżej sprawdzono z gałęzią
`functional-audit` aplikacji, czyli kandydatem na 1.0.0: z katalogami, ekranami
i `CHANGELOG.md`. Tam, gdzie notatki powyżej opisują starszą aplikację, aktualny
jest rozdział.

---

## Rozdział

### Wybór okresu

*Gate: shipped.*

> Statystyki to trzecia karta. Wszystko na niej dotyczy jednego okresu, który wybierasz na osi czasu u góry: przeciągnij jej końce, wybierz okres z listy albo dotknij ery, kamienia milowego, kuracji, próby lub operacji.
>
> Pod osią są podstawowe liczby: wpisy, średnia na skali, skala, która ruszyła się najbardziej, i dni przy każdym nastroju.

### Odczyty

*Gate: shipped.*

> Każdy kafelek pokazuje jedną liczbę z okresu i otwiera cały odczyt. Kafelka, który nie ma nic do pokazania, nie ma.
>
> **Dzień po dniu.** Jedna albo dwie skale, albo nastrój, w wybranym okresie.
>
> **Dwie skale naraz.** Każdy dzień jako punkt na dwóch skalach.
>
> **O czym piszesz.** Najczęściej używane tagi, ze wszystkich dni albo tylko z dobrych.
>
> **Tagi a zmiany na skali.** Które tagi szły w parze ze wzrostem albo spadkiem skali.
>
> **Mapa ciała.** Jak czuły się poszczególne części ciała, bliżej dysforii albo euforii.
>
> **Porównanie okresów.** Wybrany okres obok równie długiego odcinka tuż przed nim albo dowolne dwa okresy.
>
> **Licznik.** Ile razy ktoś cię zmisgenderował, a ile razy zwrócił się do ciebie dobrze.
>
> **Ile to kosztowało.** Wydatki według obszaru i tego, czy zostały zwrócone, każda waluta osobno.

### Bilans i Wspomnienia

*Gate: shipped.*

> **Bilans.** Podsumowanie zamkniętego tygodnia, miesiąca albo roku.
>
> **Wspomnienia.** Dobry dzień albo dzień z listem sprzed miesiąca, pół roku, roku lub kilku lat.
