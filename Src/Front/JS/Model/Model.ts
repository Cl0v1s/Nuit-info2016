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
    public user : User;

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
    public retrieveCards(callback : Function) : void
    {
        Model.GetInstance().cards = new Array<Card>();
        App.Get("getCards.php?", (data) => {
            data = JSON.parse(data);
            if(data.code == 200)
            {
                data.content.forEach((card) => {
                    let c : Card = new Card(card);
                    Model.GetInstance().cards.push(c);
                });
                callback();
            }
            else 
            {
                alert("An Error occured.");
                return;
            }
        }, App.Error);
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
        App.Get("getUser.php?id_user="+id, callback, App.Error);
    }

    /**
     * Envoie une nouvelle carte au serveur 
     */
    public addCard(title : string, link : string, text : string, callback : Function) : void
    {
        App.Get("addCard.php?title="+title+"&link="+link+"&text="+text, callback, App.Error);
    }

    /**
     * Permet de voter pour une carte
     */
    public voteCard(card :Card, upvote : boolean, callback : Function) : void
    {
        let vote = "true";
        if(upvote == false)
            vote = "false";
        App.Get("voteCard.php?cardId="+card.Id()+"&vote="+vote, callback, App.Error);
    }

    /**
     * Récupère un sticker depuis le serveur 
     */
    public retrieveSticker(id : number, callback : Function) : void
    {

    }




}
