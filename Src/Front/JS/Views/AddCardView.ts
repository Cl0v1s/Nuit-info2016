class AddCardView extends View
{
    public Show() : void 
    {
        super.Show();

        let base : Component = new Component({
            body : ""
        });
        this.Add(base).Mount(null, null);

        this.Add(new MenuComponent()).Mount(base);
        this.Add(new HeaderComponent("Add Card")).Mount(base);

        this.Add(new AddCardFormComponent()).Mount(base);

    }
}