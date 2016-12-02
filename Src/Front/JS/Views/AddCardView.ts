class AddCardView extends View
{
    public Show() : void 
    {
        let base : Component = new Component({
            body : ""
        });
        this.Add(base).Mount(null, null);

        this.Add(new HeaderComponent("Add Card")).Mount(base);

        this.Add(new AddCardFormComponent()).Mount(base);

    }
}