import React, {Component} from 'react';
import User from './user_single/user_single';
import UserManagement from './user_management/user_m';
// import {Link} from 'react-router-dom';
import users from '../../users';
import groups from '../../groups';

class Users extends Component {

  constructor() {
    super();
    //Check if first time to load state in local storage
    if (localStorage.getItem("users") === null || localStorage.getItem("groups") === null) {
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('groups', JSON.stringify(groups));
      this.state = {
        users: users,
        groups: groups
      }
    } else {
      this.state = {
        users: JSON.parse(localStorage.getItem('users')),
        groups: JSON.parse(localStorage.getItem('groups'))
      }
    }

    this.addNewUser = this
      .addNewUser
      .bind(this);

  }
  deleteSingleGroup(groupName, userName)
  {
    let updatedUsers = JSON.parse(localStorage.getItem('users'));
    let updatedGroups = JSON.parse(localStorage.getItem('groups'));

    updatedUsers.forEach((element) => {
      if(element.name === userName)
      {
        element.groups.forEach((innerEl , i) =>{
          if(innerEl === groupName){
            element.groups.splice(i , 1);
          }
        })
      }
    });
    updatedGroups.forEach((element2) => {
      if(element2.name === groupName)
      {
        element2.users.forEach((innerEl2 , i2) =>{
          if(innerEl2 === userName){
            element2.users.splice(i2 , 1);
          }
        })
      }
    });
    this.setState({users: updatedUsers});
    this.setState({groups: updatedGroups});
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  }
  deleteUser(index, name)
  {
    let updatedUsers = JSON.parse(localStorage.getItem('users'));
    let updatedGroups = JSON.parse(localStorage.getItem('groups'));
    updatedGroups.forEach((element) => {
      element
        .users
        .forEach((innerEl, i) => {
          if (innerEl === name) {
            element
              .users
              .splice(i, 1)
          }
        })
    });
    updatedUsers.splice(index, 1);
    this.setState({users: updatedUsers});
    this.setState({groups: updatedGroups});
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  }
  addNewUser(e, name, groupsNames) {
    e.preventDefault();
    if (groupsNames.length === 0) {
      alert('Well, this is awkward 😣 , but please join at least one group 🙏🏼');
      return false;
    }
    // let updatedUsers = this.state.users;
    let updatedUsers = JSON.parse(localStorage.getItem('users'));
    updatedUsers.push({name: name.value, groups: groupsNames});
    this.setState({users: updatedUsers});
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }
  search(e)
  {
    let searchValue = e.target.value;
    if (searchValue === '') {
      this.setState({users: users});
    } else {
      let filteredUsers = this
        .state
        .users
        .filter((user) => {
          return user
            .name
            .toLocaleLowerCase()
            .includes(searchValue);
        });
      this.setState({users: filteredUsers});
    }

  }
  render() {
    let usersArray = this
      .state
      .users
      .map((user, index) => {
        return (<User
          delete={() => this.deleteUser(index, user.name)}
          deleteSingleGroup=
          {(groupName) => this.deleteSingleGroup(groupName , user.name)}
          key={index}
          name={user.name}
          groups={user.groups}/>)
      });
    return (
      <div className='component-container'>
        <input
          className='search-input search-input--big'
          onChange={(e) => this.search(e)}
          type="text"
          placeholder='Search here for a user...'
          name=""
          id=""/>
        <h1>All Users</h1>
        <div className='flex-container'>
          {usersArray}
        </div>
        <hr/>
        <UserManagement groups={this.state.groups} addNewUser={this.addNewUser}/>
      </div>
    )
  }

}
export default Users;
