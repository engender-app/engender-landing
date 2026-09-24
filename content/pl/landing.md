# Landing copy, Polish

Source copy for the Polish site. Written from the claims settled in
`content/en/landing.md`, not from its sentences. Where Polish says a thing differently,
it says it differently.

**Commentary is in English, copy is in Polish.** Everything inside a blockquote is the
copy and it is Polish. Everything outside one is commentary for whoever works on this
next, and it matches the English files so the two can be read side by side. Tickets 07
and 08 can take the blockquotes alone and lose nothing they need.

**Gate markers.** `Gate: shipped` marks approved copy from the product spec.
Staged copy waits for a decision, not implementation evidence.

**The reader is never assigned a gender.** Polish inflects the second person in the past
tense and in adjectives, so an ordinary sentence addressed to the reader picks a gender
for them. Every sentence below stays in the present tense, the imperative, or an
impersonal construction. No slash forms. This is the constraint the English never has to
solve, and it is why several sentences here are built differently rather than closely.

**The author is never assigned a gender either, and this is the harder half.** The site
speaks in the first person singular, and Polish genders the first person in exactly the
same places it genders the second: „napisałem" and „napisałam" are a choice, and so is
every adjective about the speaker. The English "I" carries none of that. So the Polish
first person stays in the present and the future, where it is neutral: „nie poproszę",
„nie ja", „ode mnie", „mi". If a sentence needs the author in the past tense, the
sentence is the problem, the same rule the second person already follows. No slash forms
here either.

This is not the same constraint as the reader's, and solving one does not solve the
other. A sentence can keep the reader ungendered and still out the author in its second
clause.

**Terminology.** The app already ships in Polish, so the site follows it: wpis, nastrój,
tagi, skale, zestaw, kamienie milowe, podsumowanie, wyniki badań, blokada aplikacji,
kamuflaż, szybkie wyjście, tranzycja. Terms the shipped app has no Polish word for were
decided here and recorded in `.agents/product-marketing.md`.

---

## Product overview

### Hero

*Gate: shipped.*

**Headline**

> Śledź tranzycję we własnym dzienniku.

The headline keeps tracking and the journal together. The supporting line names
examples and states device storage without assigning the reader a gender.

**Subheadline**

> Zapisuj odczucia na własnych skalach, porównuj wzorce głosu i prowadź zapiski o zdrowiu.
> Dziennik zostaje na twoim urządzeniu. Bez konta.

**Primary action**

„Otwórz dziennik”, on the page today. The Acquisition section below says why the button
is not called Start journal in Polish.

### What it is

*Gate: shipped.*

> engender pomaga śledzić tranzycję w dzienniku. We wpisie zapiszesz nastrój, notatkę,
> własne skale, tagi, zdjęcia, nagranie głosowe i odczucia związane z ciałem. Wystarczy
> jedna z tych rzeczy. Możesz dodać kilka wpisów dziennie albo uzupełnić wcześniejszy
> dzień.
>
> Ty wybierasz, co chcesz zapisywać. Nazwij skale po swojemu, porównuj wzorce głosu z
> wcześniejszymi nagraniami albo notuj leki i wizyty obok codziennych wpisów. Mapa
> tranzycji opisuje kroki w Polsce i pozwala dodać własne cele. Aplikacja nie ocenia głosu
> ani nie doradza leczenia.
>
> Aplikację tworzy jedna osoba trans dla innych osób trans. To wolne oprogramowanie.
> Korzystanie z niego jest i pozostanie bezpłatne.

### Where it stands on privacy

*Gate: shipped. The full page is ticket 04 and this is only the handoff to it.*

> Dziennik jest zaszyfrowany na twoim urządzeniu. Nie ma konta engender ani serwera z
> twoimi wpisami. Serwer WWW widzi pobieranie i aktualizacje aplikacji, ale nie dostaje
> dziennika.
>
> Co to chroni, a czego nie, jest na osobnej stronie.

---

## Visual tour

### The line that covers the whole tour

*Gate: shipped. Required by the spec: public screenshots use synthetic Journal data.*

