
var Link_Special =  
{
    Default : null,
    Error_500 : "ERROR_500",
    Error_404 : "ERROR_404"
}

/**
 * Permet d'associer un lien et une méthode, permet de simuler un comportement d'affichage par page 
 */
class Link
{

    public url : string;
    public method : Function;

    constructor(url : string, method : Function)
    {
        this.url = url;
        this.method = method;
    }
}

/**
 * Permet de simuler un système d'affichage par page qui soit totalement transparent pour l'utilisateur 
 * On lit un mot à une méthode. 
 * Un url compatible doit être de la forme 
 * http://blah.com/Index.html?page-par1-par2-par3-...-parn
 */
class Linker
{
    private static Instance : Linker;

    public static GetInstance() : Linker 
    {
        if(Linker.Instance == null)
            Linker.Instance = new Linker();
        return Linker.Instance;
    }

    private registry : Array<Link> = new Array<Link>();

    /**
     * Ajoute un nouveau lien au système (et par la une page)
     */
    public AddLink(url : string, method : Function)
    {
        if(this.GetLink(url) != null)
            throw Error("Url must be unique.");
        let link : Link = new Link(url, method);
        this.registry.push(link);
    }

    /**
     * Retourne l'objet Link associé à l'url demandée
     */
    private GetLink(url : string) : Link
    {
            for(let i : number = 0; i != this.registry.length; i++)
            {
                let e : Link  = this.registry[i];
                if(e.url == url)
                {
                    return e;
                }
            }
            return null;
    }
    
    /**
     * Annalise l'url de la page courante pour déterminer d'éventuelles actions à réaliser
     */
    public Analyze() : void
    {
        try
        {
            let url : string = window.location.toString().split("?")[1];
            let params : Array<string> = url.split("-");
            url = params.shift();
            this.GetLink(url).method(params);
        }
        catch(e)
        {
            console.log("Linker error, redirect to default");
            this.GetLink(Link_Special.Default).method(); // SI une erreur a eu lieu, on affiche la page par defaut
        }
    }
}
