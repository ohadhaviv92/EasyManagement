import React, { Component } from 'react'
import { TextInput,Text, View, Dimensions,Image, StyleSheet, Picker, FlatList, TouchableOpacity } from 'react-native'
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import Empty from '../General/Empty';
import Modal from '../General/Modal';
import SQL from '../../Handlers/SQL';
import { SetFaultTypes, AddFaults } from '../../actions/faultAction';
import CameraPage from '../General/CameraPage'
import { ImagePicker, ImageManipulator } from 'expo';

class AddFault extends Component {
  state = {
    faultTypes: null,
    faultInfo: '',
    faultId: NaN,
    modalVisible: false,
    user: null,
    users: [],
    pic: "",
    tookPic: false,
    modalVisible: false,
    modalVisible2: false,
    base64:  "",
  };

  TakePicture = async(picture) => {
    this.setState({ modalVisible2: false } );
    
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
  openModal2 = () => this.setState((pervState) => ({ modalVisible2: !pervState.modalVisible2 }))

  Close = () => { this.setState({ modalVisible: false }) }


  AddNewFault = async () => {
    const fault = await SQL.AddFault(this.props.User.UserId, this.state.user.UserId, this.props.roomId ,this.state.faultId, this.state.faultInfo,this.state.base64);
    console.log(fault);
    
    if(fault != null)
      this.props.AddFaults([{SiteId: this.props.siteId, RoomId: this.props.roomId, ...fault, Worker: this.state.user, Owner: this.props.User}])
    this.props.Close()
  };

  async componentDidMount() {
    if (this.props.FaultTypes.length == 0) {
      try {
        const FaultTypes = await SQL.GetFaultTypes();
        this.props.SetFaultTypes(FaultTypes);
        this.setState({ faultId: FaultTypes[0].FaultTypeId })
      } catch (error) {

      }
    }

    const Users = await SQL.GetUsersInSite(this.props.siteId);
  
    this.setState({ users: Users.filter(user => user.UserId != this.props.User.UserId) })


  }


  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))
  Close = () => { this.setState({ modalVisible: false }) }


  _ListEmptyComponent = () => <Empty />
  _ItemSeparatorComponent =() => <View style={{ overflow: 'hidden', paddingVertical: 7, backgroundColor: '#2C3E50'}}><View style={{paddingVertical: 1, backgroundColor: 'white'}}/></View>
  _keyExtractor = (item) => item.UserId.toString();
  _renderItem = ({item}) =>
  <View style={styles.userContainer}>
    <TouchableOpacity onPress={() => { this.setState({ user: item }); this.Close() }}>
      <Text style={styles.text}>{item.UserName} , {item.JobName}</Text>
    </TouchableOpacity>
    
  </View>
  
  


  render() {
    return (
      <View style={styles.container}>


        <Picker
          selectedValue={this.state.faultId}
          itemStyle={{ height: 40, color: "#ffffff" }}
          onValueChange={(val, index) => this.setState({ faultId: val })}
          style={styles.picker}>

          {this.props.FaultTypes.map(type => <Picker.Item key={type.FaultTypeId} label={type.FaultName} value={type.FaultTypeId} />)}

        </Picker>

        <TextInput
          style={styles.input}
          placeholder="תיאור התקלה"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ faultInfo: text }) }}
        />


        <View style={{ flexDirection: 'row' }}>
          <Icon
            type="ionicon"
            name="md-person-add"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            containerStyle={{ marginHorizontal: (width - 80) / 4 }}
            onPress={this.openModal}
          />
          <Icon
            type="MaterialIcons"
            name="add-a-photo"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            containerStyle={{marginHorizontal: (width - 80)/6}}
            onPress={() => { this.setState({ modalVisible2: true }) }}
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
        </View>

         {this.state.user != null ?
          <View style={styles.userContainer}>
            <Text style={styles.text}>{this.state.user.UserName}</Text>
            <Text style={styles.text}>{this.state.user.JobName}</Text>
            <Icon
              type="ionicon"
              name='md-trash'
              size={40}
              containerStyle={{ paddingBottom: 20 }}
              color="#E74C3C"
              underlayColor="transparent"
              onPress={() => this.setState({ user: null })}
            />
          </View>
          : null}


        <Icon
          type="ionicon"
          name="ios-add-circle-outline"
          size={50}
          color="#ECF0F1"
          underlayColor="transparent"
          onPress={this.AddNewFault}
        />




        <Modal Toggle={this.openModal} visible={this.state.modalVisible}>
          <View style={{width, height}}>
            <FlatList
              ListEmptyComponent={this._ListEmptyComponent}
              ItemSeparatorComponent={this._ItemSeparatorComponent}
              data={this.state.users}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </View>

        </Modal>
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible2}
            onRequestClose={() => null}
            Toggle={this.openModal2}
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
  userContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498DB'
  },

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
    
  },
  text: {
    fontSize: 21,
    color: '#ECF0F1',
  }

});


const mapDispatchToProps = (dispatch) => ({
  SetFaultTypes: (FaultTypes) => dispatch(SetFaultTypes(FaultTypes)),
  AddFaults: (Faults) => dispatch(AddFaults(Faults))
})

const mapStateToProps = state => {
  return {
    User: state.user,
    siteId: state.curSite,
    roomId: state.curRoom,
    FaultTypes: state.faultTypes
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddFault); 