> Wszystkie zrzuty ekranu zrobiono na zmyślonych danych. Nie ma tu niczyjego dziennika.

Place it where a person meets the first screenshot. The captions on the five screens
that show written entries repeat it in short form, exactly as in English.

### Captions

*Gate: shipped, all eight.*

**Ekran główny**

> Powitanie, co przed tobą, i ostatnie siedem dni w kolorze, który wybierasz. Pasek
> nastrojów robi wpis jednym ruchem, więc w dzień, kiedy nie masz siły pisać, nadal da
> się coś zapisać. Wpisy zmyślone.

**Wpis**

> Nastrój, twoje skale, tagi, notatka, zdjęcia. Wpisowi wystarczy jedno z tego, więc
> dzień, w którym starczyło tylko na nastrój, i tak się liczy. Wpis zmyślony.

**Miesiąc**

> Kolor bierze się z nastroju albo z dowolnej skali, którą wybierzesz. Dni bez wpisu
> zostają neutralne, bo luka to nie jest zły dzień i kolor nigdy tego nie sugeruje.

**Jeden dzień, dwa wpisy**

> Poczucie płci potrafi się zmieniać w ciągu dnia, więc dzień mieści tyle wpisów, ile
> trzeba, i każdy dostaje swoją godzinę. Kolor całego dnia to ich średnia. Wpisy
> zmyślone.

**Wyszukiwanie**

> Szuka w notatkach i tagach w trakcie pisania. Polskie znaki nie mają znaczenia w żadną
> stronę: wpisz „lozko”, a znajdzie łóżko. Wpisy zmyślone.

**Pół roku jednej skali**

> Każda skala ma swój wykres i swoją średnią z okresu, który wybierzesz. Dni z kilkoma
> wpisami liczą się jako średnia, a po otwarciu wykresu widać, które to dni.

**Kamienie milowe**

> Ważne daty, po kolei. Te przed tobą odliczają dni. Te za tobą wracają co roku.

**Eksport**

> Eksport pakuje całość do jednego archiwum i szyfruje je hasłem, które wybierasz, zanim
> plik gdziekolwiek trafi. Dziennik zmyślony.

---

## Feature summary

The groups follow the Journal SCREENS.md inventory reviewed on 2026-09-25.
Voice benchmarks follow CONTEXT.md; privacy controls follow the current access
model. Polish and English describe the same capabilities.

### Zapisywanie

*Gate: shipped.*

> **Wpisy.** Nastrój w pięciu stopniach, notatka, tagi, zdjęcia, nagranie głosowe i twoje
> skale. Kilka dziennie albo z datą wsteczną.
>
> **Skale.** Pięć jest wbudowanych, wśród nich Poczucie płci, od dysforii na jednym końcu
> do euforii na drugim. Własną skalę ustawiasz od zera: dwie etykiety końców i zakres,
> jaki chcesz. Te, których używasz, łączysz w zestaw, żeby ekran wpisu pytał tylko o to,
> co faktycznie mierzysz.
>
> **Odczucia związane z ciałem.** Dysforię i euforię zapisujesz przy obszarach ciała,
> których dotyczą. Osobno, bo w jednym dniu mogą pojawić się obie.
>
> **Tagi.** Pogrupowane, do zmiany w każdej chwili. Całą grupę można wyłączyć, kiedy
> przestaje być na temat. Ukryty tag wbudowany znika ze wszystkich list wyboru, a wpisy,
> które już go mają, zostają nietknięte.
>
> **Zdjęcia.** Trzymane w pamięci samej aplikacji. Nie trafiają do galerii telefonu, więc
> nie wyskoczą komuś, kto akurat przewija zdjęcia.

### Przeglądanie

*Gate: shipped.*

