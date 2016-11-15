import Localize from "../src/Localize";

describe("Localize", function() {
    beforeEach(() => {
        this.locResource = {
            firstLevelString: "I am zero level string!",
            secondLevel: {
                string1: "I am first level string!",
                string2: "I am another first level string!",
                thirdLevel: {
                    string3: "I am second level string!",
                    string4: "I am another second level string!"
                }
            },
        };
        this.dependencies = {
            "localize.resource": this.locResource
        };
        this.localize = new Localize(this.dependencies);
    });

    it("implements interface", () => {
        this.localize.should.respondTo("localize");
    });

    describe("Localizing existing first level string", () => {
        beforeEach(() => {
            this.locResult = this.localize.localize("firstLevelString");
        });
        it("returns the correct first level string", () => {
            this.locResult.should.equal(this.locResource.firstLevelString);
        });
    });

    describe("Localizing non-existing first level string", () => {
        beforeEach(() => {
            this.locResult = this.localize.localize("firstLevelStringWrong");
        });
        it("returns the key", () => {
            this.locResult.should.equal("firstLevelStringWrong");
        });
    });

    describe("Localizing existing second level strings", () => {
        beforeEach(() => {
            this.locResult1 = this.localize.localize("secondLevel/string1");
            this.locResult2 = this.localize.localize("secondLevel/string2");
        });
        it("returns the correct second level stringz", () => {
            this.locResult1.should.equal(this.locResource.secondLevel.string1);
            this.locResult2.should.equal(this.locResource.secondLevel.string2);
        });
    });

    describe("Localizing non existing second level string", () => {
        beforeEach(() => {
            this.locResult = this.localize.localize("secondLevel/stringWrong");
        });
        it("returns the correct second level stringz", () => {
            this.locResult.should.equal("secondLevel stringWrong");
        });
    });

    describe("Localizing existing third level strings", () => {
        beforeEach(() => {
            this.locResult1 = this.localize.localize("secondLevel/thirdLevel/string3");
            this.locResult2 = this.localize.localize("secondLevel/thirdLevel/string4");
        });
        it("returns the correct third level stringz", () => {
            this.locResult1.should.equal(this.locResource.secondLevel.thirdLevel.string3);
            this.locResult2.should.equal(this.locResource.secondLevel.thirdLevel.string4);
        });
    });

    describe("Localizing non existing third level strings", () => {
        beforeEach(() => {
            this.locResult1 = this.localize.localize("secondLevel/thirdLevel/string3Wrong");
            this.locResult2 = this.localize.localize("secondLevel/thirdLevelWrong/string4");
            this.locResult3 = this.localize.localize("secondLevelwrong/thirdLevel/string4");
        });
        it("returns the correct third level stringz", () => {
            this.locResult1.should.equal("secondLevel thirdLevel string3Wrong");
            this.locResult2.should.equal("secondLevel thirdLevelWrong string4");
            this.locResult3.should.equal("secondLevelwrong thirdLevel string4");
        });
    });

    describe("Localizing a string with no valid loc resource", () => {
        beforeEach(() => {
            this.localize = new Localize(null);
            this.locResult = this.localize.localize("what/ever");
        });
        it("returns the key", () => {
            this.locResult.should.equal("what ever");
        });
    });
});
