import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom';
import Groups from './components/groups/groups';
import Users from './components/users/users';
import Home from './components/home/home';
import UserManagement from './components/users/user_management/user_m';
import GroupManagement from './components/groups/group_managemnet/group_m';
import './App.css'

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" component={App}/>
                <Route path="/users" component={Users}/>
                <Route path="/groups" component={Groups}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/userManagement" component={UserManagement}/>
                <Route exact path="/groupManagement" component={GroupManagement}/>
            </div>
        </BrowserRouter>
    );
}
ReactDOM.render(
    <Root/>, document.getElementById('root'));
registerServiceWorker();
