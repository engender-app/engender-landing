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

> Statystyki to trzecia karta. Wszystko na niej dotyczy jednego okresu, który
> wybierasz na osi czasu u góry: przeciągnij jej końce albo wybierz okres
> z listy. Na osi widać też ery, kamienie milowe, kurację, próby i operacje,
> a dotknięcie jednej z nich ustawia jej daty.
>
> Tuż pod osią są podstawowe liczby z tego okresu: ile było wpisów, średnia na
> skali, która skala ruszyła się najbardziej i ile dni wypadło przy każdym
> nastroju.

### Odczyty

*Gate: shipped.*

> Niżej jest siatka odczytów. Każdy kafelek pokazuje jedną liczbę z okresu,
> a po dotknięciu otwiera cały odczyt. Kafelka, który nie ma nic do pokazania,
> po prostu nie ma.
>
> **Dzień po dniu.** Jedna skala albo nastrój w wybranym okresie, dzień za
> dniem. Można dołożyć drugą skalę.
>
> **Dwie skale naraz.** Każdy dzień jako punkt na dwóch skalach. Można je
> odtworzyć po kolei.
>
> **O czym piszesz.** Tagi, których w tym okresie używasz najczęściej, ze
> wszystkich dni albo tylko z dobrych.
>
> **Tagi a zmiany na skali.** Które tagi szły w parze ze wzrostem albo spadkiem
> skali.
>
> **Mapa ciała.** Jak w tym okresie czuły się poszczególne części ciała,
> bliżej dysforii albo euforii.
>
> **Porównanie okresów.** Dwa okresy obok siebie. Na początku wybrany okres stoi
> obok równie długiego odcinka tuż przed nim.
>
> **Licznik.** Ile razy ktoś cię zmisgenderował, a ile razy zwrócił się do
> ciebie dobrze, pokazane w czasie. Szybkim zapisem dodasz kolejny raz do
> każdego z tych wyników na dowolnym ekranie.
>
> **Ile to kosztowało.** Wydatki zapisane w tym okresie, według obszaru i tego,
> czy zostały zwrócone. Każda waluta ma osobną sumę.

### Bilans i Wspomnienia

*Gate: shipped.*

> Pod siatką są jeszcze dwa kafelki. Każdy z nich można wyłączyć
> w Ustawieniach.
>
> **Bilans.** Podsumowanie zamkniętego tygodnia, miesiąca albo roku: wpisy,
> nastrój, skala, która ruszyła się najbardziej, tagi, kamienie milowe, zdjęcia
> i listy.
>
> **Wspomnienia.** Dobry dzień sprzed miesiąca, pół roku, roku albo kilku lat
> albo dzień z listem, napisanym lub otwartym. Zły dzień bez listu nie wraca.