> **Miesiąc.** Kalendarz w jednym kolorze o różnej sile, sterowany nastrojem albo wybraną
> skalą.
>
> **Wyszukiwanie.** Notatki i nazwy tagów, dopasowywane w trakcie pisania, bez oglądania
> się na polskie znaki. Wpisy i zdjęcia oznaczone gwiazdką znajdziesz w jednym miejscu.
>
> **Wykresy.** Jeden na skalę, w zakresie od 7 do 365 dni, z twoją serią dni z wpisem. Po
> otwarciu wykresu widać listę wartości z datami, więc linię da się sprawdzić, a nie tylko
> przyjąć na wiarę.
>
> **Tagi w liczbach.** Dla wybranej skali widać, jak wypadają dni z danym tagiem wobec dni
> bez niego. To obserwacja, nie wyrok. Tagi z mniej niż trzema wpisami w zakresie wypadają
> z zestawienia, bo przy takiej liczbie różnica jest szumem.
>
> **Podsumowanie.** Tydzień, miesiąc, rok albo wybrany okres: wpisy, serie dni, zmiany na
> skalach, częste tagi, kamienie milowe i zdjęcia.
>
> **Tego dnia.** Wpisy sprzed miesiąca, pół roku i roku. Wracają tylko dobre dni.
>
> **Wtedy i teraz.** Dwa wybrane okresy obok siebie.
>
> **Licznik.** Zapisujesz jednym dotknięciem, kiedy ktoś zwraca się do ciebie zgodnie z
> twoją płcią, a kiedy nie. Wykres pokazuje, jak zmieniają się te liczby.
>
> **Kamienie milowe i oś czasu.** Odliczanie do tego, co przed tobą, rocznice tego, co za
> tobą.

### Wokół dziennika

*Gate: shipped.*

> Na karcie Tranzycja znajdziesz cztery grupy narzędzi: Zdrowie, Kroki, Wsparcie i Media.
>
> **Zdrowie.** Pomiary ciała i rozmiary ubrań, plan leków i dawki, wyniki badań oraz
> modelowane krzywe hormonalne. Zapisuj zauważone zmiany, zdarzenia cyklu i przebieg
> rekonwalescencji po operacji. Przygotuj pytania na wizytę i wydrukuj podsumowanie dla
> lekarza, jeśli chcesz. Aplikacja nie interpretuje wyników ani nie podpowiada dawek.
>
> **Kroki.** Kamienie milowe, próby, czas noszenia bindera i tuckingu, depilacja oraz
> listy otwierane w wybranym dniu. Mapa tranzycji obejmuje Polskę i cztery ścieżki:
> społeczną, prawną, wizerunkową i medyczną. Możesz dopisać własne cele albo oznaczyć krok
> jako „nie moja droga”.
>
> **Wzorce głosu.** Na ekranie Głos w Krokach nagrywasz za każdym razem ten sam tekst i
> tę samą przeciągniętą samogłoskę. Porównujesz je z własnymi wcześniejszymi nagraniami.
> Wysokość głosu, rezonans czy tempo mówienia opisują nagrania, ale nie oceniają głosu.
> Wzorzec zapisujesz dla wybranego dnia. Nagranie głosowe we wpisie to osobna notatka.
>
> **Wsparcie.** Bezpieczna przestrzeń przypomina wpisy z gwiazdką i dobrymi tagami. Jest
> tu też twoja lista rzeczy, które pomagają. Spis organizacji trans i telefonów zaufania
> jest wbudowany w aplikację, więc przeczytasz go bez internetu.
>
> **Media.** Przeglądaj zdjęcia z całego dziennika i porównuj dwa suwakiem. Przygotuj
> kolaż albo film poklatkowy do eksportu. Przechowuj dokumenty, na przykład skierowania i
> postanowienia sądu, powiązane z celem lub zapisem, którego dotyczą.

### Archiwa i eksport

*Gate: shipped.*

> **Archiwa.** Eksport pakuje dziennik do jednego pliku i szyfruje go hasłem, które
> wybierasz, zanim plik opuści aplikację. Import wkłada go z powrotem, dokładając do tego,
> co już jest, albo zastępując całość.
>
> **Kopia według harmonogramu.** Na Androidzie zaszyfrowane archiwum trafia do wybranego
> folderu co tydzień albo co miesiąc.
>
> **Przejście z Daylio.** Import bierze plik CSV z Daylio. Zanim cokolwiek zapisze,
> pokazuje liczby i to, jak przełoży nastroje, a zawsze tylko dokłada do tego, co już
> masz.
>
> **Eksport zwykły.** CSV albo JSON, do arkusza albo na własną kopię. Taki plik nie jest
> zaszyfrowany, aplikacja mówi to wprost i każe potwierdzić, zanim go zapisze.
>
> **Kiedy minęło trochę czasu.** Jeśli ostatnie archiwum ma więcej niż 30 dni, ekran
> główny mówi o tym raz. Można to zamknąć.

