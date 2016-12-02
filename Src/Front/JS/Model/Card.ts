class Card
{
    private id : number;
    private title : string;
    private description : string;
    private value : number; 
    private priority : number;
    private date : number;
    private user_id : number;

    constructor(data : any)
    {
        this.id = data.id_card;
        this.title = data.title;
        this.description = data.description;
        this.value = data.value;
        this.priority = data.priority;
        this.date = data.date;
        this.user_id = data.user_id;
    }

    public Id() : number
    {
        return this.id;
    }

    public UserId() : number
    {
        return this.user_id;
    }

    public Title() : string
    {
        return this.title;
    }

    public Description() : string
    { 
        return this.description;
    }

    public Value() : number
    {
        return this.value;
    }

    public Priority() : number
    {
        return this.priority;
    }

    public Date() : number
    {
        return this.date;
    }
}