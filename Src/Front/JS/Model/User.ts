class User
{
    private id : number; 
    private username : string;
    private priority : number;
    private stickers : Array<Sticker>;

    constructor(data : any)
    {
        this.id = data.id_user;
        this.username = data.username;
        this.priority = data.priority;
        this.stickers = new Array<Sticker>();
        /*data.stickers.forEach((sticker) => {
            let sti : Sticker = new Sticker(sticker);
            this.stickers.push(sti);
        });*/
    }

    public Id() : number 
    {
        return this.id;
    }

    public Username() : string
    {
        return this.username;
    }


    public Priority() : number 
    {
        return this.priority;
    }

    public Stickers() : Array<Sticker>
    {
        return this.stickers;
    }
}