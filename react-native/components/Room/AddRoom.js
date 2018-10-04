import React, { Component } from 'react'
import { TextInput, View, Dimensions, StyleSheet, Picker } from 'react-native'
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import SQL from '../../Handlers/SQL';
import { SetRoomsType, AddRooms } from '../../actions/roomAction';

class AddRoom extends Component {
  state = {
    roomTypes: null,
    roomName: '',
    roomId: NaN,
    floor: 0
  };

  AddNewRoom = async () => {
   
    if(this.state.roomId){
      const room = await SQL.AddRoom(this.props.SiteID, this.state.roomId, this.state.roomName, this.state.floor)
      this.props.AddRooms([room]);
      this.props.Close();
    }
  };

  async componentDidMount() {
    if (this.props.RoomsType.length == 0) {
      try {
        const roomTypes = await SQL.GetRoomsType();
        this.props.SetRoomsType(roomTypes);
      } catch (error) {

      }
    }
  }

  render() {
    return (
      <View style={styles.container}>


        <Picker
          selectedValue={this.state.roomId}
          itemStyle={{ height: 40, color: "#ffffff" }}
          onValueChange={(val, index) => this.setState({ roomId: val })}
          style={styles.picker}>

          {this.props.RoomsType.map(type => <Picker.Item key={type.RoomTypeId} label={type.RoomTypeName} value={type.RoomTypeId} />)}

        </Picker>

        <TextInput
          style={styles.input}
          placeholder="שם החדר"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ roomName: text }) }}
        />
        <TextInput
          style={styles.input}
          placeholder="קומה"
          placeholderTextColor="#ECF0F1"
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ floor: text }) }}
        />


        <View style={{flexDirection: 'row'}}>
          <Icon
            type="ionicon"
            name="ios-add-circle-outline"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={this.AddNewRoom}
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

      </View>
    )
  }
}



const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 75,
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
  SetRoomsType: (Jobs) => dispatch(SetRoomsType(Jobs)),
  AddRooms: (Rooms) => dispatch(AddRooms(Rooms))

})

const mapStateToProps = state => {
  return {
    RoomsType: state.roomsType,
    SiteID: state.rooms.SiteID
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddRoom); 