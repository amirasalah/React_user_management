import React, {Component} from 'react';

class User extends Component {
  render() {
    let userGroups = this
      .props
      .groups
      .map((singleGroup, index) => {
        return <li key={index} className='flex-container flex-container--spacebetween'> 
          {singleGroup}
          <button onClick={() => this.props.deleteSingleGroup(singleGroup , this.props.name)} className='button-reset'>
            <span role="img" aria-label="Del Emoji"> ⛔️</span> 
          </button>
        </li>
      })
    return (

      <div className='app-card'>
        <p>{this
            .props
            .name
            .toUpperCase()}</p>
        <ol>
          {userGroups}
          <button className='button-reset btn-del' onClick={() => this.props.delete()}>
            <span role="img" aria-label="Robot Emoji">✂️</span>
          </button>
        </ol>
      </div>
    )
  }
}

export default User;
