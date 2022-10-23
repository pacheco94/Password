// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Password {
  
  uint256 newId; 

  //User struct
  struct User {
    uint256 id;
    string name;
    string gmail;
  }

  //array type User
  User[] listUsers;

  //mapping to link password wiht user
  mapping(uint256 => User) users;

  //mapping password
  mapping(address => mapping(uint => User)) datausers;

 //User created event
 event UserCreated(address user, uint256 id);

  //function aritmetic gas optimization
  function unsafe_inc(uint x) private pure returns (uint256) {
    unchecked {
      return x + 1;
    }
  }
  
  //Search user in the User list
  function Search(uint _value) internal view returns(uint256){
    //gas optimization
    User[] memory _newlist = listUsers;
     for(uint256 i = 0; i < _newlist.length; i = unsafe_inc(i)){
      if(_newlist[i].id == _value){
        return i;
      }
     }
     revert("User does not exist");
  }

  //create Users
  function setUser(string memory _name, string memory _gmail) public {
    //gas optization
    User[] memory _newlist = listUsers;
    uint256 counter;
    for(uint256 i = 0; i < _newlist.length; i = unsafe_inc(i)){
      require(keccak256(abi.encodePacked(_newlist[i].gmail)) != keccak256(abi.encodePacked(_gmail)), "User already exist!");
    }
      //saving users
      listUsers.push(User(newId, _name, _gmail));
      users[newId] = User(newId, _name, _gmail);
      datausers[msg.sender][newId] = User(newId, _name, _gmail);
      counter = newId;
      ++newId;
      
      emit UserCreated(msg.sender, newId);
  }
  
  //get user function
  function getUser(uint _id) public view returns(User memory){
    uint i = Search(_id);
    return users[i];
  }

  //get list of user,the user can see his generated id.
  function getListUser() public view returns(User[] memory){
    return listUsers;
  }

  //getting dataUser,the user can see his data using his address and his id
  function UserData(address _addrowner,uint256 _id) public view returns(User memory){
      require(msg.sender == _addrowner,"You are not authorized!");
      return datausers[_addrowner][_id];
  }

}
