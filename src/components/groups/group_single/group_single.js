import React, {Component} from 'react';

class Group extends Component {
  render() {
    let groupUsers = this
      .props
      .users
      .map((singleUser, index) => {
        return (
          <div>
            <li key={index}  className='flex-container flex-container--spacebetween'>
              {singleUser}
              <button onClick={() => this.props.deleteSingleUser(singleUser , this.props.name)} className='button-reset'>
                <span role="img" aria-label="Del Emoji">⛔️</span>
              </button>
            </li>
          </div>
        )
      })
    return (
      <div className='app-card'>
        <p>{this
            .props
            .name
            .toUpperCase()}</p>
        <ol>
          {groupUsers}
          {this.props.usersAvailable === 0 && <button className='button-reset btn-del' onClick={() => this.props.delete()}>
            <span role="img" aria-label="Robot Emoji">✂️</span>
          </button>
}
        </ol>
      </div>
    )
  }
}

export default Group;
