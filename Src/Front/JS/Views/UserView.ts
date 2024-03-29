class UserView extends View
{
    private user : User;

    constructor(user : User)
    {
        super();
        this.user = user;
    }

    public Show() : void 
    {
        super.Show();

        let base : Component = new Component({
            body : "", classes: "UserView"
        });
        this.Add(base).Mount(null, null);


        this.Add(new MenuComponent()).Mount(base);
        this.Add(new HeaderComponent("Profile")).Mount(base);

        this.Add(new Component({
            body: "<div>{{username}}</div>"
        })).Mount(base, {username : this.user.Username()});

        let stickerList : Component = new Component({
            body : ""
        });
        this.Add(stickerList).Mount(base, null);

        this.user.Stickers().forEach((sticker) => {
            this.Add(new StickerComponent(sticker)).Mount(stickerList);
        })

    }
}