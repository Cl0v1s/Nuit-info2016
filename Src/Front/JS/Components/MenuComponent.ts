class MenuComponent extends Component
{
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
                <div>\
                    copyright\
                </div>\
            "
        });
    }

    public Cards() : void 
    {
        App.GoTo("cards");
    }

    public AddCard() : void 
    {
        App.GoTo("addcard");
    }

    public Mount(parent : Component)
    {
        super.Mount(parent, null);
        this.GetDOM().querySelector("input[name='cards']").addEventListener("click", () => {this.Cards();} );
        this.GetDOM().querySelector("input[name='add-card']").addEventListener("click", () => {this.AddCard();} );

    }
}