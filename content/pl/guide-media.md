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

> Media to piąta grupa na karcie Tranzycja.
>
> W Zdjęciach są wszystkie zdjęcia z dziennika na jednej liście według dat:
> z wpisów, kamieni milowych, zmian włosów, depilacji, prób, operacji, zdjęć
> postępów i notatek wideo. Gdy zdjęcia pochodzą z więcej niż jednego miejsca,
> przyciski u góry zawężają listę do jednego źródła, a Ulubione pokazują
> zdjęcia oznaczone gwiazdką.
>
> Zaznacz zdjęcia, żeby je usunąć. Usunięte zdjęcie znika ze wszystkich miejsc,
> w których jest, a przez 10 sekund możesz to cofnąć. „Otwórz zapis” prowadzi
> do wpisu lub zapisu, do którego zdjęcie należy.
>
> „Zrób kolaż albo film poklatkowy” na dole listy składa go ze zdjęć
> z wybranego okresu. Dotknij zdjęcia, żeby je pominąć, a zanim zapiszesz albo
> udostępnisz wynik, zobaczysz podgląd. Zapisany plik nie jest zaszyfrowany.
> Żeby porównać dwa zdjęcia, zajrzyj do Zdjęć postępów w grupie Ciało.
>
> Zdjęcia zostają w aplikacji i nigdy nie trafiają do galerii telefonu.

### Dokumenty

*Gate: shipped.*

> Papiery, które przechowujesz: opinie, diagnozy, skierowania, postanowienia
> sądu, faktury. Każdy ma datę, tytuł, który wpisujesz, i sam plik: PDF albo
> obraz, do 25 MB. Dokument można powiązać z krokiem z mapy tranzycji,
> kamieniem milowym, operacją albo kuracją.
>
> Lista grupuje dokumenty według tego, z czym są powiązane, a te bez
> powiązania są na końcu. Przy zdjęciach i plikach PDF są miniatury.
> „Udostępnij albo zapisz” tworzy kopię, która nie jest zaszyfrowana.
> Aplikacja nigdy nie czyta treści dokumentów, więc szukasz ich po tytule.
