import React, {Component} from 'react';

class GroupManagement extends Component {
  constructor() {
    super();
    this.selectedUserNames = [];
  }
  selectUser(input)
  {
    if (input.target.checked) {
      this
        .selectedUserNames
        .push(input.target.value);
    } else {
      this
        .selectedUserNames
        .splice(this.selectedUserNames.indexOf(input.target.value), 1);
    }
  }
  render() {
    let allUsers = this
      .props
      .users
      .map((singleUser, index) => {
        return (
          <label key={index} htmlFor={singleUser.name}>
            <input
              ref={(input) => {
              this.userName = input
            }}
              type="checkbox"
              onChange={(input) => this.selectUser(input)}
              id={singleUser.name}
              value={singleUser.name}/> {singleUser.name}
          </label>
        )
      })
    return (
      <form
        className='add-card app-card flex-container flex-container--top--bottom'
        onSubmit={(e) => this.props.addNewGroup(e, this.groupName, this.selectedUserNames)}>
        <h3>Add New Group:</h3>
        <input
          className='search-input search-input--small'
          required
          ref={(input) => {
          this.groupName = input;
        }}
          type="text"
          placeholder="Group Name"/>
        <br/>
        <h4>Available users:</h4>
        {allUsers}
        <br/>
        <button className='btn-submit' type='submit'>Add</button>
      </form>
    )
  }
}
export default GroupManagement;