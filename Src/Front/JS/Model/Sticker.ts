class Sticker
{
    private id : number;
    private logo : string;
    private title :  string;
    private description : string; 

    constructor(data)
    {
        this.id = data.id;
        this.logo = data.logo;
        this.title = data.title;
        this.description = data.description;
    }

    public Id() : number 
    {
        return this.id;
    }

    public Logo() : string
    {
        return this.logo;
    }

    public Title() : string
    {
        return this.title;
    }

    public Description() : string
    {
        return this.description;
    } 

}