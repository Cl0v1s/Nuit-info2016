class App
{
    public static Debug : boolean = true;


    public static EndPoint : string = "http://172.17.0.2/rest/api";

    public static Main()
    {

        // Création des liens et des actions associées
        Linker.GetInstance().AddLink("login", () => {
            new LoginView().Show();
        });
        Linker.GetInstance().AddLink("register", () => {
            new RegisterView().Show();
        });
        Linker.GetInstance().AddLink("cards", () => {
            new CardsView().Show();
        });
        Linker.GetInstance().AddLink("addcard", () => {
            new AddCardView().Show();
        });
        Linker.GetInstance().AddLink(Link_Special.Default, () => {
            new CardsView().Show();
        });
        


        Linker.GetInstance().Analyze(); // Une fois qu'on a chargé la langue on analise l'URL
    }

    public static GoTo(link : string) : void 
    {
        window.location.replace("index.html?"+link);
    }

    public static Error(e : Error) : void
    {
        if(App.Debug)
        {
            console.log(e);
            return;
        }
        if(window.location.toString().endsWith(Link_Special.Error_500) == false)
            window.location.replace("Index.html?"+Link_Special.Error_500);            
    }

    /**
     * Envoie des requetes Ajax GET
     */
    public static Get(url : string, callback : Function, error? : Function) : void
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            // TODO: récupérer le cookie session_id
            callback(xhttp.responseText.trim());
        };
        xhttp.onerror = function()
        {
            if(error != null)
                error();
        }
        // TODO: ajouter le cookie session_id 
        xhttp.open("GET", url, true);
        console.log("Processing "+url);
        xhttp.send();

}
}

window.onload =  App.Main;
