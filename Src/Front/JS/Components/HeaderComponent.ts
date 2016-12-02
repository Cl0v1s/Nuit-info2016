class HeaderComponent extends Component
{
    private title : string; 

    constructor(title : string)
    {
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


    public Profile() : void 
    {
        new UserView(Model.GetInstance().User()).Show();
    }

    public Mount(parent : Component) : void
    {
        super.Mount(parent, {title : this.title});
        this.GetDOM().querySelector("input[name='profile']").addEventListener("click", () => {this.Profile();} );

    }
}