### Na telefonie

*Gate: shipped.*

> **Na Androidzie.** Te same funkcje dziennika w aplikacji na telefon. Dane nie
> synchronizują się z dziennikiem w przeglądarce.
>
> **Przypomnienia.** Leki, zastrzyki i wizyty. Jednorazowe lub powtarzalne powiadomienia
> na telefonie.
>
> **Codzienne pytanie.** Raz dziennie, o wybranej porze. Nie pojawia się w dni, w które
> jest już wpis.
>
> **Instalacja.** Dodaj aplikację do ekranu głównego i otwieraj ją stamtąd.
>
> **Działa bez sieci.** Po instalacji otworzysz dziennik także bez internetu.

### Jeśli musisz uważać

*Gate: shipped.*

> W sekcji Prywatność i dane wybierasz, jak otwierać dziennik. Kamuflaż, blokada przy
> wyjściu i szybkie wyjście pozostają wyłączone, dopóki ich nie włączysz.
>
> **Dostęp.** Wybierz hasło, PIN z kluczem urządzenia, obsługiwaną biometrię albo klucz
> powiązany z urządzeniem. Strona o prywatności opisuje ochronę i odzyskiwanie dostępu.
>
> **Kamuflaż.** Karta przeglądarki pokazuje „Notes” zamiast engender. Na Androidzie
> zmienia się też nazwa i ikona aplikacji na neutralne.
>
> **Blokada przy wyjściu.** Dziennik blokuje się, gdy przechodzisz do innej aplikacji.
> Jeśli wybrany tryb wymaga odblokowania, trzeba je powtórzyć po powrocie.
>
> **Szybkie wyjście.** Przesunięcie dwoma palcami w dół zasłania dziennik. Przy włączonym
> kamuflażu pojawia się ekran Notes, w przeciwnym razie pusta karta. Jeśli wybrany tryb
> wymaga odblokowania, trzeba je powtórzyć po powrocie.

### Wygląd

*Gate: shipped.*

> **Osiem palet**: transpłciowa, niebinarna, genderfluid, biseksualna, lesbijska,
> panseksualna, agender i tęczowa. Każda przemalowuje całą aplikację, razem z wykresami i
> kalendarzem, i każda działa w jasnym i w ciemnym motywie.
>
> **Kolor niczego nie ocenia.** Nie ma czerwonego na zły dzień ani zielonego na dobry.
> Kalendarz używa jednego koloru o różnej sile, a pusty dzień zostaje pusty.
>
> **Dwa języki.** Polski i angielski, do przełączenia w ustawieniach, a daty idą za
> wybranym językiem.

---

## Acquisition

*Gate: shipped for the primary action. Everything Android is gated on Journal tickets 18
and 11, exactly as in the English file.*

**The copy for this section is not in this file.** It is in `messages/pl.json`, under the
same keys as the English, and it is on the page today. The English file explains why: a
string that already ships gets one home, not two.

**The button is called „Otwórz dziennik”.** The spec fixes the English wording and fixes
nothing in Polish, and this is where that was open. „Zacznij dziennik” says start a new
one, which is wrong for anyone coming back to theirs, and „Start” as a Polish verb is not
Polish. What the link does is open the journal in the browser, so that is what it says.
The imperative also keeps the reader ungendered, which rules out most of the alternatives
before the meaning does. Lowercase „dziennik”, following the register the English file
settled: the product is engender and the thing it holds is your journal.

**Vocabulary in the channel notes.** „Wydanie” for a GitHub Release, and that is now the
only one. „Pakiet” for the Android package and „wersja deweloperska” for a debug build
both left with the sentences that needed them, when the notes were cut to one line each.
None of the three was product vocabulary, so none of them went into the table in
`.agents/product-marketing.md`. The one entry that did is the button.

