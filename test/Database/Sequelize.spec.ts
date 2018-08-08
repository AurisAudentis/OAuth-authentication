import {assert} from "chai";
import {sequelize} from "../../src/Database/Sequelize";


describe('Sequelize instance', () => {
    it('should return a sequelize instance', () => {
        assert.isObject(sequelize);
    });

    it("should be able to authenticate", (done) => {
       sequelize.authenticate()
           .then(() => done())
           .catch((err) => {assert.notExists(err); done()})
    });
});