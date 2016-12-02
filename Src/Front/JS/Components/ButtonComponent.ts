class ButtonComponent extends Component
{

    private text : string;
    private callback : Function;

    constructor(text : string, callback : Function)
    {
        super(
            {
                body : "<input type='button' name='btn' value='{{text}}'>"
            }
        );
        this.text = text;
        this.callback = callback;
    }

    public Mount(parent : Component) : void
    {
        let opts = {
            'text' : this.text
        };
        super.Mount(parent, opts);
        let self : ButtonComponent = this;
        this.GetDOM().querySelector("input[name='btn']").addEventListener("click", () => { this.callback();});
    }
}