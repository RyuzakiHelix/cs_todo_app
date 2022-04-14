# cs_todo_app
WEB aplikacija izrađena pomoću Angular framework-a, izrađen API koristeći .net tehnologiju. Aplikacija će služiti za spremanje ToDo zadataka, markiranjem ToDo kao obavljen. Svi podaci će biti prezistentni u memoriji. Na kraju će biti kreirana kompletna Docker arhitektura.

docker-compose up u root direkotoriju.

Dotnet docker: https://hub.docker.com/repository/docker/ryuzakihelix/sample-dotnetwebapi-app-image

Angular docker: https://hub.docker.com/repository/docker/ryuzakihelix/angular

<h3 align="center">Implementacija</h3>
<h3 align="left">back_dotnet/todo</h3>
<h4 align="left">Login, Registracija, JWT</h4>
<h5 align="left">1. AuthenticateController.cs</h5>
<p>Sadrži funkcije za registraciju korisnika, login, i generiranje jwt tokona. Sve ide preko usermanager koji je zapravo IdentityUser, te configuration koja sadrži BE settings, parametre. Također metode upravljaju sa modelom UserForRegistration, koji je zapravo model sa podacima koji su nam potrebni u projektu tokom registracije i login iz baze/u bazu. <b>ExternalLogin i VerifyGoogleToken u testiranju trenutno</b>
</p>
<h5 align="left">2. ToDoController.cs</h5>
<p>Dodan je parametar [Authorize] koji automatski provjerava korisnika i na temelju toga da pristup potanjama ili neda. Trenutno sve putanje rade preko sql upita direktno spajanje na bazu podataka.
</p>
<h5 align="left">3. Models</h5>
<p>Najbitniji su UserContext koji omogučava migration i korištenje IdentityUser, te UserForRegistration koji ima samo varijable koje mi koristimo, jer sam Idenitity pruža više nego mi koristimo trenutno. Ostali modeli su stariji i vezani su za bazu, todo, ili Response i External koji su u testiranju.
</p>
<h5 align="left">4. Program.cs</h5>
<p><b>Najbitniji file.</b>
 Posebno se prvo spajamo da IDataContext koji služi za upravljanje sve vezano za todo, a nakon toga UserContext koji služi za upravljanje sve vezano za Identity. AddGoogle još u testiranju ali služi za dohvačanje google parametara i njihovog ključa. Isto kao i za google imamo i za jwt koji je funkcionalan. Nakon toga je bitno napomenuti da još imamo i funkciju koja obavlja migration baze, nije nažalost savršeno i služi samo radi docker-a za prvi put podizanje aplikacije.
</p>

<h3 align="left">front</h3>
<h4 align="left">Login, Registracija, JWT</h4>
<h5 align="left">auth.serivice.ts</h5>
<p>Nalazise unutar services folder. upravlja sa svime, sadrži sve funkcije bitne za rad. Puno toga komentiranog ignorirati jer testiranje, dodatne varijante, podsjetnici programeru. sendAuthStateChangeNotification2() pozivamo svaki put kad se korisnik login ili logout, kako bi promjenili "state" aplikacije kako bi ostalim komopentama rekli i ograničili pristup ako nije login. <br><br>
isUserAuthenticated() provjerava jel token postoji i da nije istekao, kako bi također obavijestio određene komponente.<br>
registerUser() jednostavan poziv na bazu da se korisniik registrira.<br><br>
loginUser() ima ponavljanja i testiranja kao metoda, jer služi za dohvačanje tokena, spremanje tokena, ažuriranje sesije i obaviještavanje ostalih komponenti. Postoji bolji način da se optimizira, ali u testiranju trenutno, ovako radi.<br><br>
logout() služi samo za micanje token-a iz spremnika i obavijesti sesiju.
</p>
<h5 align="left">Komponente</h5>
<p><b>Register</b> Sastoji se od jednostavne forme, formgroup, koja prikupi podatke i samo ih proslijedi auth servisu, iako postoji confirm password zapravo nismo napravili validaciju podataka, ideja je kasnije preko error handling-a.<br><br>
<b>Login</b> isto kao i register jednostavna forma. Postoje meotode za external login, koje su u fazi testiranja, te dosta komentara jel treba odlučiti bude li service rješavao login, ili direkt preko subsciribe bude komponenta.
</p>
<h5 align="left">Ostalo</h5>
<p><b>app module</b>, <b>app component ts</b>, <b>app routing</b> sadžavaju minimalne promjene koje sve to omogučuju da radi, sami sebe objašnjavaju.<br>br>
Folder helper sadržava guard koji štiti routes, te jwt koji nije implementiran jer koristimo vanjsku angular lib za jwt. Modeli su za sada samo todo i responsi koji nam zapravo služi  trenutno za sve user potrebe.
</p>
