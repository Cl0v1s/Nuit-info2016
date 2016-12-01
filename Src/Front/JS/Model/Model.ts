class Model
{
    private static Instance : Model;

    public static GetInstance() : Model
    {
        if(Model.Instance == null)
            Model.Instance = new Model();
        return Model.Instance;
    }

    private cards : Array<Card>;
    private user : User;

    /**
     * Permet la connexion d'un user
     */
    public login(username : string, password: string, callback : Function) : void
    {

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
