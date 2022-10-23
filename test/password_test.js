
const Password = artifacts.require("Password");
const { expect } = require("chai");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("password_test", function (accounts) {
  console.log("Accounts", accounts);
  it("should assert true", async function () {
    const instance = await Password.deployed();
    return assert.isTrue(true);
  });

// create User
    it("Shold create User", async function () {
      const instance = await Password.deployed();
      let _user0 = await instance.setUser.call("george","george@gmail.com");
      expect(_user0, await instance.setUser.call("george","george@gmail.com"), "Same User");

    });

    //get User
    it("Should get User", async function () {
        const instance = await Password.deployed();

        let result = await instance.setUser("george","george@gmail.com",{from:accounts[0]});
        let user = await instance.getUser(0);
        expect(user,result);
    });

    //getting the users list
    it("Should get users list", async function () {
      const instance = await Password.deployed();
      await instance.getListUser();

    });
});
