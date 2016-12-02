class Model
{
    private static Instance : Model;

    public static GetInstance() : Model
    {
        if(Model.Instance == null)
            Model.Instance = new Model();
        return Model.Instance;
    }

    private cards : Array<Card> = new Array<Card>();
    private user : User;

    public User() : User
    {
        return this.user;
    }

    public Cards() : Array<Card>
    {
        return this.cards;
    }

    /**
     * Retourne length cartes depuis startid
     */
    public GetCardsBetween(startid : number, length : number) : Array<Card>
    {
        return this.cards;
    }

    /**
     * Permet la connexion d'un user
     */
    public login(username : string, password: string, callback : Function) : void
    {
        App.Get("login.php?username="+username+"&pwd="+password, callback, App.Error);
    } 

    /**
     * Permet à l'utilisateur connecté de se déconnecter
     */
    public logout(callback : Function) : void
    {

    }

    /**
     * Permet a un utilisateur de  créer une compte sur la plateforme 
     */
    public register(username : string, password : string, callback : Function) : void
    {
        App.Get("register.php?username="+username+"&pwd="+password, callback, App.Error);
    }
    
    /**
     * Récupère lengths cartes à partir de l'id précisé
     */
    public retrieveCards(startid : number, length : number, callback : Function) : void
    {

    }

    /**
     * Récupère les informations sur une carte en particulier
     */
    public retrieveCard(id : number, callback : Function) : void
    {

    }

    /**
     * Récupère le profile d'une utilisateur
     */
    public retrieveUser(id : number, callback : Function) : void 
    {

    }

    /**
     * Envoie une nouvelle carte au serveur 
     */
    public addCard(card : Card, callback : Function) : void
    {

    }

    /**
     * Permet de voter pour une carte
     */
    public voteCard(card :Card, upvote : boolean, callback : Function) : void
    {

    }

    /**
     * Récupère un sticker depuis le serveur 
     */
    public retrieveSticker(id : number, callback : Function) : void
    {

    }




}
