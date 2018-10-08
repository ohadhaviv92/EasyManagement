import React, { Component } from 'react'
import { TextInput, View, Dimensions, StyleSheet, Picker, FlatList } from 'react-native'
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import Empty from '../General/Empty';
import Modal from '../General/Modal';
import SQL from '../../Handlers/SQL';
import {SetFaultTypes} from '../../actions/faultAction';

class AddFault extends Component {
  state = {
    faultTypes: null,
    faultInfo: '',
    faultId: NaN
  };

  AddNewFault = async () => {
   this.props.Close()
  };

  async componentDidMount() {
    if (this.props.FaultTypes.length == 0) {
        try {
        //   const FaultTypes = await SQL.GetRoomsType();
        //   this.props.SetFaultTypes(FaultTypes);
        //   this.setState({faultId: FaultTypes[0].FaultTypeId})
        } catch (error) {
  
        }
      }
  }


  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))
  Close = () => { this.setState({modalVisible: false}) }


  _ListEmptyComponent = () => <Empty />
  _ItemSeparatorComponent = () => <View style={{ width, height: 2, backgroundColor: '#E74C3C', marginVertical: 7 }}></View>
  _keyExtractor = (fault) => fault.FaultId.toString();
  _renderItem = (fault) => <FaultPreview fault={fault.item} />

  render() {
    return (
      <View style={styles.container}>


        <Picker
          selectedValue={this.state.faultId}
          itemStyle={{ height: 40, color: "#ffffff" }}
          onValueChange={(val, index) => this.setState({ faultId: val })}
          style={styles.picker}>

          {this.props.FaultTypes.map(type => <Picker.Item key={type.FaultTypeId} label={type.FaultTypeName} value={type.FaultTypeId} />)}

        </Picker>

        <TextInput
          style={styles.input}
          placeholder="תיאור התקלה"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ faultInfo: text }) }}
        />


          <View style={{flexDirection: 'row'}}>
          <Icon
              type="ionicon"
              name="md-person-add"
              size={50}
              color="#ECF0F1"
              underlayColor="transparent"
              containerStyle={{marginHorizontal: (width - 80)/4}}
            />
          <Icon
              type="MaterialIcons"
              name="add-a-photo"
              size={50}
              color="#ECF0F1"
              underlayColor="transparent"
              containerStyle={{marginHorizontal: (width - 80)/4}}
            />
          </View>
          <Icon
            type="ionicon"
            name="ios-add-circle-outline"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={this.AddNewFault}
          />
     
      
       

      </View>
    )
  }
}



const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginVertical: 75,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    backgroundColor: "#2980B9",
    width: width - 80,
    height: 40,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 15,
    color: "#ffffff",
  },
  Arrow: {
    position: "absolute",
    right: 10,
  },
  picker: {
    backgroundColor: "#2980B9",
    width: width - 80,
    height: 40,
    marginVertical: 5,
  }

});


const mapDispatchToProps = (dispatch) => ({

})

const mapStateToProps = state => {
  return {
      User: state.user,
      roomId: state.faults.RoomID,
      FaultTypes: state.faultTypes
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddFault); 