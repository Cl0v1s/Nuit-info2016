class AddCardFormComponent extends Component
{
    constructor()
    {
        super({
            body : "\
                <input type='text' name='title' placeholder='title'>\
                <input type='text' name='link' placeholder='Link'>\
                Or\
                <textarea placeholder='content' name='content'></textarea>\
                <input type='button' name='submit' value='Send this card'>\
                <input type='button' name='cancel' value='Cancel'>\
                " 
        });
    }

    public Send() : void 
    {
        let title : string = (<HTMLInputElement>this.GetDOM().querySelector("input[name='title']")).value;
        let link : string = (<HTMLInputElement>this.GetDOM().querySelector("input[name='link']")).value;
        let content : string = (<HTMLInputElement>this.GetDOM().querySelector("textarea[name='content']")).value;
        console.log(title+":"+link+":"+content);
        //TODO: envoyer le formulaire 
    }

    public Cancel() : void
    {
        App.GoTo(Link_Special.Default);
    }

    public Mount(parent : Component) : void
    {
        super.Mount(parent, null);
        this.GetDOM().querySelector("input[name='submit']").addEventListener("click", () => {this.Send();} );
        this.GetDOM().querySelector("input[name='cancel']").addEventListener("click", () => {this.Cancel();} );
    }
}