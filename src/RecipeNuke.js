
const RN = {};
RN.database = {};
RN.database.recipes = [];
RN.database.tags = [];

RN.isBlankString = function(string) {
    return string == null || string.trim() === "";
}

RN.parseFloat = function(value) {
    value = parseFloat(value || "0");
    if (value === NaN || value === Infinity) {
        return 0.0;
    }
    return Math.max(value, 0.0);
}

RN.guid = function() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

RN.deepCopy = function(object) {
    return JSON.parse(JSON.stringify(object));
}

RN.areEqual = function(obj1, obj2) {
    return JSON.stringify(obj1 || "").localeCompare(JSON.stringify(obj2 || "")) === 0;
}

RN.rand = function(items) {
    return items[items.length * Math.random() | 0];
}

RN.getRecipe = function(name) {
    return RN.database.recipes.find(x => x.name == name);
}

RN.getRecipes = function(tags) {
    let recipes = [];
    for (let [i, rcp] of RN.database.recipes.entries()) {
        let valid = tags.every(tag => rcp.tags.includes(tag));
        if (valid) {
            recipes.push(rcp);
        }
    }
    return recipes;
}

// The most important function here
RN.load = function() {

    RN.database.recipes = [];
    RN.database.tags = [];

    const loadedRecipes = import.meta.glob('./recipes/*.json', {eager: true});

    for (const path in loadedRecipes) {
        
        let raw = atob(loadedRecipes[path].default.substring(29));
        let parsed = JSON.parse(raw);

        parsed.name = parsed.name.toUpperCase();
        parsed.description = parsed.description.toUpperCase();

        for (let [i, ing] of parsed.ingredients.entries()) {
            parsed.ingredients[i].name = ing.name.toUpperCase();
            parsed.ingredients[i].quantity = ing.quantity.toUpperCase();
        }

        for (let [i, s] of parsed.steps.entries()) {
            parsed.steps[i] = s.toUpperCase();
        }

        for (let [i, tag] of parsed.tags.entries()) {
            parsed.tags[i] = tag.toUpperCase();
            if (!RN.database.tags.includes(tag.toUpperCase())) {
                RN.database.tags.push(tag.toUpperCase());
            }
        }

        RN.database.recipes.push(parsed);

        console.log(`Loaded recipe at path: ${path}`);
    }
}

export default RN