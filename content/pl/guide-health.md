# Guide copy, Polish: Zdrowie

Polska wersja rozdziału Zdrowie, jednej z czterech grup na karcie Tranzycja,
napisana w guide ticket 04 obok angielskiej. Napisana po polsku, nie tłumaczona
zdanie po zdaniu, i przepuszczona przez `humanizer-pl`.

**Co jest tekstem, a co nie.** Ta sama zasada co w `landing.md` i `privacy.md`:
tekstem jest wszystko w cytacie blokowym, reszta to komentarz, a kursywny znacznik
nad cytatem mówi, czy wolno go opublikować (docs/adr/0001).

**Słownictwo z aplikacji.** Nazwy ekranów, grup i etykiet pochodzą z polskiego
katalogu Journal, a formy zwracania się do czytelnika nie określają płci.

**Źródła i decyzje** są te same co w `content/en/guide-health.md`.

**Sprawdzone 2026-11-11.** Rozdział poniżej sprawdzono z gałęzią
`functional-audit` aplikacji, czyli kandydatem na 1.0.0: z katalogami, ekranami
i `CHANGELOG.md`. Tam, gdzie notatki powyżej opisują starszą aplikację, aktualny
jest rozdział.

---

## Rozdział

### Karta Tranzycja

*Gate: shipped.*

> Czwarta karta, Tranzycja, ma pięć grup: Zdrowie, Ciało, Kroki, Wsparcie
> i Media. Wyszukiwarka u góry znajduje wiersze po nazwie i przeszukuje tekst
> wpisów w dzienniku.
>
> Ten rozdział opisuje dwie pierwsze grupy, Zdrowie i Ciało.

### Leki

*Gate: shipped.*

> W Lekach jest wszystko o tym, co bierzesz. Każdy lek w trwającej kuracji ma
> swój pas. Oś czasu zaznacza ostatnie pobranie krwi. Przy każdej kuracji widać
> dawkę i sposób przyjmowania, ostatnią dawkę, termin następnej, to, ile leku
> zostało, z przewidywanym dniem końca zapasu, oraz ile leku przyjęto przez
> ostatnie 90 dni.
>
> **Kuracja.** Co bierzesz, jak i jak często, od dnia, w którym zaczynasz.
> Zmienisz ją po dotknięciu pasa. Kurację można wstrzymać albo zakończyć,
> a zostaje w historii. Po włączeniu harmonogram zapisuje planowaną dawkę jako
> przyjętą po zakończeniu danego dnia. Możesz to poprawić albo oznaczyć dawkę
> jako pominiętą.
>
> **Dawki.** Każda dawka przyjęta, pominięta albo zmieniona, z godziną, o której
> to było. Możesz je oglądać tak, jak zostały zapisane, albo na tle
> harmonogramu.
>
> **Wyniki badań.** Twoje wyniki w takiej postaci, w jakiej je wpisujesz.
> „Import ze zdjęcia” odczytuje wynik z aparatu albo z galerii. Zdjęcie jest
> odczytywane na twoim urządzeniu, a wynik zachowuje wartość i jednostkę
> z wydruku. Wyniki w różnych jednostkach zostają na osobnych liniach.
>
> **Zapas leków.** Liczba, którą wpisujesz od czasu do czasu. Zapisane później
> dawki służą do oszacowania, ile zostało i kiedy zapas może się skończyć,
> a aplikacja daje znać, gdy się kończy.

### Cykl

*Gate: shipped.*

> W Cyklu zapisujesz krwawienie, plamienie albo to, że w tym miesiącu nic nie
> było. Ten wiersz pojawia się tylko przy trwającej kuracji testosteronem albo
> po włączeniu Śledzenia cyklu w Ustawieniach.

### Operacje

*Gate: shipped.*

> Każda operacja ma własną ścieżkę, nazwaną tak, jak chcesz. Są w niej
> konsultacje przed zabiegiem, data, kiedy już ją znasz, a potem licznik dni,
> zdjęcia, notatki i twoja własna lista.
>
> Rozszerzanie staje się osobnym wierszem, gdy wymaga go któraś operacja. Wpisz
> harmonogram od chirurga i zapisuj przy nim sesje.

