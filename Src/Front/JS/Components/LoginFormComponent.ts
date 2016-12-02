class LoginFormComponent extends Component
{
    constructor()
    {
        super({
            body : "\
                <input type='text' name='username' placeholder='Username'>\
                <input type='password' name='password' placeholder='Password'>\
                <input type='button' value='Login' name='submit'>\
            " 
        });
    }

    public Send() : void 
    {
        let username : string = (<HTMLInputElement>this.GetDOM().querySelector("input[name='username']")).value;
        let password : string = (<HTMLInputElement>this.GetDOM().querySelector("input[name='password']")).value;
        console.log(username+":"+password);
        //TODO: envoyer le formulaire 
    }

    public Mount(parent : Component) : void
    {
        super.Mount(parent, null);
        let self : LoginFormComponent = this;
        this.GetDOM().querySelector("input[name='submit']").addEventListener("click", () => {self.Send();} );
    }
}