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
        if (this.state.recipe != null && this.state.recipe.name == rcp.name) {
            this.setState({recipe: null});
        }
        else {
            this.setState({recipe: rcp});
        }
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

    _renderRecipeButtons() {
        if (this.state.selectedTags.length > 0) {
            let recipes = RN.getRecipes(this.state.selectedTags);
            let tbl = [];
            for (let [i, recipe] of recipes.entries()) {
                tbl.push(
                    <div className="tagselected" onClick={(event) => this._onClickRecipe(recipe)}>
                        {"🍽️ " + recipe.name}
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

            let ingredients = [];
            let steps = [];

            ingredients.push(
                <tr>
                    <th>
                        INGREDIENT
                    </th>
                    <th>
                        AMOUNT
                    </th>
                </tr>
            );

            for (let [i, item] of this.state.recipe.ingredients.entries()) {
                ingredients.push(
                    <tr>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.quantity}
                        </td>
                    </tr>
                );
            }

            for (let [i, item] of this.state.recipe.steps.entries()) {
                steps.push(
                    <tr>
                        <td>
                            {(i + 1) + "."}
                        </td>
                        <td>
                            {item}
                        </td>
                    </tr>
                );
            }

            return (
                <>
                    <span className="recipetitle">{this.state.recipe.name}</span>
                    <br/>
                    <br/>
                    <span>{this.state.recipe.description}</span>
                    <br/>
                    <br/>
                    <br/>
                    <table className="centertable">
                        <tbody>
                            {ingredients}
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    <span>STEPS:</span>
                    <br/>
                    <table className="centertable">
                        <tbody>
                            {steps}
                        </tbody>
                    </table>
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

        let recipes = null;
        if (this.state.selectedTags.length > 0) {
            recipes = (
                <div className="container">
                    {this._renderRecipeButtons()}
                </div>
            );
        }
        
        let recipe = null;
        if (this.state.recipe != null) {
            recipe = (
                <div className="recipecontainer">
                    {this._renderRecipe()}
                </div>
            );
        }

        return (
            <div>
                <div className="center">
                    CLICK SOME TAGS OR TYPE IN A RECIPE NAME OR SLAM THE RANDOMIZE BUTTON
                </div>
                <div className="center">
                    {this._renderTextBox()}
                </div>
                <div className="container">
                    {this._renderTags()}
                </div>
                {recipes}
                {recipe}
            </div>
        );
    }
}

export default Page