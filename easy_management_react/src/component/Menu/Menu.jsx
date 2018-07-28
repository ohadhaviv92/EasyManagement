import React, { Component } from 'react'
import './Menu.css'
import MenuIcon from './MenuIcon';


export default class Menu extends Component {

    state={
        open: false,
        activeClass: 'nav__container close'
    }

    Toggle = (btn_state) => {
        this.setState({open: btn_state , activeClass: btn_state ? 'nav__container open': 'nav__container close'});        
    }

    render() {
        return (
            <div>
               
                <nav className={this.state.activeClass}>
                    <div className='links__container'>
                        {this.props.children}
                    </div>
                 
                </nav>
                <MenuIcon Toggle={this.Toggle}/>
            </div>
            
        )
    }
}
