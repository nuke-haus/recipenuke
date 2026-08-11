import React from 'react';
import RN from './RecipeNuke.js'

class Page extends React.Component {

    state = {
        text: "",
        selectedTags: [],
        recipe: null
    };

    constructor(props) {
        super(props);

        console.log("Loading data...");
        RN.load();
        console.log("Loaded all data");
    }

    _onClickTag(tag) {
        if (this.state.selectedTags.includes(tag)) {
            let idx = this.state.selectedTags.indexOf(tag);
            let tags = this.state.selectedTags;
            tags.splice(idx, 1);
            this.setState({selectedTags: tags});
        }
        else {
            let arr = this.state.selectedTags;
            arr.push(tag);
            this.setState({selectedTags: arr});
        }
    }

    _onClickRecipe(rcp) {
        this.setState({recipe: rcp});
    }

    _onRandomize() {
        if (this.state.selectedTags.length > 0) {
            let recipes = RN.getRecipes(this.state.selectedTags);
            let rcp = RN.rand(recipes);
            this.setState({recipe: rcp});
        }
        else {
            let rcp = RN.rand(RN.database.recipes);
            this.setState({recipe: rcp});
        }
    }

    _onChangeText(str) {
        let upper = str.toUpperCase();
        this.setState({text: upper, recipe: RN.getRecipe(upper)});
    }

    _renderTable() {
        if (this.state.selectedTags.length > 0) {
            let recipes = RN.getRecipes(this.state.selectedTags);
            let tbl = [];
            for (let [i, recipe] of recipes) {
                tbl.push(
                    <div className="tagselected" onClick={(event) => this._onClickRecipe(recipe)}>
                        {tag}
                    </div>
                );
            }
            return tbl;
        }
        else {
            return null;
        }
    }

    _renderRecipe() {
        if (this.state.recipe != null) {
            return (
                <>
                    <div>{this.state.recipe.name}</div>
                    <div>{this.state.recipe.description}</div>
                </>
            );
        }
        else {
            return null;
        }
    }

    _renderTextBox() {
        let elements = [];
        for (let [i, recipe] of RN.database.recipes.entries()) {
            if (recipe.name.includes(this.state.text)) {
                elements.push(<option key={"recipe" + i} value={recipe.name}/>);
            }
        }
        return (
            <div>
                <datalist id="textbox">
                    {elements}
                </datalist>
                <input className="databaseinput" 
                    list="textbox"
                    placeholder="TYPE A RECIPE NAME"
                    onChange={(event) => this._onChangeText(event.target.value)}/>
                <button className="" onClick={(event) => this._onRandomize()}>🔄🤪 RANDOMIZE ME</button>
            </div>
        )
    }

    _getClass(tag) {
        return this.state.selectedTags.includes(tag) ? "tagselected" : "tag";
    }

    _renderTags() {
        let tags = [];
        for (let [i, tag] of RN.database.tags.entries()) {
            tags.push(
                <div className={this._getClass(tag)} onClick={(event) => this._onClickTag(tag)}>
                    {tag}
                </div>
            );
        }
        return tags;
    }

    render() {
        return (
            <div>
                <div className="center">
                    CLICK SOME TAGS OR TYPE IN A RECIPE NAME OR SLAM THE RANDOMIZE BUTTON
                </div>
                <div className="center">
                    {this._renderTextBox()}
                </div>
                <div className="center">
                    {this._renderTags()}
                </div>
                <div className="center">
                    {this._renderTable()}
                </div>
                <div className="center">
                    {this._renderRecipe()}
                </div>
            </div>
        );
    }
}

export default Page