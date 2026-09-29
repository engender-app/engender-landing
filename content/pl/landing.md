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

> Cała tranzycja w jednym miejscu, na twoim urządzeniu.

Ticket 10, from the same decision as the English headline.

**Subheadline**

> Dziennik, statystyki, HTZ, operacje, próby, ery, ćwiczenia głosu i podsumowanie do
> lekarza. Bez konta, bez serwera, bez opłat. Aplikację tworzy jedna osoba trans dla
> innych osób trans.

„HTZ” is what Polish readers search with, the way English readers search "HRT".
„Ćwiczenia głosu” follows the app's own „ćwiczenia głosu” in the microphone
permission text, and „podsumowanie do lekarza” is the app's title for the
clinician summary.

**Primary action**

„Otwórz dziennik”, on the page today. The Acquisition section below says why the button
is not called Start journal in Polish.

### The promise strip

*Gate: shipped.*

> **Za darmo, na zawsze.** Bez opłat, bez abonamentu, bez reklam. Licencji GPLv3 nie
> da się odwołać, więc nikt nie zacznie za to pobierać pieniędzy, ja też nie.

> **Nie ma czego sprzedać.** Nie ma konta ani serwera. Dziennik jest zapisany na twoim
> urządzeniu, zaszyfrowany, i nigdy go nie widzę. Nie sprzedam czegoś, czego nie mam.

> **Wszystko w jednym miejscu.** Dziennik, statystyki, HTZ, operacje, próby, ery,
> ćwiczenia głosu i podsumowanie do lekarza, które można wydrukować.

> **Od osoby trans dla osób trans.** Tworzy to jedna osoba. Nie stoi za tym żadna
> firma.

„Nigdy go nie widzę” and „nie sprzedam” keep the author in the present and the
future, where Polish does not gender the first person.

### What this is

*Gate: shipped.*

> engender to miejsce na twoją tranzycję: jak się czujesz z dnia na dzień, co
> przyjmujesz, co próbujesz, co cię czeka i co już za tobą. Przede wszystkim to
> dziennik. Wokół niego są zapiski, które zwykle rozchodzą się po notatkach w
> telefonie, arkuszu, folderze ze zdjęciami i piśmie z przychodni.
>
> Nic tu o tobie nie decyduje. Skale nazywasz po swojemu i wybierasz, co śledzić, a
> aplikacja rysuje to, co wpisujesz, bez wystawiania ocen. Nie podpowiada dawek, nie
> barwi liczb na czerwono i nie mówi, w którą stronę masz zmierzać.
>
> To wolne oprogramowanie: bez ceny, bez abonamentu i bez niczego do dokupienia, a
> licencja pilnuje, żeby tak zostało.

„Skale nazywasz po swojemu” instead of „sam nazywasz”, which would gender the
reader.

### Where it stands on privacy

*Gate: shipped. The full page is `privacy.md` and this is only the handoff to it.*

> Dziennik zostaje na twoim urządzeniu. Nie ma konta engender ani serwera, a wpisy nie
> mają kopii nigdzie poza miejscem, w którym je trzymasz. Nie przeczytam twojego
> dziennika, nie sprzedam go ani nikomu nie przekażę, bo nigdy go nie mam.
>
> Na urządzeniu jest zaszyfrowany, a ty wybierasz, czym go otwierasz: hasłem, PIN-em,
> odciskiem palca lub twarzą albo blokadą samego urządzenia. Na Androidzie aplikacja
> nie prosi nawet o dostęp do internetu. W przeglądarce serwer WWW widzi pobieranie
> aplikacji i sprawdzanie aktualizacji, ale nic z tego, co piszesz.
>
> Co to chroni, a czego nie (na przykład odblokowanego telefonu w cudzych rękach),
> jest na osobnej stronie.

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

Same order and same claims as the English grid (ticket 10). Two English sentences
address the reader in the past tense, "a day where all you managed was a mood" and
"the chapter you were in when you wrote it", so the Polish is built around them:
„dzień z samym nastrojem to też dzień z wpisem” and „rozdziału, w którym powstał”.

### What it holds

*Gate: shipped.*

> **Dziennik** Jak minął dzień. Nastrój, notatka, własne skale, tagi, zdjęcia, notatka
> głosowa i miejsce na ciele, w którym była dysforia albo euforia. Wystarczy jedna z
> tych rzeczy. Dzień z samym nastrojem to też dzień z wpisem.

