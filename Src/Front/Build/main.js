class Card {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.value = data.value;
        this.priority = data.priority;
        this.date = data.date;
        this.user_id = data.user_id;
    }
    Id() {
        return this.id;
    }
    UserId() {
        return this.user_id;
    }
    Title() {
        return this.title;
    }
    Description() {
        return this.description;
    }
    Value() {
        return this.value;
    }
    Priority() {
        return this.priority;
    }
    Date() {
        return this.date;
    }
}
class Sticker {
    constructor(data) {
        this.id = data.id;
        this.logo = data.logo;
        this.title = data.title;
        this.description = data.description;
    }
    Id() {
        return this.id;
    }
    Logo() {
        return this.logo;
    }
    Title() {
        return this.title;
    }
    Description() {
        return this.description;
    }
}
class User {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.priority = data.priority;
        this.stickers = new Array();
        data.stickers.forEach((sticker) => {
            let sti = new Sticker(sticker);
            this.stickers.push(sti);
        });
    }
    Id() {
        return this.id;
    }
    Username() {
        return this.username;
    }
    Priority() {
        return this.priority;
    }
    Stickers() {
        return this.stickers;
    }
}
class Model {
    constructor() {
        this.cards = new Array();
    }
    static GetInstance() {
        if (Model.Instance == null)
            Model.Instance = new Model();
        return Model.Instance;
    }
    User() {
        return this.user;
    }
    Cards() {
        return this.cards;
    }
    /**
     * Retourne length cartes depuis startid
     */
    GetCardsBetween(startid, length) {
        return this.cards;
    }
    /**
     * Permet la connexion d'un user
     */
    login(username, password, callback) {
    }
    /**
     * Permet à l'utilisateur connecté de se déconnecter
     */
    logout(callback) {
    }
    /**
     * Permet a un utilisateur de  créer une compte sur la plateforme
     */
    register(username, password, callback) {
    }
    /**
     * Récupère lengths cartes à partir de l'id précisé
     */
    retrieveCards(startid, length, callback) {
    }
    /**
     * Récupère les informations sur une carte en particulier
     */
    retrieveCard(id, callback) {
    }
    /**
     * Récupère le profile d'une utilisateur
     */
    retrieveUser(id, callback) {
    }
    /**
     * Envoie une nouvelle carte au serveur
     */
    addCard(card, callback) {
    }
    /**
     * Permet de voter pour une carte
     */
    voteCard(card, upvote, callback) {
    }
    /**
     * Récupère un sticker depuis le serveur
     */
    retrieveSticker(id, callback) {
    }
}
/**
 * Représente un composant de l'interface
 */
