import React, { Component } from 'react'
import { Animated, View } from 'react-native'

export default class DropDownMenu extends Component {
  state = {
    sizeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }
  animate = (isOpen) => {
    console.log(isOpen);
    
    const toValue = isOpen == true ? 100 : 0;
    Animated.timing(                  // Animate over time
      this.state.sizeAnim,            // The animated value to drive
      {
        toValue,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();

  }

  componentDidUpdate(){
    this.animate(this.props.isOpen)
  }

  render() {
    const {sizeAnim} = this.state
    return (
      <Animated.View                 // Special animatable View
        style={{
          height: sizeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}