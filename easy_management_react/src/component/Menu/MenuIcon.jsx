import React, { Component } from 'react'
import './MenuIcon.css'
export default class Menu extends Component {

    state = {
        open: false,
        activeClass: 'hamburglar is-closed'
    }


    toggleMenu = () => {
      this.setState((pervState)=>{
        return pervState.open ? {open: false, activeClass: 'hamburglar is-closed'} : {open: true, activeClass: 'hamburglar is-open'}
      },()=> this.props.Toggle(this.state.open))
    }

    render() {
        return (


            <div id="hamburger" className={this.state.activeClass} onClick={this.toggleMenu}>

                <div className="burger-icon">
                    <div className="burger-container">
                        <span className="burger-bun-top"></span>
                        <span className="burger-filling"></span>
                        <span className="burger-bun-bot"></span>
                    </div>
                </div>
                <div className="burger-ring">
                    <svg className="svg-ring">
                        <path className="path" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4" d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2" />
                    </svg>
                </div>


                <svg width="0" height="0">
                    <mask id="mask">
                        <path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" strokeMiterlimit="10" strokeWidth="4" d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4" />
                    </mask>
                </svg>
                <div className="path-burger">
                    <div className="animate-path">
                        <div className="path-rotation"></div>
                    </div>
                </div>

            </div>

        )
    }
}
