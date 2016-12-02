class LoginView extends View
{

    public Show() : void
    {
        super.Show();

        let base : Component = new Component({
            body : "", classes : "LoginView"
        });
        this.Add(base).Mount(null, null);

        this.Add(new ButtonComponent("Login", null)).Mount(base);

        this.Add(new ButtonComponent("Register", () => {
            App.GoTo("register");
        })).Mount(base);
        
        this.Add(new LoginFormComponent()).Mount(base);

    }
}