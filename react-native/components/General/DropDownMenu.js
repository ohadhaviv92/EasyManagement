import React, { Component } from 'react'
import { Animated, View, Platform } from 'react-native'

export default class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeAnim: new Animated.Value(0.01),
      hidden: !this.props.isOpen,
    }

  }

  animate = (isOpen) => {    
    const toValue =  isOpen ? 99999 : 0.01;

    
    Animated.timing(
      this.state.sizeAnim,
      {
        toValue,
        duration: 250
      }
    ).start();

  }

  componentDidUpdate(pervProps) {    
    if(pervProps.isOpen != this.props.isOpen)
        this.animate(this.props.isOpen);
  }



  render() {

    const { sizeAnim } = this.state
    return (
      <Animated.View

        style={{
          maxHeight: sizeAnim
        }}
      >

        <View >
          {this.props.children}
         </View>

      </Animated.View>
    )
  }
}