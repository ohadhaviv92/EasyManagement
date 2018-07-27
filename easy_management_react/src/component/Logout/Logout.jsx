import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import './Logout.css';

 class Logout extends Component {

state={
    animating: false,
    activeClass: 'app__logout'
}


onLogout = () => {
    if (this.state.animating) return;
  
    this.setState({activeClass:'app__logout clicked',animating: true});

    setTimeout( ()=> {
        this.setState({activeClass:'app__logout',animating: false});
        this.props.history.replace('/');
    }, 1200);
}

  render() {
    return (
        
        <div className={this.state.activeClass} onClick={this.onLogout}>
        <svg className="app__logout-icon svg-icon" viewBox="0 0 20 20">
          <path d="M6,3 a8,8 0 1,0 8,0 M10,0 10,12"/>
        </svg>
      </div>
    )
  }
}

export default withRouter(Logout);