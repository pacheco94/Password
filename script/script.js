module.exports = async function main(callback){
    try{

        const accounts = await web3.eth.getAccounts();
        console.log("Accounts",accounts);

        const Password = artifacts.require("Password");
        const instance = await Password.deployed();

        //geting first user
        console.log("First User",await instance.getUser(0));

        //getting the users list
        const users = await instance.getListUser();
        console.log("Users list", users);

        //user showing their data
        let data = await instance.Userdata(accounts[1],1, {from:accounts[1]});
        console.log = ("User owner data",data);
        callback(0);
    }catch(error){
        console.error("error deploying");
        callback(1);
    }
}