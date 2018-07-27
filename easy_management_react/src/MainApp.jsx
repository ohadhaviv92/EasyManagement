import React, { Component } from 'react'
import Logout from './component/Logout/Logout';
import Menu from './component/Menu/Menu';
import Home from './component/Home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom'


export default class MainApp extends Component {
    render() {
        return (
            <div>
                <Logout />
                <Router>
                   
                    <main>
                        <Menu />
                        <Route exact path="/app" component={Home} />
                    </main>
                </Router>
            </div>

        )
    }
}
