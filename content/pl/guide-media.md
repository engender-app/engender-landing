# Guide copy, Polish: Media

Polska wersja rozdziału Media, jednej z czterech grup na karcie Tranzycja,
napisana w guide ticket 04 obok angielskiej. Napisana po polsku, nie tłumaczona
zdanie po zdaniu, i przepuszczona przez `humanizer-pl`.

**Co jest tekstem, a co nie.** Ta sama zasada co w `landing.md` i `privacy.md`:
tekstem jest wszystko w cytacie blokowym, reszta to komentarz, a kursywny znacznik
nad cytatem mówi, czy wolno go opublikować (docs/adr/0001).

**Słownictwo z aplikacji.** Nazwy ekranów, grup i etykiet pochodzą z polskiego
katalogu Journal, a formy zwracania się do czytelnika nie określają płci.

**Źródła i decyzje** są te same co w `content/en/guide-media.md`.

**Sprawdzone 2026-11-11.** Rozdział poniżej sprawdzono z gałęzią
`functional-audit` aplikacji, czyli kandydatem na 1.0.0: z katalogami, ekranami
i `CHANGELOG.md`. Tam, gdzie notatki powyżej opisują starszą aplikację, aktualny
jest rozdział.

---

## Rozdział

### Zdjęcia

*Gate: shipped.*

> Media to piąta grupa. W Zdjęciach są wszystkie zdjęcia z dziennika na jednej liście według dat. Przyciski u góry zawężają ją do jednego źródła, na przykład zmian włosów albo operacji, a Ulubione pokazują zdjęcia z gwiazdką. Zaznacz zdjęcia, żeby je usunąć, albo otwórz zapis, do którego zdjęcie należy.
>
> „Zrób kolaż albo film poklatkowy” składa go ze zdjęć z wybranego okresu i pokazuje podgląd. Zapisany plik nie jest zaszyfrowany. Zdjęcia nigdy nie trafiają do galerii telefonu.

### Dokumenty

*Gate: shipped.*

> Papiery, które przechowujesz, na przykład opinie, skierowania i postanowienia sądu: pliki PDF albo obrazy, każdy z datą i tytułem. Dokument można powiązać z krokiem z mapy tranzycji, kamieniem milowym, operacją albo kuracją, a lista jest pogrupowana według tych powiązań. Aplikacja nie czyta dokumentów, więc szukasz ich po tytule.
