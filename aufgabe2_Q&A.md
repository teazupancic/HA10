1.Wie viele Ressourcen werden zur Darstellung der Webseite geladen? Wie lange hat das
Laden aller Daten gedauert? Schauen Sie im MDN nach, was die Events DOMContentLoaded
(in der unteren Statusleiste zu sehen) und Load bedeuten. Wie viele Daten (Größe)
werden insgesamt geladen?

8 Ressourcen (blog.html, drei bootstrap dateien, myStyle.css, jgp für logo, addNewArticle.js, jquery).

finish = download
DOMContentLoaded: 1.41s
Load: 1.40s

DOMContentLoaded- ursprüngliche HTML-Dokument vollständig geladen und analysiert (loaded and parsed) wurde, ohne dass auf das Laden von Stylesheets,
Bildern und Subframes gewartet werden muss.
DOM Load - wenn eine Ressource (html) und ihre abhängigen Ressourcen vollständig geladen (loaded) wurden.

transferred: 82.1KB


2.Wie viele TCP-Verbindungen wurden pro Domain aufgebaut? (Hinweis: Connection
ID einblenden.) Wie viele TCP-Verbindungen dürfen in HTTP/1.1 maximal aufgebaut
werden? Wie kann diese Begrenzung umgegangen werden?

4 Verbindungen für alle 8 Dateien. (sehe TCP_Verbindungen.jpg).

//Wenn das Timeout wirklich kurz ist, könnte es acht sein (wie die Anzahl der Dateien). Eine neue Verbindung für jede Datei. ne!
//Je länger das Timeout ist, desto mehr Dateien können über eine Verbindung gesendet werden. ne!
nur zwei lautet rnc (in modernen browsern firefox 4+, chrome 4+ tudi do 6 povezav).

3.Klicken Sie nacheinander auf Blog.html, myStyle.css und addNewArticle.js und dort auf den Reiter Timing.
Was bedeuten die einzelnen Einträge? Welche Aktion dauert meistens am längsten?
Wieso benötigt addNewArticle.css im Gegensatz zu Blog.html keinen SSLVerbindungsaufbau?
Wieso besitzt myStyle.css keine DNS-Abfrage?

Wir sehen, was der Browser zu jeder Zeit gemacht hat -> Sehe Fotos.
längsten hat Waiting(TTFB) gedauert -> warten auf http response? 

SSL (html conn.id = ...50 css&js conn.id=...66) -> js verwendet dieselbe TCP-Verbindung wie css, daher wurde die SSL bereits eingerichtet. 
DNS -> css besitzt dns-Abfrage? Wir haben bereits die IP von Browser und Server? -> dns anfrage rabis samo 1x


4.In Kapitel 6 ist zu lesen, dass eine HTTP-Nachricht aus einem Header- und einem BodyAbschnitt besteht.
Klicken Sie auf Blog.html und schauen Sie sich den Headers-Reiteran. Hier werden die HTTP-Header der Anfrage und Antwort gezeigt.
Beschreiben Sie, wie der HTTP-Header sowohl bei einer HTTP/1.1 Anfrage als auch bei einer Antwort generell aufgebaut ist?
Beschreiben Sie den Aufbau in einer ähnlichen Art, wie er auf Folie 12 für TCP dargestellt ist. Mittels view source können Sie dazu den
Header unaufbereitet sehen. Versuchen Sie den Header-Aufbau so weit wie möglich zu generalisieren/abstrahieren, so dass er auf alle Anfragen/Antworten passt, die der Browser
gesendet hat. Die Lösung ist zu lesen in der HTTP-Spezifikation RFC 72303 in Abschnitt 3.
Gehen Sie insbesondere darauf ein, wie die Start Line aufgebaut ist und wie HTTP-Header und HTTP-Body voneinander abgegrenzt werden.

+screenshots von Anfrage and Antwort.

Header für Anfrage: 
*request method (GET, POST, PUT...) Methode gibt an, um welche Art von Anfrage es sich handelt.
*"path" ist im Allgemeinen der Teil der URL, der hinter dem Host (Domäne) steht.
*http Version (normalerweise 1.1)
*host: Eine HTTP-Anfrage wird an eine bestimmte IP-Adresse gesendet. Da die meisten Server jedoch mehrere Websites unter derselben IP-Adresse hosten können, müssen sie wissen, nach welchem Domainnamen der Browser sucht.
*connection: keep-alive tcp Verbindung nicht schliessen. (close ist eine andere Möglichkeit)
*user-agent: Browsername und -version, Betriebssystemname und -version, Standardsprache.
*Upgrade-Insecure-Requests sendet ein Signal an den Server, das die Präferenz des Clients für eine verschlüsselte und authentifizierte Antwort
*accept: Antworttyp, den der Browser akzeptieren kann
*accept-encoding: Der Webserver kann dann die HTML-Ausgabe in einem komprimierten Format senden. Dies kann die Größe um bis zu 80% reduzieren, um Bandbreite und Zeit zu sparen.
*accept-language: bevorzugte Sprache des Benutzers (die Webseite kann in mehreren Sprachen geschrieben werden)
*cookie: sendet die in Browser gespeicherten Cookies für diese Domäne.
*authorization: Wenn eine Webseite nach einer Autorisierung fragt, öffnet der Browser ein Anmeldefenster. Wenn man in diesem Fenster einen Benutzernamen und ein Passwort eingibt, sendet der Browser eine weitere HTTP-Anfrage.

