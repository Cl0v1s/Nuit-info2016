class LoginFormComponent extends Component
{
    constructor()
    {
        super({
            body : "\
                <img src='Assets/Logo.png'>\
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
        Model.GetInstance().login(username, password, (data) => {
            data = JSON.parse(data);
            if(data.code == 200)
            {
                App.Token = username + ":" + password;
                Model.GetInstance().retrieveUser(parseInt(data.content), (data) => {
                    data = JSON.parse(data);
                    if(data.code == 200)
                    {
                        Model.GetInstance().user = new User(data.content);
                        new CardsView().Show();
                    }
                    else 
                    {
                        alert("An error occured.");
                    }
                });
            }
            else{
                alert("Invalid credentials. Please retry.");
            }
        });
    }

    public Mount(parent : Component) : void
    {
        super.Mount(parent, null);
        let self : LoginFormComponent = this;
        this.GetDOM().querySelector("input[name='submit']").addEventListener("click", () => {self.Send();} );
    }
}