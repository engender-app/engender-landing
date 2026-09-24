# Guide copy, Polish: Przegląd

Polska wersja rozdziału o trzeciej karcie aplikacji, napisana w guide ticket 03
obok angielskiej i przepuszczona przez `humanizer-pl`.

**Co jest tekstem, a co nie.** Ta sama zasada co w `landing.md` i `privacy.md`:
tekstem jest wszystko w cytacie blokowym, reszta to komentarz, a kursywny znacznik
nad cytatem mówi, czy wolno go opublikować (docs/adr/0001).

**Słownictwo z aplikacji.** Z polskiego katalogu Journal: karta „Przegląd”,
„Odczyty”, nazwy odczytów („Dzień po dniu”, „Dwie skale naraz”, „Jak rozłożyły
się dni”, „Słowa, które się wyróżniają”, „Tagi i to, jak poruszyła się skala”,
„Najwyższe dni”, „Mapa ciała”, „Porównanie okresów”, „Motywy dające spokój”),
„Bilans”, „Wspomnienia”, „Licznik”. Wybrany odcinek czasu aplikacja nazywa
okresem („Początek okresu”, „Wybierz okres z listy”), więc tekst też.

**Źródła i decyzje** są te same co w `content/en/guide-stats.md`.

---

## Rozdział

### Wybór okresu

*Gate: shipped.*

> Przegląd to trzecia karta. Wszystko na niej dotyczy jednego okresu, który
> wybierasz na osi czasu u góry: przeciągnij jej końce albo wybierz okres
> z listy. Na osi widać też ery, kamienie milowe, kurację, próby i operacje,
> a dotknięcie jednej z nich ustawia jej daty.
>
> Tuż pod osią są podstawowe liczby z tego okresu: ile było wpisów, średnia na
> skali i która skala ruszyła się najbardziej.

### Odczyty

*Gate: shipped.*

> Niżej jest siatka odczytów. Każdy kafelek pokazuje jedną liczbę z okresu,
> a po dotknięciu otwiera cały odczyt. Kafelka, który nie ma nic do pokazania,
> po prostu nie ma.
>
> **Dzień po dniu.** Jedna skala albo nastrój w wybranym okresie, dzień za
> dniem.
>
> **Dwie skale naraz.** Każdy dzień jako punkt na dwóch skalach. Można je
> odtworzyć po kolei.
>
> **Jak rozłożyły się dni.** Ile dni wypadło przy każdym nastroju i o czym
> wtedy pisano.
>
> **Słowa, które się wyróżniają.** Słowa, które w tym okresie pojawiają się
> częściej niż w reszcie dziennika.
>
> **Tagi i to, jak poruszyła się skala.** Które tagi szły w parze ze wzrostem
> albo spadkiem skali.
>
> **Najwyższe dni.** Dni z najwyższym wynikiem na wybranej skali. Każdy otwiera
> się jednym dotknięciem.
>
> **Mapa ciała.** Jak w tym okresie czuły się poszczególne części ciała,
> bliżej dysforii albo euforii.
>
> **Porównanie okresów.** Dwa okresy obok siebie. Na początku wybrany okres stoi
> obok równie długiego odcinka tuż przed nim.
>
> **Motywy dające spokój.** Tagi, które najczęściej pojawiają się przy dobrych
> wpisach i tych z gwiazdką.

### Bilans i Wspomnienia

*Gate: shipped.*

> Pod siatką są jeszcze dwa kafelki. Każdy z nich można wyłączyć
> w ustawieniach.
>
> **Bilans.** Podsumowanie zamkniętego tygodnia, miesiąca albo roku, lub
> wybranego okresu: wpisy, nastrój, skala, która ruszyła się najbardziej, tagi,
> kamienie milowe i zdjęcia. Możesz go udostępnić jako kartę, a na karcie nigdy
> nie ma twoich notatek ani zdjęć.
>
> **Wspomnienia.** Dobry dzień sprzed miesiąca, pół roku albo roku, razem
> z listem napisanym lub otwartym tego dnia, jeśli taki jest. Złe dni nie
> wracają.

### Licznik

*Gate: shipped.*

> Licznik zbiera, ile razy ktoś cię zmisgenderował, a ile razy zwrócił się do
> ciebie dobrze, i pokazuje oba wyniki w czasie. Szybkim zapisem dodasz kolejny
> raz do każdego z nich na dowolnym ekranie.
