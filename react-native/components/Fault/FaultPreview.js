import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
class FaultPreivew extends Component {


  onSiteClick = async () => {
    console.log(this.props.fault);

  }

  render() {
    const { fault } = this.props;

    return (

      <View style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: fault.FaultStatus ? '#E74C3C' : '#3498DB'
      }}>
        <TouchableOpacity onPress={this.onSiteClick}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{ width: 100, height: 100 }} source={{ uri: 'https://via.placeholder.com/100x100' }} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.text}>{fault.FaultName}</Text>
              <Text style={styles.text}>{fault.Info}</Text>
              <Text style={styles.text}>סטטוס תקלה: {fault.FaultStatus ? 'פתוח' : 'סגור'}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Icon
          type="FontAwesome"
          name="edit"
          size={35}
          color="#2C3E50"
          underlayColor="transparent"
        />


      </View>
    )
  }
}

const styles = StyleSheet.create({

  text: {
    fontSize: 21,
    color: '#ECF0F1',
  }

})



export default FaultPreivew;
