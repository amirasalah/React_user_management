import React, {Component} from 'react';

class Home extends Component {
  render() {
    return (
      <div className='component-container component-container--home'>
        <h1 className='app-header'>
          <b>Well</b>
          , Manage your <span role="img" aria-label="Robot Emoji">
            👩🏽👱🏾👷🏽</span>
          <br/>
          <br/>
          use the navigation above
          <br/>
          <span role="img" aria-label="Robot Emoji">
            🔝🔝🔝🔝</span>
        </h1>
      </div>
    )
  }
}

export default Home;
