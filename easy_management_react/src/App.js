import React, { Component } from 'react';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import MainApp from './MainApp';
import {Route} from 'react-router-dom';

import './App.css';


class App extends Component {


  render() {
    return (
      <div className="cont">
        <div className='tint'> 
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path='/app' component={MainApp} />
        </div>  
      </div>
    );
  }
}

export default App;
