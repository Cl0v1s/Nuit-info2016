class AddCardFormComponent extends Component
{
    constructor()
    {
        super({
            body : "\
                <input type='text' name='title' placeholder='title'><br>\
                <input type='text' name='link' placeholder='Link'><br>\
                Or<br>\
                <textarea placeholder='content' name='content'></textarea><br>\
                <input type='button' name='submit' value='Send this card'><br>\
                <input type='button' name='cancel' value='Cancel'>\
                " 
        });
    }

    public Send() : void 
    {
        let title : string = (<HTMLInputElement>this.GetDOM().querySelector("input[name='title']")).value;
        let link : string = (<HTMLInputElement>this.GetDOM().querySelector("input[name='link']")).value;
        let content : string = (<HTMLInputElement>this.GetDOM().querySelector("textarea[name='content']")).value;
        if(title.length == 0 || title.indexOf(" ") != -1)
        {
            alert("title incorrect.");
            return;
        }
        if(link.length == 0 && content.length == 0)
        {
            alert("You must set link or content.");
            return;
        }
        Model.GetInstance().addCard(title, link, content, (data) => {
            data = JSON.parse(data);
            if(data.code == 200)
            {
                new CardsView().Show();
            }
            else 
            {
                alert("An error occured.");
            }
        })
    }

    public Cancel() : void
    {
        new CardsView().Show();
    }

    public Mount(parent : Component) : void
    {
        super.Mount(parent, null);
        this.GetDOM().querySelector("input[name='submit']").addEventListener("click", () => {this.Send();} );
        this.GetDOM().querySelector("input[name='cancel']").addEventListener("click", () => {this.Cancel();} );
    }
}