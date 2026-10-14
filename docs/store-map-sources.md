# Butikskarta

Kontrollerad 2026-10-07. Koordinater i `src/stores.js` anges som `[latitud, longitud]`.
Markörerna representerar adresser eller anläggningar, inte inmätta försäljningsstånd på parkeringar.

| Butik | Underlag | Precision |
| --- | --- | --- |
| Handlar'n, Örebro | [Adresskoordinat Järnvägsgatan 13 B](https://www.ratsit.se/19630916-Hans_Mikael_Gustavsson_Orebro/qXdisKxY7XMpNuEPUOJBru_jRy6OYS_aVcx71ThH62I), [butikens adress hos Handlar'n](https://www.handlarn.se/butiker-och-oppettider/) | Adressens byggnad |
| Katrineholm | [Adresskoordinat Uppsalavägen 1](https://www.hitta.se/s%C3%B6dermanlands%2Bl%C3%A4n/katrineholm/uppsalav%C3%A4gen%2B1/omr%C3%A5de/59.005063160980534%3A16.231985424534827) | Adress |
| Kristinehamn | [OSM nod 858262889](https://www.openstreetmap.org/node/858262889) | Albinvägen 2 |
| Tornby | [OSM byggnad 1189736555](https://www.openstreetmap.org/way/1189736555) | Norra Svedengatan 34 |
| NetOnNet, Örebro | [OSM nod 3684728238](https://www.openstreetmap.org/node/3684728238) | Åbyvägen 1; adressträff, inte verifiering av butikens verksamhet |
| Kumla | [Adresskoordinat Västra Drottninggatan 46](https://www.ratsit.se/5590951314-AK_Salespartner_AB) | Adress |
| Ingelsta | [OSM nod 2590807203](https://www.openstreetmap.org/node/2590807203) | Koppargatan 30 |
| Motonet Parkering | [OSM byggnad 1285869434](https://www.openstreetmap.org/way/1285869434), [Motonets adress](https://www.motonet.se/varuhus) | Byggnad. Gatunamnet korrigerat från Säljarvägen till Säljarevägen. |
| Lillåns Gatukök | [Fastighet ÖREBRO STENCILEN 5](https://tic.io/sv/fastighet/909a6a73-9125-90ec-e040-ed8f66444c3f) | Klockarängsvägen 1, avrundad fastighetskoordinat |
| Sörbybacken | [OSM område 151419793](https://www.openstreetmap.org/way/151419793) | **Ungefärligt anläggningsläge**, exakt försäljningsplats behöver bekräftas. |
| Karlstad | [OSM adressnod 11083603141](https://www.openstreetmap.org/node/11083603141) | Ullebergsleden 10 |
| Erikslund | [OSM byggnad 1467891622](https://www.openstreetmap.org/way/1467891622) | **Ungefärlig position vid 13A.** Befintlig adress 13 behålls. |

`coordinatesApproximate: true` visar en notering i markörens popup för de två osäkra positionerna. Vägbeskrivning använder alltid den fullständiga adressen.

## Karttjänst

Leaflet 1.9.4 med grupperade markörer. Kartbilder från OpenStreetMap; synlig attribution finns i kartan. Följ [tile-policyn](https://operations.osmfoundation.org/policies/tiles/). Ingen förhämtning, offlinehämtning eller cachespärr har lagts till. Byt tile-URL i `StoreMap.jsx` om en annan kartleverantör behövs.

Sökning och ortfilter arbetar enbart med butikernas lokala data. Besökarnas sökord skickas inte till någon geokodningstjänst. Kartbilder laddas från OSM när butikssidan öppnas.

Adresskontrollen använde enstaka sekventiella uppslag med minst 1,1 sekunders mellanrum och lokal cache enligt [Nominatims användningspolicy](https://operations.osmfoundation.org/policies/nominatim/). Engångsskripten i `scripts/` ingår inte i webbappen. Råresultaten finns lokalt i `.verification/`.

## Kontroll

`npm test` kontrollerar markörer/gruppering, sökning, ortfilter, tomt resultat, butikslänkar, tangentbordsöppning, mobilbredd och fel vid kartladdning. Funktionstester använder lokala testbilder för att undvika upprepade hämtningar från karttjänsten.
