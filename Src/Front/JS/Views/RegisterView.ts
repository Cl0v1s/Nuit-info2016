class RegisterView extends View
{

    public Show() : void
    {
        super.Show();

        let base : Component = new Component({
            body : ""
        });
        this.Add(base).Mount(null, null);

        this.Add(new ButtonComponent("Login", () => {
            App.GoTo("login");
        })).Mount(base);


        this.Add(new ButtonComponent("Register", null)).Mount(base);

        
        this.Add(new RegisterFormComponent()).Mount(base);

    }
}