class RegisterFormComponent extends Component
{
    constructor()
    {
        super({
            body : "\
                <input type='text' name='username' placeholder='Username'>\
                <input type='password' name='password' placeholder='Password'>\
                <input type='password' name='confirm-password' placeholder='Confirm Password'>\
                <input type='button' value='Login' name='submit'>\
            " 
        });
    }

    public Send() : void 
    {
        let username : string = (<HTMLInputElement>this.GetDOM().querySelector("input[name='username']")).value;
        let password : string = (<HTMLInputElement>this.GetDOM().querySelector("input[name='password']")).value;
        let confirmPassword : string = (<HTMLInputElement>this.GetDOM().querySelector("input[name='confirm-password']")).value;
        if(password != confirmPassword)
        {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        console.log(username+":"+password);
        //TODO: envoyer le formulaire 
    }

    public Mount(parent : Component) : void
    {
        super.Mount(parent, null);
        let self : RegisterFormComponent = this;
        this.GetDOM().querySelector("input[name='submit']").addEventListener("click", () => {self.Send();} );
    }
}