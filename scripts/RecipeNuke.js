PN = {};

RN.database = {};
RN.database.recipes = {};

RN.database.currentRecipe = {};

RN.recipeType = {};
RN.recipeType.main = "MAIN";
RN.recipeType.side = "SIDE";
RN.recipeType.dessert = "DESSERT";

RN._jsonOutputLogic = function(key, value) {
    return (value == null || value === "" || value === NaN)
        ? undefined
        : value;
}

RN.getAllDataForExport = function() {
    const exportData = {recipes: []};
    for (let id in RN.database.recipes) {
        exportData.materials.push(RN.database.recipes[id]);
    }
    return JSON.stringify(exportData, RN._jsonOutputLogic, "\t");
}

RN.deleteLocalStore = function() {
    localStorage.removeItem("recipe_nuke_data");
}

RN.persistInLocalStore = function() {
    localStorage.setItem("recipe_nuke_data", RN.getAllDataForExport());
}

RN.sanitizeFloat = function(value, sigFigs) {
    return Math.round(parseFloat((value * Math.pow(10, sigFigs)).toFixed(sigFigs))) / Math.pow(10, sigFigs);
}

RN.setRecipe = function(recipe) {
    RN.database.recipes[recipe.id] = RN.deepCopy(recipe);
}

RN.getRecipe = function(id) {
    return RN.database.recipes[id];
}

RN.getAllSortedRecipeIDs = function() {
    return Object.keys(RN.database.recipes).sort();
}

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