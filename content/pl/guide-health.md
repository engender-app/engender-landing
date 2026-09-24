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

---

## Rozdział

### Karta Tranzycja

*Gate: shipped.*

> Czwarta karta, Tranzycja, ma cztery grupy: Zdrowie, Kroki, Wsparcie i Media.
> Wyszukiwarka u góry znajduje wiersze po nazwie i przeszukuje tekst wpisów w
> dzienniku.
>
> Zdrowie to pierwsza grupa.

### Opieka

*Gate: shipped.*

> W Opiece są twoje leki. Każdy lek w trwającej kuracji ma swój pas. Oś czasu
> zaznacza ostatnie pobranie krwi. Przy każdej kuracji widać dawkę i sposób
> przyjmowania, ostatnią dawkę, termin następnej i to, ile leku zostało, razem
> z przewidywanym dniem końca zapasu.
>
> Z Opieki otwierają się cztery ekrany:
>
> **Kuracja.** Co bierzesz, jak i jak często, od dnia, w którym zaczynasz.
> Kurację można wstrzymać albo zakończyć, a zostaje w historii. Po włączeniu
> harmonogram zapisuje planowaną dawkę jako przyjętą po zakończeniu danego dnia.
> Możesz to poprawić albo oznaczyć dawkę jako pominiętą.
>
> **Dawki.** Każda dawka przyjęta, pominięta albo zmieniona, z godziną, o której
> to było.
>
> **Badania.** Twoje wyniki w takiej postaci, w jakiej je wpisujesz. Wyniki w
> różnych jednostkach zostają na osobnych liniach.
>
> **Krzywa hormonalna.** Rysunek tego, jak dawki rosną i opadają w czasie. To
> nie jest przewidywanie twoich poziomów. Można ją dopasować do własnych wyników
> badań.
>
> Zapas to liczba, którą wpisujesz od czasu do czasu. Zapisane później dawki
> służą do oszacowania pozostałego zapasu i dnia, w którym może się skończyć, a
> także do rysowania krzywych dla obsługiwanych leków. Opieka daje znać, gdy
> zapas się kończy. Pokazuje też liczbę dni na leku w wybranym okresie; pełna
> historia ekspozycji jest w Podsumowaniu do lekarza.

### Zauważone zmiany

*Gate: shipped.*

> Pod lekami w Opiece są Zauważone zmiany. Wybierz zmianę z listy albo dodaj
> własną i zaznacz datę, kiedy pojawiła się po raz pierwszy. Tu trafiają też
> skutki uboczne, każdy z siłą od 1 do 5. Bardziej prywatne kategorie, na
> przykład zmiany w sferze intymnej i seksualnej, są na początku wyłączone.
>
> **Postępy włosów.** Stan włosów według opublikowanej skali, Norwooda-Hamiltona
> albo Sinclaira, lub twoimi słowami, ze zdjęciami robionymi z tego samego
> miejsca.
>
> **Cykl.** Miesiączka, plamienie albo nic w tym miesiącu. Ta część pojawia się
> tylko przy trwającej kuracji testosteronem albo po włączeniu Śledzenia cyklu w
> Ustawieniach.

### Pomiary i rozmiary

*Gate: shipped.*

> Talia, biodra, klatka piersiowa i obwód pod biustem są wbudowane, a dodać
> można dowolny inny pomiar. Wagi i wzrostu nie ma na liście, więc jeśli ich
> potrzebujesz, dodaj je jako własne. Obok wykresu jest Jak mierzyć
> konsekwentnie, czyli jak mierzyć za każdym razem tak samo.
>
> W rozmiarach zapisujesz, co kupujesz i jak leży: rodzaj ubrania, rozmiar,
> marka i notatka. Nic nie jest przeliczane między markami.

### Operacje

*Gate: shipped.*

> Każda operacja ma własną ścieżkę, nazwaną tak, jak chcesz. Są w niej
> konsultacje przed zabiegiem, data, kiedy już ją znasz, a potem licznik dni,
> zdjęcia, notatki i twoja własna lista.
>
> Jeśli masz od chirurga harmonogram rozszerzania, wpisz go i zapisuj przy nim
> sesje.

### Wizyty

*Gate: shipped.*

> Wizyty zaczynają się od najbliższej wizyty i tego, ile do niej zostało. Pod
> nią jest Co poruszyć, twoja lista spraw, która przechodzi z jednej wizyty na
> następną.
>
> W trakcie wizyty ekran Na wizycie prowadzi przez pytania po kolei i ma miejsce
> na to, co usłyszysz. Minione wizyty są w sekcji Za tobą, a aplikacja pyta, jak
> poszła każda z nich.
>
> Podsumowanie do lekarza to strona do wydrukowania: dawki, wyniki badań i
> skutki uboczne z wybranego okresu. Widzisz ją dokładnie tak, jak się
> wydrukuje. Otworzysz ją z Opieki albo z Wizyt.

### Czego Zdrowie nie robi

*Gate: shipped.*

> Nic w Zdrowiu nie ocenia, czy wynik jest dobry, czy zły, nie podpowiada dawki
> i nie mówi, co masz zrobić. Przechowuje to, co wpisujesz, i rysuje z tego
> wykresy.