> **Przegląd** Z dnia na dzień trudno zobaczyć, czy coś się zmienia. Po kilku
> miesiącach widać to od razu. Kalendarz każdego miesiąca, wykres dla każdej skali,
> porównanie dni z tagiem i bez niego, bilans dowolnego tygodnia, miesiąca lub roku i
> dobre dni sprzed miesiąca, pół roku i roku.

> **HTZ** Harmonogram leków z następną dawką i tym, ile zostało, dawki zapisywane na
> bieżąco, wyniki badań na wykresie i modelowana krzywa hormonalna. Aplikacja nie
> podpowiada dawek i nie pokazuje norm laboratoryjnych.

> **Operacje** Osobny dziennik dla każdego zabiegu: konsultacje, sam termin,
> rekonwalescencja, rozszerzanie tam, gdzie jest potrzebne, i zdjęcia, które zostają w
> aplikacji, a nie w galerii telefonu.

> **Próby** Wypróbuj imię, zaimki, styl albo ubranie. Nadaj próbie datę początku,
> zapisuj po drodze, jak się z tym czujesz, i zamknij ją, kiedy już wiesz.

> **Ery** Nazwij rozdziały własnej historii, czymkolwiek dla ciebie były. Ery
> pojawiają się jako pasy na osi czasu i przy kamieniach milowych, więc każdy zapis
> widać na tle rozdziału, w którym powstał.

> **Głos** Ćwicz, nagrywaj za każdym razem ten sam tekst i porównuj go z własnymi
> wcześniejszymi nagraniami. Wysokość, rezonans i tempo mówienia opisują nagranie, ale
> nie oceniają głosu.

> **Podsumowanie do lekarza** Dawki, wyniki badań, pomiary i zmiany na jednym wydruku
> na wizytę, za wybrany okres i tylko z wybranymi sekcjami.

### Also in there

*Gate: shipped.*

> Poza tym: wyszukiwanie w notatkach i tagach, licznik sytuacji, w których ktoś zwraca
> się do ciebie zgodnie z twoją płcią albo nie, kamienie milowe z odliczaniem i
> rocznicami, listy otwierane w wybranym dniu, mapa kroków prawnych i medycznych w
> Polsce z miejscem na własne, czas noszenia bindera i tuckingu, sesje depilacji,
> pomiary i rozmiary, przygotowanie do wizyty, Bezpieczna przestrzeń z dobrymi dniami
> i własną listą rzeczy, które pomagają, spis organizacji trans i telefonów zaufania
> dostępny bez internetu, jedna biblioteka zdjęć na wszystko i miejsce na skierowania
> i postanowienia sądu. Rok zapisków w Daylio da się zaimportować.

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

> **Szesnaście palet**: transpłciowa, niebinarna, genderfluid, biseksualna, lesbijska,
> panseksualna, tęczowa, agender, gejowska, genderqueer, interpłciowa, aseksualna,
> demiboy, demigirl, trigender i polska. Każda przemalowuje całą aplikację, razem z
> wykresami i kalendarzem, i każda działa w jasnym i w ciemnym motywie.
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

### Who made this

*Gate: shipped. Ticket 10 retitled the section „Kto to robi”, present tense, so
the heading does not gender the author.*

> Tworzy to jedna osoba trans, czyli ja, Alicja Barankiewicz. Na co dzień zajmuję się
> inżynierią danych w Warszawie, a wywodzę się z animacji, stąd ruch na tej stronie.
> Prowadzę też nazwozbior.pl, wyszukiwarkę wszystkich imion z rejestru PESEL dla osób,
> które szukają imienia dla siebie. Nie ma firmy, więc nie ma działu pomocy i nie ma
> komu tego sprzedać.

### Source

*Gate: shipped. The Journal repository is public now, which was the condition this
block waited on.*

> **Można to przeczytać.** engender jest wolnym oprogramowaniem na licencji GPLv3. Kod jest publiczny.
>
> Licencja pozwala ten kod uruchamiać, zmieniać i przekazywać dalej, i nie da się jej
> cofnąć. Jeśli przestanę, kod może podnieść ktoś inny, a twoje archiwa mają
> udokumentowany format, a nie taki, który otwiera tylko ta jedna aplikacja.

### Support

*Gate: shipped. The paragraph telling the reader not to send their journal was cut
by Alicja on 2026-09-29 (ticket 10), along with the same warning in the Guide and
the Play listing.*

> **Jeśli coś nie działa**, napisz, co się dzieje i czego się spodziewasz. Zwykle to
> wystarczy, żeby znaleźć przyczynę.

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

Cała tranzycja w jednym miejscu: dziennik, statystyki, HTZ, operacje, próby, ery, ćwiczenia głosu i podsumowanie do lekarza. Na twoim urządzeniu, bez konta.
