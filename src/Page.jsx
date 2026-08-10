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
                <div className="navbar">
                    <div className="topbutton" onClick={() => this._onNavClick(this.NAV_CLOCK)}>
                        <span className={this._getClassName(this.NAV_CLOCK)}>{this.NAV_CLOCK}</span>
                    </div>
                    <div className="topbutton" onClick={() => this._onNavClick(this.NAV_DATABASE)}>
                        <span className={this._getClassName(this.NAV_DATABASE)}>{this.NAV_DATABASE}</span>
                    </div>
                    <div className="topbutton" onClick={() => this._onNavClick(this.NAV_CALENDAR)}>
                        <span className={this._getClassName(this.NAV_CALENDAR)}>{this.NAV_CALENDAR}</span>
                    </div>
                    <div className="topbutton" onClick={() => this._onNavClick(this.NAV_REPORTS)}>
                        <span className={this._getClassName(this.NAV_REPORTS)}>{this.NAV_REPORTS}</span>
                    </div>
                </div>
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