Header für Antwort:
*http Version
*http status code (1xx information, 2xx ok, 3xx redirect, 4xx client error, 5xx server error)
*date: das Datum und die Zeit
*server: Informationen über den Server, an den die Anfrage gesandt wurde
*last-modified: Definiert das Datum, an dem der HTML-Code zuletzt geändert wurde (aus dem Zeitstempel der HTML-Datei)
*etag: zum Zwischenspeichern
*accept-ranges: Wird vom Server verwendet, um die Unterstützung von Teilanforderungen anzukündigen.
*vary: legt fest, wie zukünftige Anforderungsheader abgeglichen werden, um zu entscheiden, ob eine zwischengespeicherte Antwort verwendet werden kann, anstatt eine neue vom Server anzufordern
*content-length: Anzahl der Datenbytes im Body
*keep-alive: timeout (Angabe, wie lange eine Verbindung mindestens geöffnet bleiben muss (in Sekunden)), max (maximale Anzahl von Anforderungen, die für diese Verbindung gesendet werden können, bevor sie geschloßen wird.)
*content-type: Art des Inhalts, der Browser weiß, wie er zu interpretieren ist (text/html,image/gif,application/pdf...)
*location: Dieser Header wird für Umleitungen verwendet
*set-cookie: Der Server möchte, dass der Client einen Cookie speichert

Zwischen header und body befindet sich eine leere Zeile. 


5.Nennen Sie die Einteilung der HTTP Status-Codes und erklären Sie die Bedeutung folgender HTTP Header-Felder:
Accept, Accept-Encoding, Accept-Language, Cache-Control, Connection, Content-Length, Content-Type, Last-Modified, Referer, User-Agent, Via
Falls die Erklärungen der Folien nicht ausreichend oder verständlich sind, wird die Semantik der
einzelnen HTTP-Elemente auch in der zweiten HTTP-Spezifikation RFC 72314 beschrieben. 
Welches Header-Feld muss in einer HTTP/1.1-Anfrage immer vorhanden sein? ZusatzFrage: Wieso ist es wichtig? (Bedenken Sie bei dieser Frage, dass bei jeder HTTPVerbindung
zuvor bereits mit TCP/IP eine Verbindung zum Server aufgebaut wurde.)

from: https://www.addedbytes.com/blog/http-status-codes
1xx information (100 continue, Der Server verpflichtet sich, die Anfrage des Kunden zu bearbeiten)
2xx success (200 ok -> Anfrage wurde empfangen und verstanden und wird bearbeitet, 201 created -> 
Eine Anfrage war erfolgreich und als Ergebnis wurde eine Ressource erstellt (z. B. eine neue Seite)., 
202 accepted -> Anfrage zur Bearbeitung angenommen, obwohl sie nicht sofort bearbeitet werden kann)
3xx redirect (300 multiple choices -> Der Statuscode 300 zeigt an, dass eine Ressource verschoben wurde.
Die Antwort enthält auch eine Liste von Standorten, aus denen der Benutzeragent das am besten geeignete auswählen kann.
301 moved premanently, 302 found -> Die Ressource wurde vorübergehend an einen neuen Standort verschoben.)
4xx client error (401 unauthorized, 402 payment required, 404 not found -> Die Ressource wurde unter der angegebenen URL nicht gefunden)
5xx server error (500 internal server error, 501 not implemented, 502 bad gateway...)

*cache-control: Wird verwendet, um Anweisungen für Caching-Mechanismen anzugeben (max-age=<seconds>,no-cache...)
*referer: Enthält die Adresse der vorherigen Webseite, von der ein Link zur aktuell angeforderten Seite gefolgt wurde.

Welches Header-Feld muss in einer HTTP/1.1-Anfrage immer vorhanden sein? request method und path -> So wissen wir,
wohin die Anfrage geht und was wir vom Server erwarten


6.Aktivieren Sie nun den Cache wieder (oben in den Einstellungen im Netzwerk-Panel).
Laden Sie die Seite mehrmals neu. Wie lange dauert das Laden der kompletten Seite jetzt?
Was hat sich bei der HTTP-Anfrage und -Antwort für Blog.html geändert? (Achten
Sie auf die Header-Felder. Optional können Sie sich gerne zum besseren Verständnis
zusätzlich eine Webseite zum HTTP Caching5 durchlesen.)

DOMContentLoaded: 501ms, load 500 ms, finish 282ms.
request bleibt gleich, response: foto response with cache (es gibt nur Upgrade-Insecure-Requests:1 und user agent)