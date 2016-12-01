class Model
{
    private static Articles : Array<Article> = null;
    private static Replays : Array<Replay> = null;

    /**
     * Récupère la liste des replays présents dans la base de données
     * Appelle callback une fois l'opération de récupération terminée
     */
    public static RetrieveReplays(callback : Function) : void
    {
        Model.Replays = new Array<Replay>();
        App.Get(App.EndPoint+"/collections/get/Replays", (data) => {
            try
            {
                data = JSON.parse(data);
                data.forEach((e) => {
                    Model.Replays.push(new Replay(e));
                });
                callback();
            }
            catch(e)
            {
                App.Error(e);               
            }
        }, function(){
                App.Error(new Error("Unable to reach page"));               
        });
    }

    /**
     * Récupère la liste des articles présents dans la base de données
     * Appelle callback une fois l'opération de récupération terminée
     */
    public static RetrieveArticles(callback : Function) : void
    {
        Model.Articles = new Array<Article>();
        App.Get(App.EndPoint+"/collections/get/Articles", (data) => {
            try
            {
                data = JSON.parse(data);
                data.forEach((e) => {
                    let a : Article = new Article(e);
                    if(a.Lang() == Locale.GetInstance().GetLang())
                        Model.Articles.push(a);
                });
                // tri des articles par date de parution décroissant 
                // TODO: à tester 
                Model.Articles.sort((a,b) : number => {
                    if(a.Created() > b.Created())
                        return -1;
                    else if(a.Created() < b.Created())
                        return 1;
                    return 0;
                });
                callback();
            }
            catch(e)
            {
                App.Error(e);                               
            }

        }, function(){
                App.Error(new Error("Unable to reach page"));                              
        });
    }

    /*
    public static Retrieve(callback : Function) : void
    {
        Model.RetrieveArticles(() => {
            Model.RetrieveReplays(() => {
                callback();
            });
        });
    }*/

    /**
     * Retourne l'article possédant l'id précisé depuis la liste des articles présents dans le CMS
     */
    public static GetArticle(id : string) : Article
    {
        if(Model.Articles == null)
            throw Error("Les articles doivent être récupérés depuis le CMS avant opération.");
        for(let i : number  = 0; i != Model.Articles.length; i++)
        {
            let e : Article = Model.Articles[i];
            if(e.Id() == id)
            {
                return e;
            }
        }
        return null;
    }

    public static GetArticles() : Array<Article>
    {
        if(Model.Articles == null)
            throw Error("Les articles doivent être récupérés depuis le CMS avant opération.");
        return Model.Articles;
    }

    public static GetReplays() : Array<Replay>
    {
        if(Model.Replays == null)
            throw Error("Les replays doivent être récupérés depuis le CMS avant opération.");
        return Model.Replays;
    }


}
