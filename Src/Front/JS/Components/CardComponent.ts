class CardComponent extends Component
{
    private card : Card;

    constructor(card : Card)
    {
        super({
            body: "\
                <div>\
                    <input type='button' value='up' name='up'>\
                    <input type='button' value='down'name='down'>\
                </div>\
                <div>\
                    {{title}}\
                </div>\
                <div>\
                    {{content}}\
                </div>\
                <input type='button' value='Read more' name='read-more'>\
            ",
        });
        this.card = card;
    }

    public Up() : void
    {
        console.log("up");
        
        Model.GetInstance().voteCard(this.card, true, null);
    }

    public Down() : void
    {
        console.log("down");
        
        Model.GetInstance().voteCard(this.card, false, null);
    }

    public ReadMore() : void
    {
        //TODO: expand (add class css)
        console.log("expand");
    }

    public Mount(parent : Component)
    {
        let opts : any = {
            title : this.card.Title, 
            content : this.card.Description
        };
        super.Mount(parent, opts);
        this.GetDOM().querySelector("input[name='up']").addEventListener("click", () => { this.Up()});
        this.GetDOM().querySelector("input[name='down']").addEventListener("click", () => { this.Down()});
        this.GetDOM().querySelector("input[name='read-more']").addEventListener("click", () => { this.ReadMore()});
    }
}