class CardsView extends View
{
    private index : number = 0;
    private length : number = 10;

    private cardsList : Component;

    public LoadMore() : void 
    {
        this.index = this.index + this.length;
        console.log("Loading "+this.index);
        let cards : Array<Card> = Model.GetInstance().Cards().slice(this.index, this.index + this.length);
        cards.forEach((card) => {
            this.Add(new CardComponent(card)).Mount(this.cardsList);
        });
    }


    public Show() : void
    {
        super.Show();

        let base : Component = new Component({
            body : ""
        });
        this.Add(base).Mount(null, null);

        this.Add(new HeaderComponent("Cards")).Mount(base);

        this.cardsList = new Component({
            body : ""
        });
        this.Add(this.cardsList).Mount(base, null);

        let cards : Array<Card> = Model.GetInstance().Cards().slice(this.index, this.index + this.length);
        cards.forEach((card) => {
            this.Add(new CardComponent(card)).Mount(this.cardsList);
        });

        this.Add(new ButtonComponent("Load More Cards", () => {
            this.LoadMore();
        })).Mount(base);
    }
}