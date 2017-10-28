import React, {Component} from 'react';
import Group from './group_single/group_single';
import GroupManagement from './group_managemnet/group_m';
// import {Link} from 'react-router-dom';
import users from '../../users';
import groups from '../../groups';
class Groups extends Component {
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
    this.addNewGroup = this
      .addNewGroup
      .bind(this);
  }
  deleteSingleUser(userName, groupName)
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
  deleteGroup(index, name)
  {
    let updatedGroup = JSON.parse(localStorage.getItem('groups'));;
    let updatedUsers = JSON.parse(localStorage.getItem('users'));;
    updatedUsers.forEach((element) => {
      element
        .groups
        .forEach((innerEl, i) => {
          if (innerEl === name) {
            element
              .groups
              .splice(i, 1)
          }
        })
    });
    updatedGroup.splice(index, 1);
    this.setState({groups: updatedGroup});
    this.setState({users: updatedUsers});
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('groups', JSON.stringify(updatedGroup));

  }
  addNewGroup(e, GroupName, usersNames) {
    e.preventDefault();
    if (usersNames.length === 0) {
      alert('Well, this is awkward 😣 , but please add at least one user 🙏🏼');
      return false;
    }
    // let updatedGroups = this.state.groups;
    let updatedGroups = JSON.parse(localStorage.getItem('groups'));
    updatedGroups.push({name: GroupName.value, users: usersNames});
    this.setState({groups: updatedGroups});
    localStorage.setItem('groups', JSON.stringify(updatedGroups));

  }
  search(e)
  {
    let searchValue = e.target.value;
    if (searchValue === '') {
      this.setState({groups: groups});
    } else {
      let filteredGroups = this
        .state
        .groups
        .filter((group) => {
          return group
            .name
            .toLocaleLowerCase()
            .includes(searchValue);
        });
      this.setState({groups: filteredGroups});
    }

  }
  render() {
    let groupsArray = this
      .state
      .groups
      .map((group, index) => {
        return (<Group
          delete={() => this.deleteGroup(index, group.name)}
          deleteSingleUser={(userName) => this.deleteSingleUser(userName, group.name)}
          key={index}
          name={group.name}
          users={group.users}
          usersAvailable={group.users.length}/>)
      });
    return (
      <div className='component-container'>
        <input
          className='search-input search-input--big'
          onChange={(e) => this.search(e)}
          type="text"
          placeholder='Search here for a group...'
          name=""
          id=""/>
        <h1>All Groups</h1>
        <div className='flex-container '>
          {groupsArray}
        </div>
        <hr/>
        <GroupManagement users={this.state.users} addNewGroup={this.addNewGroup}/>
      </div>
    )
  }

}
export default Groups;
