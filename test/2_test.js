const { expect } = require('chai');
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const Password = artifacts.require('Password');

contract("Password", function (accounts) {
    console.log("Accounts", accounts);
     
    beforeEach(async () => {
        this.instance = await Password.new({from:accounts[0]});
    });

    //User created event
    it("Should emit an event user created", async () => {
        const receipt = await this.instance.setUser("alberto","alberto@gmail.com", {from:accounts[0]});
        expectEvent(receipt,'UserCreated');
    });

    //testting userData function
    it("Should show data,only msg.sender and their id", async () => {
        const result = await this.instance.setUser("alberto","alberto@gmail.com", {from:accounts[0]});
        expect(result,await this.instance.UserData(accounts[0], 0, {from:accounts[0]}));
    });
    //a foreign address should not access the data of another address
    it("Should not have access to the data", async () => {
        await this.instance.setUser("alberto","alberto@gmail.com", {from:accounts[0]});
        await expectRevert.unspecified(this.instance.UserData(accounts[0],0, {from:accounts[1]}));
    });
});