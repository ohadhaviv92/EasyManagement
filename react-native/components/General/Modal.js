import React, { Component } from 'react'
import { View, Modal, StyleSheet, Dimensions } from 'react-native'
import {Icon} from 'react-native-elements'

export default class MyModal extends Component {

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={()=>null}
         >
          <View style={styles.container}>
            <Icon
              type="ionicon"
              name="ios-close-circle-outline"
              size={50}
              color="#ECF0F1"
              underlayColor="transparent"
              onPress={ () => this.props.Toggle()}
            />
            {this.props.children}
          </View>
        </Modal>

    )
  }
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container:{
        width,
        height,
        backgroundColor: '#2C3E50'
    }

})