### Wizyty

*Gate: shipped.*

> Wizyty zaczynają się od najbliższej wizyty i tego, ile do niej zostało. Pod
> nią jest Co poruszyć, twoja lista spraw, która przechodzi z jednej wizyty na
> następną.
>
> W trakcie wizyty ekran Na wizycie prowadzi przez pytania po kolei i ma miejsce
> na to, co usłyszysz. Minione wizyty są w sekcji Za tobą, a aplikacja pyta, jak
> poszła każda z nich. Wizyta może też czekać bez daty: w Kolejkach są
> skierowania, dzień skierowania, kolejne zmiany z datami i to, jak długo już
> czekasz, bez zgadywania, kiedy przyjdzie termin. W sekcji Do kogo chodzisz
> masz własne notatki o osobach, do których chodzisz, a wizyta może wskazać
> jedną z nich.
>
> Podsumowanie dla osoby lekarskiej to strona do wydrukowania, z wybranego
> okresu. Może zawierać kurację, łączną ekspozycję, wyniki badań, skutki
> uboczne, zauważone zmiany i zabiegi, a ty wybierasz, które sekcje się w niej
> znajdą. Widzisz ją dokładnie tak, jak się wydrukuje. Otworzysz ją z Leków
> albo z Wizyt.

### Zdjęcia postępów

*Gate: shipped.*

> Ciało to druga grupa, a Zdjęcia postępów to jej pierwszy wiersz. Są tu
> zdjęcia robione w tej samej pozie. Wybierz dwa i przeciągnij między nimi
> suwak, żeby porównać wcześniejsze z późniejszym.

### Zauważone zmiany

*Gate: shipped.*

> Wybierz zmianę z listy albo dodaj własną i zaznacz datę, kiedy pojawiła się
> po raz pierwszy. Tu trafiają też skutki uboczne, każdy z siłą od 1 do 5
> i informacją, czy trwa, czy minął. Bardziej prywatne kategorie, na przykład
> zmiany w sferze intymnej i seksualnej, są na początku wyłączone.
>
> „Co mówi literatura” pokazuje, kiedy dana zmiana zwykle się pojawia, według
> SOC8 albo badań, na które się powołuje.
>
> **Zmiany włosów.** Stan włosów opisany twoimi słowami, ze zdjęciami robionymi
> pod tym samym kątem.

### Depilacja

*Gate: shipped.*

> Sesje elektrolizy i lasera: obszar, metoda, czas trwania, ból, jeśli chcesz go
> zapisać, koszt, gabinet i zdjęcia. Ekran pokazuje, ile minęło od ostatniej
> sesji.

### Czas noszenia

*Gate: shipped.*

> Dla bindera, tuckingu i ucisku. Włącz stoper albo wpisz sesję później,
> z notatką o wygodzie lub bólu. Możesz ustawić przypomnienie po wybranej
> liczbie godzin. Przy binderze po ośmiu godzinach pojawia się dyskretny sygnał,
> który można wyłączyć. Ekran pokazuje też godziny noszenia w każdym tygodniu.
>
> Na tym samym ekranie są zasady bezpiecznego noszenia bindera i ich źródła.

### Głos

*Gate: shipped.*

> Głos ma cztery zakładki: Próbka, Ćwicz, Porównaj i Nagrania.
>
> Próbka to nagranie robione za każdym razem tak samo: czytasz ten sam tekst
> i przeciągasz te same trzy samogłoski. Dzięki temu nagrania sprzed miesięcy
> da się porównać. Próbka pokazuje na przykład wysokość głosu i tempo mówienia,
> a Porównaj zestawia dwie próbki obok siebie. Głosu nikt tu nie ocenia.

### Czego Zdrowie i Ciało nie robią

*Gate: shipped.*

> Nic w tych dwóch grupach nie ocenia, czy wynik jest dobry, czy zły, nie
> podpowiada dawki i nie mówi, co masz zrobić. Przechowują to, co wpisujesz,
> i rysują z tego wykresy.
