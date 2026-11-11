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

> Czwarta karta ma pięć grup: Zdrowie, Ciało, Kroki, Wsparcie i Media. Wyszukiwarka u góry znajduje wiersze po nazwie. Ten rozdział opisuje Zdrowie i Ciało. Nic w nich nie ocenia, czy wynik jest dobry, czy zły, i nie podpowiada dawki.

### Leki

*Gate: shipped.*

> Każdy lek w trwającej kuracji ma swój pas z dawką, ostatnią i następną dawką, pozostałym zapasem i przewidywanym dniem jego końca oraz sumą z ostatnich 90 dni. Oś czasu zaznacza ostatnie pobranie krwi.
>
> **Kuracja.** Co bierzesz, jak i jak często. Można ją wstrzymać albo zakończyć, a zostaje w historii. Harmonogram może zapisywać planowane dawki jako przyjęte. Każdą możesz poprawić albo oznaczyć jako pominiętą.
>
> **Dawki.** Każda dawka przyjęta, pominięta albo zmieniona.
>
> **Wyniki badań.** Wpisane ręcznie albo odczytane na twoim urządzeniu ze zdjęcia wydruku, w jednostkach z wydruku.
>
> **Zapas leków.** Liczba, którą wpisujesz od czasu do czasu. Zapisane dawki aktualizują szacunek.

### Cykl

*Gate: shipped.*

> Krwawienie, plamienie albo nic w tym miesiącu. Wiersz pojawia się przy trwającej kuracji testosteronem albo po włączeniu Śledzenia cyklu w Ustawieniach.

### Operacje

*Gate: shipped.*

> Każda operacja ma swoje konsultacje, datę, a potem licznik dni, zdjęcia, notatki i listę. Rozszerzanie staje się osobnym wierszem, gdy wymaga go któraś operacja, z harmonogramem od chirurga i twoimi sesjami.

### Wizyty

*Gate: shipped.*

> Wizyty zaczynają się od najbliższej wizyty. Co poruszyć to twoja lista spraw, a ekran Na wizycie prowadzi przez nią w gabinecie i ma miejsce na odpowiedzi. Minione wizyty są w sekcji Za tobą. W Kolejkach są skierowania bez terminu i to, jak długo już czekasz. Do kogo chodzisz to twoje notatki o osobach, do których chodzisz.
>
> Podsumowanie dla osoby lekarskiej to strona do wydrukowania. Wybierasz okres i sekcje.

### Ciało

*Gate: shipped.*

> **Zdjęcia postępów.** Zdjęcia w tej samej pozie. Wybierz dwa i przeciągnij suwak, żeby je porównać.
>
> **Zauważone zmiany.** Wybierz zmianę albo dodaj własną, z dniem, kiedy pojawiła się po raz pierwszy. Tu trafiają też skutki uboczne, z siłą od 1 do 5. Bardziej prywatne kategorie są na początku wyłączone. Tu są też Zmiany włosów.
>
> **Depilacja.** Sesje elektrolizy i lasera: obszar, metoda, czas, ból, koszt, gabinet i zdjęcia.
>
> **Czas noszenia.** Binder, tucking i ucisk, ze stoperem albo wpisane później. Przy binderze po ośmiu godzinach pojawia się sygnał. Na tym samym ekranie są zasady bezpiecznego noszenia bindera.
>
> **Głos.** Próbka to za każdym razem ten sam tekst i te same trzy samogłoski, więc nagrania sprzed miesięcy da się porównać. Pokazuje na przykład wysokość głosu i niczego nie ocenia.
