# Guide copy, Polish: Dzisiaj

Polska wersja rozdziału o pierwszej karcie aplikacji, napisana w guide ticket 03
obok angielskiej, tak jak w tickecie 02. Napisana po polsku, nie tłumaczona
zdanie po zdaniu, i przepuszczona przez `humanizer-pl`.

**Co jest tekstem, a co nie.** Ta sama zasada co w `landing.md` i `privacy.md`:
tekstem jest wszystko w cytacie blokowym, reszta to komentarz, a kursywny znacznik
nad cytatem mówi, czy wolno go opublikować (docs/adr/0001).

**Słownictwo z aplikacji.** Nazwy z polskiego katalogu Journal: karta
„Dzisiaj”, „Jak dziś?”, „Nadchodzi”, „Przypięte”, „Ułóż tę listę”, „Kafelki”,
„Na początek”, „Szybki zapis”, nastroje od „okropnie” do „świetnie”.

**Źródła i decyzje** są te same co w `content/en/guide-home.md`: rozdział
opisuje kartę Dzisiaj według `SCREENS.md`, nie dawny ekran główny z ticketu.

**Sprawdzone 2026-11-11.** Rozdział poniżej sprawdzono z gałęzią
`functional-audit` aplikacji, czyli kandydatem na 1.0.0: z katalogami, ekranami
i `CHANGELOG.md`. Tam, gdzie notatki powyżej opisują starszą aplikację, aktualny
jest rozdział.

---

## Rozdział

### Co widać na karcie Dzisiaj

*Gate: shipped.*

> Dzisiaj to pierwsza karta i od niej zaczyna się aplikacja. Koło zębate na górze otwiera Ustawienia.
>
> **Kafelki.** To, co dzieje się w tej chwili, na przykład sesja noszenia albo dawka do przyjęcia.
>
> **Nadchodzące.** Rzeczy z datą w ciągu najbliższych trzydziestu dni: wizyty, operacje, kamienie milowe, listy do otwarcia i dawki przyjmowane rzadziej niż codziennie. Widać trzy, reszta jest zwinięta.
>
> **Jak się czujesz?** Pięć nastrojów. Wybranie jednego otwiera nowy wpis z tym nastrojem.
>
> **Komunikaty.** Przypomnienia, które można zamknąć, na przykład że kopia jest stara albo że kończy się lek.
>
> **Przypięte.** Części aplikacji, które chcesz mieć na tej karcie. Każda pokazuje, co jest następne albo kiedy ostatnio coś tu zapisano.
>
> Nowy dziennik ma też sekcję „Na początek”. Możesz ją pominąć i po prostu pisać.

### Układanie karty

*Gate: shipped.*

> Pod „Ułóż tę listę” wybierasz, co jest przypięte, w jakiej kolejności i które kafelki mogą się pojawiać. Nowy dziennik ma na start kilka przypiętych wierszy. Potem aplikacja sama niczego nie przypina ani nie przestawia.

### Szybki zapis

*Gate: shipped.*

> Przycisk na środku dolnego paska to szybki zapis. Działa na każdym ekranie: pięć nastrojów, wpis z wcześniejszego dnia, oba liczniki, dawka, gdy trwa kuracja, oraz start albo koniec noszenia.
