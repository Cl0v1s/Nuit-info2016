class App
{
    public static Debug : boolean = true;

    public static EndPoint : string = "http://172.17.0.2/rest/api";
    public static Token : string = "5e33c6d1ec779b9210e9cdad";
    //public static Token : string = "1466c749fd54c9e648ad57a6";


    public static Main()
    {
        View.RootID = "Content";

        /**
         * Affiche l'ensemble des articles présents dans le site
         */
        let showArticles : Function = function(){
            Model.RetrieveArticles(() => {
                new ArticlesView().Show();
            });
        };

        /**
         * Affiche l'ensemble des replays disponibles
         */
        let showReplays : Function = function(){
            Model.RetrieveReplays(() => {
                new ReplaysView().Show();
            });
        };

        /**
         * Affiche un article en particulier (premier élément du tableau params)
         */
        let showArticle : Function = function(params)
        {
            Model.RetrieveArticles(() => {
                new ArticleFocusView(Model.GetArticle(params[0])).Show();
            });
        };

        /**
         * Affiche le message erreur 500
         */
        let showError500 : Function = function()
        {
            new Error500View().Show();
        }

        /**
         * Affiche le message erreur 400
         */
        let showError404 : Function = function()
        {
            new Error404View().Show();
        }

        /**
         * Affiche la page d'index
         */
        let showHome : Function = function()
        {
            Model.RetrieveArticles(() => {
                Model.RetrieveReplays(() => {
                    new IndexView().Show();
                });
            });
        }


        // Création des liens et des actions associées
        Linker.GetInstance().AddLink("articles", showArticles);
        Linker.GetInstance().AddLink("replays", showReplays);
        Linker.GetInstance().AddLink("article", showArticle);
        Linker.GetInstance().AddLink("index", showHome);
        Linker.GetInstance().AddLink(Link_Special.Error_404, showError404);
        Linker.GetInstance().AddLink(Link_Special.Error_500, showError500);
        Linker.GetInstance().AddLink(Link_Special.Default, showHome);


        Locale.CreateInstance(() => { // Chargement de la langue 
            Linker.GetInstance().Analyze(); // Une fois qu'on a chargé la langue on analise l'URL
        });
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
            callback(xhttp.responseText.trim());
        };
        xhttp.onerror = function()
        {
            if(error != null)
                error();
        }
        xhttp.open("GET", url + "?token="+App.Token, true);
        console.log("Processing "+url);
        xhttp.send();

}
}

window.onload =  App.Main;
