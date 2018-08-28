import React from 'react'
import Logout from './component/Logout/Logout';
import Menu from './component/Menu/Menu';
import Home from './component/Home/Home';
import Profile from './component/Profile/Profile.jsx';
import { Route, NavLink } from 'react-router-dom';

import './MainApp.css';

const MainApp = ({ match }) => {

    return (
        <div>
            <Logout />

            <div>
                <Menu>
                    <NavLink to={`${match.path}`} >Home</NavLink>
                    <NavLink to={`${match.path}/profile`}>Profile</NavLink>
                </Menu>
            </div>

            <div className='container'>
                <Route exact path={`${match.path}`} component={Home} />
                <Route exact path={`${match.path}/profile`} component={Profile} />
            </div>


        </div>

    )

}
export default MainApp
