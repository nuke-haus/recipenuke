class Page extends React.Component {

    NAV_RECIPE = "RECIPES";
    NAV_DATABASE = "DATABASE";

    state = {
        currentNav: "DATABASE"
    };

    RECIPE_NAMES = [
        "WE NEED TO COOK",
        "IT'S COOKIN' TIME",
        "GET YOUR COOK ON"
    ]

    constructor(props) {
        super(props);

        const randomName = RECIPE_NAMES[Math.floor(Math.random() * RECIPE_NAMES.length)];
        this.NAV_RECIPE = randomName;

        const locallyStoredData = localStorage.getItem('recipe_nuke_data');
        if (locallyStoredData == null) {
            fetch('data/recipes.json')
                .then(response => response.json())
                .then(data => RN.validateLoadedRecipes(data.recipes));
        } else {
            // Locally stored persistent data exists, so parse that and validate it instead
            const parsedData = JSON.parse(locallyStoredData);
            RN.validateLoadedRecipes(parsedData.recipes);
        }
    }

    _getClassName(tabName) {
        return (this.state.currentNav === tabName) 
            ? "selectednav"
            : "";
    }

    _onNavClick(id) {
        this.setState({currentNav: id});
    }

    render() {
        const header = (
            <div>
                <div className="navbar">
                    <div className="topbutton" onClick={() => this._onNavClick(this.NAV_RECIPE)}>
                        <span className={this._getClassName(this.NAV_RECIPE)}>{this.NAV_RECIPE}</span>
                    </div>
                    <div className="topbutton" onClick={() => this._onNavClick(this.NAV_DATABASE)}>
                        <span className={this._getClassName(this.NAV_DATABASE)}>{this.NAV_DATABASE}</span>
                    </div>
                </div>
                <div className="bar">
                </div>
                <div className="barshadow">
                </div>
            </div>
        );

        if (this.state.currentNav == this.NAV_RECIPE) { 
            return (<div>
                {header}
                <RecipeBody/>
            </div>);
        } else if (this.state.currentNav == this.NAV_DATABASE) { 
            return (<div>
                {header}
                <DatabaseBody/>
            </div>);
        }

        return null;
    }
}