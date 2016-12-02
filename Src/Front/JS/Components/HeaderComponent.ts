class HeaderComponent extends Component
{
    private title : string; 

    constructor(title : string)
    {
        super({
            body: "\
                <input type='button' name='menu' value='menu'>\
                <div>\
                    {{title}}\
                </div>\
                <input type='button' name='profile' value='profile'>\
                "
        });
        this.title = title;
    }


    public Menu() : void 
    {
        console.log("menu");
    }

    public Profile() : void 
    {
        console.log("profile");
        //App.GoTo("user")
    }

    public Mount(parent : Component) : void
    {
        super.Mount(parent, {title : this.title});
        this.GetDOM().querySelector("input[name='menu']").addEventListener("click", () => {this.Menu();} );
        this.GetDOM().querySelector("input[name='profile']").addEventListener("click", () => {this.Profile();} );

    }
}