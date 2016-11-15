export default class Localize {
    constructor(dependencies) {
        this._locResource = (dependencies || {})["localize.resource"];
    }

    localize(key) {
        try {
            const keyParts = key.split("/");
            const firstLevel = this._locResource[keyParts[0]];
            const secondLevel = (keyParts.length > 1 && firstLevel) ? firstLevel[keyParts[1]] : null;
            const thirdLevel = (keyParts.length > 2 && secondLevel) ? secondLevel[keyParts[2]] : null;
            return this._returnIfString(thirdLevel) ||
                this._returnIfString(secondLevel) ||
                this._returnIfString(firstLevel) ||
                this._removeSlashes(key);
        } catch (err) {
            console.error(`Localize: error localizing string ${key} for ${this._languageResource}`); // eslint-disable-line no-console
            return this._removeSlashes(key);
        }
    }

    _returnIfString(thing) {
        return typeof thing === "string" ? thing : null;
    }

    _removeSlashes(key) {
        return key.replace(/\//g, " ");
    }
}