class Component {
    constructor(args) {
        if (args.body == undefined)
            throw new Error("You must define a body to this component");
        this.body = args.body;
        this.classes = args.classes;
        this.mountable = false;
    }
    SetMountable() {
        this.mountable = true;
    }
    GetDOM() {
        return document.getElementById("component-" + this.id);
    }
    /**
     * Construit le composant dans la page
     */
    Mount(parent, opts) {
        if (this.mountable == false)
            throw new Error("You must set this component mountable (Call this.Add(theComponent) in the view's source code)");
        this.id = Component.IDS;
        Component.IDS = Component.IDS + 1;
        let par;
        if (parent == null)
            par = null;
        else if (parent.id == undefined)
            throw Error("Parent must be mount.");
        else
            par = "component-" + parent.id;
        this.Render(par, opts);
    }
    /**
     * Affiche le composant dans la page
     */
    Render(parent, opts) {
        let target;
        if (parent != null)
            target = document.getElementById(parent);
        else {
            if (View.RootID == null)
                target = document.body;
            else
                target = document.getElementById(View.RootID);
        }
        // remplacement des valeurs
        if (opts != null) {
            for (var key in opts) {
                let reg = new RegExp("{{" + key + "}}", "g");
                this.body = this.body.replace(reg, opts[key]);
            }
        }
        // Construction du DOM
        let dom = document.createElement("div");
        dom.id = "component-" + this.id;
        dom.className = this.constructor.name;
        if (this.classes != undefined)
            dom.className += " " + this.classes;
        dom.innerHTML = this.body;
        dom.addEventListener("click", (event) => { this.Click(event); });
        target.appendChild(dom);
    }
    AddClass(clas) {
        this.GetDOM().className = this.GetDOM().className + " " + clas;
    }
    /**
     * Gère l'action lors du click sur le composant
     */
    Click(ev) {
    }
}
Component.IDS = 0;
class ButtonComponent extends Component {
    constructor(text, callback) {
        super({
            body: "<input type='button' name='btn' value='{{text}}'>"
        });
        this.text = text;
        this.callback = callback;
    }
    Mount(parent) {
        let opts = {
            'text': this.text
        };
        super.Mount(parent, opts);
        let self = this;
        this.GetDOM().querySelector("input[name='btn']").addEventListener("click", () => { this.callback(); });
    }
}
class AddCardFormComponent extends Component {
    constructor() {
        super({
            body: "\
                <input type='text' name='title' placeholder='title'>\
                <input type='text' name='link' placeholder='Link'>\
                Or\
                <textarea placeholder='content' name='content'></textarea>\
                <input type='button' name='submit' value='Send this card'>\
                <input type='button' name='cancel' value='Cancel'>\
                "
        });
    }
    Send() {
        let title = this.GetDOM().querySelector("input[name='title']").value;
        let link = this.GetDOM().querySelector("input[name='link']").value;
        let content = this.GetDOM().querySelector("textarea[name='content']").value;
        console.log(title + ":" + link + ":" + content);
        //TODO: envoyer le formulaire 
    }
    Cancel() {
        App.GoTo(Link_Special.Default);
    }
    Mount(parent) {
        super.Mount(parent, null);
        this.GetDOM().querySelector("input[name='submit']").addEventListener("click", () => { this.Send(); });
        this.GetDOM().querySelector("input[name='cancel']").addEventListener("click", () => { this.Cancel(); });
    }
}
class RegisterFormComponent extends Component {
    constructor() {
        super({
            body: "\
                <input type='text' name='username' placeholder='Username'>\
                <input type='password' name='password' placeholder='Password'>\
                <input type='password' name='confirm-password' placeholder='Confirm Password'>\
                <input type='button' value='Login' name='submit'>\
            "
        });
    }
    Send() {
        let username = this.GetDOM().querySelector("input[name='username']").value;
        let password = this.GetDOM().querySelector("input[name='password']").value;
        let confirmPassword = this.GetDOM().querySelector("input[name='confirm-password']").value;
        if (password != confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        console.log(username + ":" + password);
        //TODO: envoyer le formulaire 
    }
    Mount(parent) {
        super.Mount(parent, null);
        let self = this;
        this.GetDOM().querySelector("input[name='submit']").addEventListener("click", () => { self.Send(); });
    }
}
class HeaderComponent extends Component {
    constructor(title) {
        super({
            body: "\
                <div>\
                    {{title}}\
                </div>\
                <input type='button' name='profile' value='profile'>\
                "
        });
        this.title = title;
    }
    Menu() {
        console.log("menu");
    }
    Profile() {
        console.log("profile");
        //App.GoTo("user")
    }
    Mount(parent) {
        super.Mount(parent, { title: this.title });
        this.GetDOM().querySelector("input[name='profile']").addEventListener("click", () => { this.Profile(); });
    }
}
class MenuComponent extends Component {
    constructor() {
        super({
            body: "\
                <img src='Assets/Logo.png'>\
                <input type='button' value='menu' name='menu'>\
                <div>\
                    <input type='button' value='Cards' name='cards'>\
                    <input type='button' value='Add a Card' name='add-card'>\
                </div>\
                <div>\
                    copyright\
                </div>\
            "
        });
    }
    Cards() {
        App.GoTo("cards");
    }
    AddCard() {
        App.GoTo("addcard");
    }
    Mount(parent) {
        super.Mount(parent, null);
        this.GetDOM().querySelector("input[name='cards']").addEventListener("click", () => { this.Cards(); });
        this.GetDOM().querySelector("input[name='add-card']").addEventListener("click", () => { this.AddCard(); });
    }
}
class StickerComponent extends Component {
    constructor(sticker) {
        super({
            body: "\
                <img src='{{logo}}'>\
                <div>\
                    {{title}}\
                </div>\
                <div>\
                    {{description}}\
                </div>\
                "
        });
        this.sticker = sticker;
    }
    Mount(parent) {
        let opts = {
            logo: this.sticker.Logo(),
            title: this.sticker.Title(),
            description: this.sticker.Description()
        };
        super.Mount(parent, opts);
    }
}
class LoginFormComponent extends Component {
    constructor() {
        super({
            body: "\
                <input type='text' name='username' placeholder='Username'>\
                <input type='password' name='password' placeholder='Password'>\
                <input type='button' value='Login' name='submit'>\
            "
        });
    }
    Send() {
        let username = this.GetDOM().querySelector("input[name='username']").value;
        let password = this.GetDOM().querySelector("input[name='password']").value;
        console.log(username + ":" + password);
        //TODO: envoyer le formulaire 
    }
    Mount(parent) {
        super.Mount(parent, null);
        let self = this;
        this.GetDOM().querySelector("input[name='submit']").addEventListener("click", () => { self.Send(); });
    }
}
class CardComponent extends Component {
    constructor(card) {
        super({
            body: "\
                <div>\
                    <input type='button' value='up' name='up'>\
                    <input type='button' value='down'name='down'>\
                </div>\
                <div>\
                    {{title}}\
                </div>\
                <div>\
                    {{content}}\
                </div>\
                <input type='button' value='Read more' name='read-more'>\
            ",
        });
        this.card = card;
    }
    Up() {
        console.log("up");
        Model.GetInstance().voteCard(this.card, true, null);
    }
    Down() {
        console.log("down");
        Model.GetInstance().voteCard(this.card, false, null);
    }
    ReadMore() {
        //TODO: expand (add class css)
        console.log("expand");
    }
    Mount(parent) {
        let opts = {
            title: this.card.Title,
            content: this.card.Description
        };
        super.Mount(parent, opts);
        this.GetDOM().querySelector("input[name='up']").addEventListener("click", () => { this.Up(); });
        this.GetDOM().querySelector("input[name='down']").addEventListener("click", () => { this.Down(); });
        this.GetDOM().querySelector("input[name='read-more']").addEventListener("click", () => { this.ReadMore(); });
    }
}
/**
 * Une vue est un element consituté d'un ensemble de composants permettant de présenter des informations à l'utilisateur
 */
class View {
    constructor() {
        this.components = new Array();
    }
    /**
     * Ajoute un composant à la vue
     */
    Add(component) {
        component.SetMountable();
        this.components.push(component);
        return component;
    }
    /**
     * Affiche la vue
     */
    Show() {
        if (View.RootID == null)
            document.body.innerHTML = "";
        else
            document.getElementById(View.RootID).innerHTML = "";
    }
    /**
     * Appelé lorsque l'on rentre dans la vue
     */
    Enter() {
    }
    /**
     * Appelé lorsque l'on quitte la vue
     */
    Leave() {
    }
}
/**
 * ID (#) de l'élement DOM sur lequel fixer la vue. Si RootID est null, la vue se fixe sur <body>.
 */
View.RootID = null;
class LoginView extends View {
    Show() {
        super.Show();
        let base = new Component({
            body: ""
        });
        this.Add(base).Mount(null, null);
        this.Add(new ButtonComponent("Login", null)).Mount(base);
        this.Add(new ButtonComponent("Register", () => {
            App.GoTo("register");
        })).Mount(base);
        this.Add(new LoginFormComponent()).Mount(base);
    }
}
class RegisterView extends View {
    Show() {
        super.Show();
        let base = new Component({
            body: ""
        });
        this.Add(base).Mount(null, null);
        this.Add(new ButtonComponent("Login", () => {
            App.GoTo("login");
        })).Mount(base);
        this.Add(new ButtonComponent("Register", null)).Mount(base);
        this.Add(new RegisterFormComponent()).Mount(base);
    }
}
class CardsView extends View {
    constructor() {
        super(...arguments);
        this.index = 0;
        this.length = 10;
    }
    LoadMore() {
        this.index = this.index + this.length;
        console.log("Loading " + this.index);
        let cards = Model.GetInstance().Cards().slice(this.index, this.index + this.length);
        cards.forEach((card) => {
            this.Add(new CardComponent(card)).Mount(this.cardsList);
        });
    }
    Show() {
        super.Show();
        let base = new Component({
            body: ""
        });
        this.Add(base).Mount(null, null);
        this.Add(new MenuComponent()).Mount(base);
        this.Add(new HeaderComponent("Cards")).Mount(base);
        this.cardsList = new Component({
            body: ""
        });
        this.Add(this.cardsList).Mount(base, null);
        let cards = Model.GetInstance().Cards().slice(this.index, this.index + this.length);
        cards.forEach((card) => {
            this.Add(new CardComponent(card)).Mount(this.cardsList);
        });
        this.Add(new ButtonComponent("Load More Cards", () => {
            this.LoadMore();
        })).Mount(base);
    }
}
class AddCardView extends View {
    Show() {
        let base = new Component({
            body: ""
        });
        this.Add(base).Mount(null, null);
        this.Add(new MenuComponent()).Mount(base);
        this.Add(new HeaderComponent("Add Card")).Mount(base);
        this.Add(new AddCardFormComponent()).Mount(base);
    }
}
class UserView extends View {
    constructor(user) {
        super();
        this.user = user;
    }
    Show() {
        let base = new Component({
            body: ""
        });
        this.Add(base).Mount(null, null);
        this.Add(new MenuComponent()).Mount(base);
        this.Add(new HeaderComponent("Profile")).Mount(base);
        this.Add(new Component({
            body: "<div>{{username}}</div>"
        })).Mount(base, { username: this.user.Username() });
        let stickerList = new Component({
            body: ""
        });
        this.Add(stickerList).Mount(base, null);
        this.user.Stickers().forEach((sticker) => {
            this.Add(new StickerComponent(sticker)).Mount(stickerList);
        });
    }
}
var Link_Special = {
    Default: null,
    Error_500: "ERROR_500",
    Error_404: "ERROR_404"
};
/**
 * Permet d'associer un lien et une méthode, permet de simuler un comportement d'affichage par page
 */
class Link {
    constructor(url, method) {
        this.url = url;
        this.method = method;
    }
}
/**
 * Permet de simuler un système d'affichage par page qui soit totalement transparent pour l'utilisateur
 * On lit un mot à une méthode.
 * Un url compatible doit être de la forme
 * http://blah.com/Index.html?page-par1-par2-par3-...-parn
 */
class Linker {
    constructor() {
        this.registry = new Array();
    }
    static GetInstance() {
        if (Linker.Instance == null)
            Linker.Instance = new Linker();
        return Linker.Instance;
    }
    /**
     * Ajoute un nouveau lien au système (et par la une page)
     */
    AddLink(url, method) {
        if (this.GetLink(url) != null)
            throw Error("Url must be unique.");
        let link = new Link(url, method);
        this.registry.push(link);
    }
    /**
     * Retourne l'objet Link associé à l'url demandée
     */
    GetLink(url) {
        for (let i = 0; i != this.registry.length; i++) {
            let e = this.registry[i];
            if (e.url == url) {
                return e;
            }
        }
        return null;
    }
    /**
     * Annalise l'url de la page courante pour déterminer d'éventuelles actions à réaliser
     */
    Analyze() {
        try {
            let url = window.location.toString().split("?")[1];
            let params = url.split("-");
            url = params.shift();
            this.GetLink(url).method(params);
        }
        catch (e) {
            console.log("Linker error, redirect to default");
            this.GetLink(Link_Special.Default).method(); // SI une erreur a eu lieu, on affiche la page par defaut
        }
    }
}
class App {
    static Main() {
        // Création des liens et des actions associées
        Linker.GetInstance().AddLink("login", () => {
            new LoginView().Show();
        });
        Linker.GetInstance().AddLink("register", () => {
            new RegisterView().Show();
        });
        Linker.GetInstance().AddLink("cards", () => {
            new CardsView().Show();
        });
        Linker.GetInstance().AddLink("addcard", () => {
            new AddCardView().Show();
        });
        Linker.GetInstance().AddLink(Link_Special.Default, () => {
            new CardsView().Show();
        });
        Linker.GetInstance().Analyze(); // Une fois qu'on a chargé la langue on analise l'URL
    }
    static GoTo(link) {
        window.location.replace("index.html?" + link);
    }
    static Error(e) {
        if (App.Debug) {
            console.log(e);
            return;
        }
        if (window.location.toString().endsWith(Link_Special.Error_500) == false)
            window.location.replace("Index.html?" + Link_Special.Error_500);
    }
    /**
     * Envoie des requetes Ajax GET
     */
    static Get(url, callback, error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            // TODO: récupérer le cookie session_id
            callback(xhttp.responseText.trim());
        };
        xhttp.onerror = function () {
            if (error != null)
                error();
        };
        // TODO: ajouter le cookie session_id 
        xhttp.open("GET", url, true);
        console.log("Processing " + url);
        xhttp.send();
    }
}
App.Debug = true;
App.EndPoint = "http://172.17.0.2/rest/api";
window.onload = App.Main;
//# sourceMappingURL=main.js.map