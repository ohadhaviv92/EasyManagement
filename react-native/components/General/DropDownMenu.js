import React, { Component } from 'react'
import { Animated, View, Platform } from 'react-native'

export default class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeAnim: new Animated.Value(0.01),
      hidden: !this.props.isOpen,
    }
    this.maxHeight;
  }

  animate = (isOpen) => {    
    const toValue =  isOpen ? this.maxHeight : 0.01;
    Animated.timing(
      this.state.sizeAnim,
      {
        toValue,
        duration: 250,
      }
    ).start();

  }

  componentDidUpdate(pervProps) {
    if (pervProps.isOpen != this.props.isOpen)
      this.animate(this.props.isOpen)
  }

  componentDidMount() {
    this.state.sizeAnim.addListener((event) => {
      if (event.value == 0.01)
        this.setState({ hidden: true })
      else if (event.value == this.maxHeight)
        this.setState({ hidden: false })
    })
  }


  render() {
    const { sizeAnim } = this.state

    return (
      <Animated.View

        style={{
          overflow: 'hidden',
          height: sizeAnim
        }}
      >

        <View onLayout={(event) => {this.maxHeight = event.nativeEvent.layout.height }}>
          {this.props.children}
         </View>

      </Animated.View>
    )
  }
}