/**
 * Représente un composant de l'interface
 */
class Component
{

    public static IDS : number = 0; 

    public id : number; 
    protected body : string; 
    protected view : View;
    protected classes : string;
    private mountable : boolean;

    constructor(args : any)
    {
        if(args.body == undefined)
            throw new Error("You must define a body to this component");
        this.body = args.body;
        this.classes = args.classes;
        this.mountable = false;
    }

    public SetMountable() : void
    {
        this.mountable = true;
    }

    protected GetDOM() : HTMLElement
    {
        return document.getElementById("component-"+this.id);
    }

    /**
     * Construit le composant dans la page
     */
    public Mount(parent : Component, opts : any) : void
    {
        if(this.mountable == false)
            throw new Error("You must set this component mountable (Call this.Add(theComponent) in the view's source code)");
        this.id = Component.IDS;
        Component.IDS = Component.IDS + 1;

        let par : string;
        if(parent == null)
            par = null;
        else if(parent.id == undefined)
            throw Error("Parent must be mount.");
        else 
            par = "component-"+parent.id;
        this.Render(par, opts);
    }

    /**
     * Affiche le composant dans la page
     */
    private Render(parent : string, opts : any)
    {
        let target : HTMLElement;
        if(parent != null) 
            target = document.getElementById(parent);
        else 
        {
            if(View.RootID == null)
                target = document.body;
            else 
                target = document.getElementById(View.RootID);

        }
        // remplacement des valeurs
        if(opts != null)
        {
            for(var key in opts)
            {
                let reg : RegExp = new RegExp("{{"+key+"}}", "g");
                this.body = this.body.replace(reg, opts[key]);
            } 
        }
        // Construction du DOM
        let dom : HTMLDivElement = document.createElement("div");
        dom.id = "component-"+this.id;
        dom.className = this.constructor.name;
        if(this.classes != undefined)
            dom.className += " " + this.classes;
        dom.innerHTML = this.body;
        dom.addEventListener("click", (event) => {this.Click(event);});
        target.appendChild(dom);
        
    }

    public AddClass(clas : string) : void
    {
        this.GetDOM().className = this.GetDOM().className + " " + clas;
    }


    /**
     * Gère l'action lors du click sur le composant
     */
    public Click(ev : UIEvent) : void
    {

    }
}
