import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import { Text, View, StyleSheet, TouchableOpacity, Image, Linking, TextInput, Switch } from 'react-native'
import DropDownMenu from '../General/DropDownMenu';
import { connect } from 'react-redux';
import { UpdateFaults } from '../../actions/faultAction';
class FaultPreivew extends Component {

  state = {
    open: false,
    isEditing: false,
    openDate: '',
    isOpen: this.props.fault.FaultStatus == 0 ? false : true,
    curFault: this.props.fault
  }


  Save = () => {
    this.setState({ isEditing: false })
    this.props.UpdateFaults([this.state.curFault])
  }

  toggle = () => {
    this.setState((pervState) => ({ open: !pervState.open }));
  }

  componentDidMount() {
    const openDate = new Date(parseInt(this.props.fault.OpenDate.substr(6), 10)).toLocaleDateString();
<<<<<<< HEAD
    
=======
>>>>>>> ce21b5435c463be90f0568d22990271d2d3f2649
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
            backgroundColor: fault.FaultStatus == 0 ? "#E74C3C" : "#3498DB" 
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
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.text}>{fault.FaultName}</Text>
              </View>
              <View style={{ flex: 2, alignItems: 'flex-end' }}>
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
                <Text style={styles.text}>{fault.Worker.UserName}</Text>
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

            {this.state.isEditing ?
              <View style={{ flexDirection: 'column' }}>
                <TextInput
                  value={this.state.curFault.Info}
                  editable={true}
                  onChangeText={(txt) => this.setState({ curFault: { ...this.state.curFault, Info: txt } })}
                  style={styles.input}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>סגירת תקלה</Text>
                  <Switch
                    onValueChange={() => this.setState((pervState) => ({
                      curFault: { ...this.state.curFault, FaultStatus: pervState.curFault.FaultStatus == 0 ? 1 : 0 },
                      isOpen: !pervState.isOpen
                    })
                    )}
                    value={this.state.isOpen}
                  />

                </View>
                <View style={{ flexDirection: 'row', marginBottom: 15, }}>
                  <Icon
                    name='remove'
                    size={40}
                    color="#E74C3C"
                    containerStyle={{ paddingBottom: 30 }}
                    underlayColor="transparent"
                    onPress={() => this.setState({ isEditing: false })}
                  />
                  <Icon
                    name='check'
                    size={40}
                    color="#E74C3C"
                    containerStyle={{ paddingBottom: 30 }}
                    underlayColor="transparent"
                    onPress={this.Save}
                  />
                </View>

              </View>

              :
              <View style={{paddingBottom: 50}}>
                <Text style={styles.text}>{fault.Info}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>סטטוס תקלה: {fault.FaultStatus == 0 ? 'פתוח' : 'סגור'}</Text>
                </View>
                {this.props.TypeId != 1 && fault.FaultStatus != 0 ? null : 
                <Icon
                  name='edit'
                  size={40}
                  color="#E74C3C"
                  underlayColor="transparent"
                  containerStyle={{paddingBottom: 50}}
                  onPress={() => this.setState({ isEditing: true })}
                />
                }
              </View>

            }

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
  },
  input: {
    backgroundColor: '#3498DB',
    color: '#ECF0F1'
  }

})


const mapDispatchToProps = (dispatch) => ({
  UpdateFaults: (Faults) => dispatch(UpdateFaults(Faults))
})


const mapStateToProps = state => {
  return {
    TypeId: state.curType
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaultPreivew); 