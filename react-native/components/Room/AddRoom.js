import React, { Component } from 'react'
import { TextInput, View, Dimensions, StyleSheet, Picker } from 'react-native'
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import SQL from '../../Handlers/SQL';
import { SetRoomsType } from '../../actions/roomAction';

class AddRoom extends Component {
  state = {
    roomTypes: null,
    roomName: '',
    roomId: NaN,
    floor: 0
  };

  AddNewRoom = async () => {

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


        <View >
          <Icon
            type="ionicon"
            name="ios-add-circle-outline"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={this.AddNewRoom}
          />
          <Icon
            type="MaterialIcons"
            name="add-a-photo"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
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
    justifyContent: 'center',
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
  SetRoomsType: (Jobs) => dispatch(SetRoomsType(Jobs))

})

const mapStateToProps = state => {
  return {
    RoomsType: state.roomsType
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddRoom); 