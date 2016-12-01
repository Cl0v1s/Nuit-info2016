/**
 * Une vue est un element consituté d'un ensemble de composants permettant de présenter des informations à l'utilisateur
 */
class View
{

    /**
     * ID (#) de l'élement DOM sur lequel fixer la vue. Si RootID est null, la vue se fixe sur <body>. 
     */
    public static RootID : string = null;

    private components : Array<Component>;

    constructor()
    {
        this.components = new Array<Component>();
    }

    /**
     * Ajoute un composant à la vue 
     */
    public Add(component : Component) : any
    {
        component.SetMountable();
        this.components.push(component);
        return component;
    }

    /**
     * Affiche la vue
     */
    public Show() : void
    {
        if(View.RootID == null)
            document.body.innerHTML = "";
        else 
            document.getElementById(View.RootID).innerHTML = "";
    }

    /**
     * Appelé lorsque l'on rentre dans la vue
     */
    public Enter() : void
    {

    }
    

    /**
     * Appelé lorsque l'on quitte la vue
     */
    public Leave() : void
    {

    }
}
