class CardComponent extends Component
{
    private card : Card;

    constructor(card : Card)
    {
        super({
            body: "\
                <div>\
                    <input type='button' value='up' name='up'>\
                    <span>{{vote}}</span>\
                    <input type='button' value='down'name='down'>\
                </div>\
                <div>\
                    {{title}}\
                </div>\
                <div>\
                    {{content}}\
                </div>\
            ",
        });
        this.card = card;
    }

    public Up() : void
    {
        
        Model.GetInstance().voteCard(this.card, true, (data) => {
            data = JSON.parse(data);
            if(data.code == 200)
            {
                new CardsView().Show();
            }
            else 
            {
                alert("An error occured.");
            }
        });
    }

    public Down() : void
    {
        
        Model.GetInstance().voteCard(this.card, false, (data) => {
            data = JSON.parse(data);
            if(data.code == 200)
            {
                new CardsView().Show();
            }
            else 
            {
                alert("An error occured.");
            }
        });
    }

    public ReadMore() : void
    {
        //TODO: expand (add class css)
        console.log("expand");
    }

    public Mount(parent : Component)
    {
        let opts : any = {
            title : this.card.Title(), 
            content : this.card.Description(), 
            vote : this.card.Value()
        };
        super.Mount(parent, opts);
        this.GetDOM().querySelector("input[name='up']").addEventListener("click", () => { this.Up()});
        this.GetDOM().querySelector("input[name='down']").addEventListener("click", () => { this.Down()});
    }
}