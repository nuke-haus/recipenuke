import React from 'react';
import RN from './RecipeNuke.js'

class Page extends React.Component {

    state = {
        selectedTags: []
    };

    constructor(props) {
        super(props);

        console.log("Loading data...");
        RN.load();
        console.log("Loaded all data");
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
                hello
            </div>
        );

        return (
            <div>
                {header}
            </div>
        );
    }
}

export default Page