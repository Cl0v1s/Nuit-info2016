class StickerComponent extends Component
{
    private sticker : Sticker;

    constructor(sticker : Sticker)
    {
        super({
            body : "\
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

    public Mount(parent : Component) : void
    {
        let opts : any = {
            logo : this.sticker.Logo(), 
            title : this.sticker.Title(), 
            description : this.sticker.Description()
        };
        super.Mount(parent, opts);
    }
}