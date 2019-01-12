import React, { Component } from 'react'
import { TextInput, View, Dimensions, StyleSheet, Picker,Image } from 'react-native'
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import SQL from '../../Handlers/SQL';
import { SetRoomsType, AddRooms } from '../../actions/roomAction';
import Modal from '../General/Modal'
import CameraPage from '../General/CameraPage'
import { ImagePicker,ImageManipulator } from 'expo';
class AddRoom extends Component {
  state = {
    roomTypes: null,
    roomName: '',
    roomId: NaN,
    floor: 0,
    pic: "",
    tookPic: false,
    modalVisible: false,
    base64:  "",
  };

  TakePicture = async(picture) => {
    this.setState({ modalVisible: false } );
    
    const pic = await ImageManipulator.manipulate( picture.uri , [ { resize: {width: 500 , height: 500 } } ], { format: 'jpeg', base64: true })
        
    this.setState({ pic, tookPic: true, base64: pic.base64 })
  }

  _pickImg = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });
    
    this.setState({
      pic:pickerResult,
      base64:pickerResult.base64
});
  };

  renderPic = () => {
    if (this.state.pic!="") {
      return <Image
        style={{ width: 350, height: 250,marginTop:20, borderRadius: 10 }}
        source={{ uri: this.state.pic.uri }} />
    }
  }
  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))


  AddNewRoom = async () => {

    if(this.state.roomId){
    
      const room = await SQL.AddRoom(this.props.SiteID, this.state.roomId, this.state.roomName, this.state.floor ,this.state.base64)
      console.log(room);
      
      if(room != null)
        this.props.AddRooms([{SiteId: this.props.SiteID, ...room}]);
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
    this.setState({roomId: this.props.RoomsType[0].RoomTypeId})
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
            containerStyle={{marginHorizontal: (width - 80)/6}}
          />
                    <Icon
            type="MaterialIcons"
            name="photo-album"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={this._pickImg}
            containerStyle={{ marginHorizontal: (width - 80) / 6 }}
          />
          <Icon
            type="MaterialIcons"
            name="add-a-photo"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            containerStyle={{marginHorizontal: (width - 80)/6}}
            onPress={() => { this.setState({ modalVisible: true }) }}


          />
         
        </View>
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => null}
            Toggle={this.openModal}
          >
            <CameraPage Snap={this.TakePicture}  />

          </Modal>
          {this.renderPic()}
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
    SiteID: state.curSite
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddRoom); 