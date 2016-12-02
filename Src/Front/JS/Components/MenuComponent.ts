class MenuComponent extends Component
{

    private open : boolean = false;
    private origin : string; 

    constructor()
    {
        super({
            body : "\
                <img src='Assets/Logo.png'>\
                <input type='button' value='menu' name='menu'>\
                <div>\
                    <input type='button' value='Cards' name='cards'>\
                    <input type='button' value='Add a Card' name='add-card'>\
                </div>\
            "
        });
    }

    public Open() : void
    {
        this.open = !this.open;
        if(this.open)
            this.GetDOM().className += " open";
        else 
            this.GetDOM().className = this.origin;
    }

    public Cards() : void 
    {
        new CardsView().Show();
    }

    public AddCard() : void 
    {
        new AddCardView().Show();
    }

    public Mount(parent : Component)
    {
        super.Mount(parent, null);
        this.origin = this.GetDOM().className;
        this.GetDOM().querySelector("input[name='menu']").addEventListener("click", () => {this.Open();} );        
        this.GetDOM().querySelector("input[name='cards']").addEventListener("click", () => {this.Cards();} );
        this.GetDOM().querySelector("input[name='add-card']").addEventListener("click", () => {this.AddCard();} );

    }
}