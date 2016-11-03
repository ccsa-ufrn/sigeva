var utils = require('../libs/utils.lib');

describe("GetFields", function() {

    it("should transform commas in spaces", function() {
        let a = 'a,b,c,d,e';

        expect(utils.getFields(a)).toBe('a b c d e');
    });

    it("should remove list of words", function() {
        let a = 'a,b,c,d,e';
        let list = ['b','d'];

        expect(utils.getFields(a, list)).toBe('a c e');
    });

});