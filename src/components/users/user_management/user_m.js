import React, {Component} from 'react';

class UserManagement extends Component {
  constructor() {
    super();
    this.selectedGroupNames = [];
  }
  selectGroup(input)
  {
    if (input.target.checked) {
      this
        .selectedGroupNames
        .push(input.target.value);
    } else {
      this
        .selectedGroupNames
        .splice(this.selectedGroupNames.indexOf(input.target.value), 1);
    }
  }
  render() {
    let allGroups = this
      .props
      .groups
      .map((singleGroup, index) => {
        return (
          <label key={index} htmlFor={singleGroup.name}>
            <input
              ref={(input) => {
              this.groupName = input
            }}
              type="checkbox"
              onChange={(input) => this.selectGroup(input)}
              id={singleGroup.name}
              value={singleGroup.name}/> {singleGroup.name}
          </label>
        )
      })
    return (
      <form
        className='add-card app-card flex-container flex-container--top--bottom'
        onSubmit={(e) => this.props.addNewUser(e, this.userName, this.selectedGroupNames)}>
        <h3>Add New User:</h3>
        <input
          className='search-input search-input--small'
          required
          ref={(input) => {
          this.userName = input;
        }}
          type="text"
          placeholder="User Name"/>
        <br/>
        <h4>Available Groups:</h4>
        {allGroups}
        <br/>
        <button type='submit' className='btn-submit'>Add</button>
      </form>
    )
  }
}

export default UserManagement;
