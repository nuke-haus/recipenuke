
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

// The most important function here
RN.load = function() {

    RN.database.recipes = [];
    RN.database.tags = [];

    const loadedRecipes = import.meta.glob('./recipes/*.json', {eager: true});

    for (const path in loadedRecipes) {
        console.log(`Loaded file: ${path}`);
        loadedRecipes[path]().then((obj) => {
            console.log(path, obj);
            let parsed = JSON.parse(content);
            console.log(path, parsed);
        });
    }
}

export default RN