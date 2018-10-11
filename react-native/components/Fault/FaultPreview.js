import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import { Text, View, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native'
import DropDownMenu from '../General/DropDownMenu';
class FaultPreivew extends Component {

  state = {
    open: false,
    openDate: ''
  }

  onSiteClick = async () => {
    console.log(this.props.fault);

  }

  toggle = () => {
    this.setState((pervState) => ({ open: !pervState.open }));
  }

  componentDidMount() {
    const openDate = new Date(parseInt(this.props.fault.OpenDate.substr(6), 10)).toLocaleDateString();
    console.log(openDate);
    this.setState({ openDate })

  }

  render() {
    const { fault } = this.props;

    return (
      <View >
        <TouchableOpacity onPress={this.toggle}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: fault.FalutStatus ? "#3498DB" : "#E74C3C"
          }}>

            <View style={{ flex: 1 }}>
              {(fault.FaultPictures == null || fault.FaultPictures.length == 0) ?
                <Icon
                  type='font-awesome'
                  name='wrench'
                  size={40}
                  color="#ECF0F1"
                  underlayColor="transparent"
                  onPress={this.toggle}
                />
                :
                <Image
                  source={{ uri: fault.FaultPictures[0] }}
                  style={styles.img}
                />
              }
            </View>

            <View style={{ flex: 2, flexDirection: 'row' }}>
              <View style={{flex:1,alignItems:'flex-start'}}>
                <Text style={styles.text}>{fault.FaultName}</Text>
                </View>
                <View style={{flex:2,alignItems:'flex-end'}}>
                <Text style={styles.text}>{this.state.openDate}</Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Icon
                type="ionicon"
                name={this.state.open ? 'ios-arrow-up' : 'ios-arrow-down'}
                size={40}
                color="#ECF0F1"
                underlayColor="transparent"
                onPress={this.toggle}
              />
            </View>
          </View>
        </TouchableOpacity>

        <DropDownMenu isOpen={this.state.open}>
          <View>
            <View style={{ flexDirection: 'row' }}>

              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.text}>{fault.Worker.LastName} {fault.Worker.FirstName}</Text>
              </View>

              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon
                    type='font-awesome'
                    name='phone'
                    size={40}
                    color="#ECF0F1"
                    underlayColor="transparent"
                    containerStyle={{ paddingHorizontal: 5 }}
                    onPress={() => { Linking.openURL(`tel:${fault.Worker.Tel}`) }}
                  />
                  <Icon
                    name='mail-outline'
                    size={40}
                    color="#ECF0F1"
                    underlayColor="transparent"
                    containerStyle={{ paddingHorizontal: 5 }}
                    onPress={() => { Linking.openURL(`mailto:${fault.Worker.Email}`) }}
                  />
                </View>

              </View>
            </View>
            <Text style={styles.text}>{fault.Info}</Text>
            <Icon
              name='edit'
              size={40}
              color="#E74C3C"
              containerStyle={{ paddingBottom: 30 }}
              underlayColor="transparent"
            />
          </View>
        </DropDownMenu>

      </View >
    )
  }
}

const styles = StyleSheet.create({

  text: {
    fontSize: 18,
    color: '#ECF0F1',
  }

})



export default FaultPreivew;