**„Jeszcze niedostępne” is the status,** in the neuter, as a label rather than as
agreement with a channel name. Aurora is feminine, Google Play and Obtainium behave as
masculine, F-Droid likewise, and a status that has to agree with four different names is
a status that eventually gets one of them wrong.

**The Google Play note is a mark against Play, and is meant to be.** „Aplikację dla osób
trans” is blunter than the English original's „aplikacja”, and it is the accurate reading
of what a Play install records: not that some app arrived, but which one. Polish carries
this without a euphemism, so it does not get one.

Play is listed last in both languages, and both say so. „Nie bez powodu” is the whole
argument compressed, with the reason one line below on the Play entry itself, which is
where a reader is looking when it matters.

### Staged: the F-Droid signing warning

*Gate: Journal ticket 18, same as the English block, published in both languages at once
or in neither.*

> Wersję z F-Droida podpisuje F-Droid, a Android nie zainstaluje jej na miejscu wersji
> podpisanej przez kogoś innego. Przejście w którąkolwiek stronę wygląda tak: najpierw
> zrób archiwum, potem odinstaluj aplikację, potem zainstaluj drugą wersję i wczytaj
> archiwum z powrotem.

---

## Source, licence and support

### Source

*Gate: shipped as far as the licence goes. The "you can read it" phrasing additionally
needs the Journal repository to actually be public, which is a deliberate step it has not
taken yet.*

> **Można to przeczytać.** engender jest wolnym oprogramowaniem na licencji GPLv3.
> Nie musisz mi wierzyć na słowo: kod jest publiczny. Zajrzyj albo poproś o to kogoś,
> komu ufasz.
>
> Licencja znaczy też, że wolno ten kod uruchamiać, zmieniać i przekazywać dalej. To
> projekt jednej osoby, więc może kiedyś stanąć. Wtedy ten kod może podnieść ktoś inny, a
> twoje archiwa mają udokumentowany format, a nie taki, który otwiera tylko ta jedna
> aplikacja.

### Support

*Gate: shipped. The prohibition on asking for sensitive material is required by the spec
and is not optional wording.*

> **Jeśli coś nie działa**, napisz, co się dzieje i czego się spodziewasz. Zwykle to
> wystarczy, żeby znaleźć przyczynę.
>
> **Nie przysyłaj mi swojego dziennika.** Ani archiwum, ani zrzutu ekranu z wpisami, ani
> logu z sesji, w której coś piszesz. Nigdy o nic z tego nie poproszę. Jeśli ktoś prosi,
> to nie ja.

The English asks for what happened and what the reader expected instead. Both are
past-tense addresses to the reader in English, which in Polish would pick a gender, so
the Polish asks for the same two things in the present tense.

### Privacy policy and security contact

*Gate: Journal ticket 21, which writes the policy and fixes the security contact. This
site presents them and may not run ahead of them. No copy here yet.*

The placeholder is outside a blockquote here, which is the only place it may sit, since
tickets 07 and 08 take the blockquotes as copy. The English file used to keep its
placeholder inside one; that is fixed.

---

## Notes for later tickets

Ticket 07 owns titles, descriptions and structured data. The Polish page needs its own,
written as Polish, not as a translated title tag. The only claims available to mark up
are the ones marked shipped here.

Ticket 09 is where Polish length stops being a copy question and becomes a layout one.
Polish runs longer than English almost everywhere in this file, and the feature labels
run longest.

Numbers and dates in Polish copy: a space as the thousands separator, a comma for
decimals, `24.02.2026` or `24 lutego 2026` for dates, `14:30` for times, months and
languages in lower case. Nothing in this file needs a formatted date yet, but ticket 09
and the Play listing will.

## Search and share

The description is shared by search, Open Graph and Twitter metadata.

Śledź tranzycję we własnym dzienniku: skale, wzorce głosu i zapiski o zdrowiu. Dane są
zaszyfrowane na twoim urządzeniu. Bez konta.
