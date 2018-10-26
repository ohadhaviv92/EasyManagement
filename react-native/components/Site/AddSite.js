import React, { Component } from 'react'
import { TextInput, Button, View, Dimensions, StyleSheet, Text, Image } from 'react-native'
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import SQL from '../../Handlers/SQL';
import { addSites } from '../../actions/siteAction';
import Modal from '../General/Modal'
import CameraPage from '../General/CameraPage'
import { ImagePicker, ImageManipulator } from 'expo';
class AddSite extends Component {
  state = {
    siteName: "",
    siteAddress: "",
    pic: "",
    tookPic: false,
    modalVisible: false,
    base64:  "",
   
  };


  TakePicture = async(picture) => {
    await this.setState({ modalVisible: false } );
    
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

  addNewSite = async () => {
    try {
       
      if (this.state.siteName != "" && this.state.siteAddress) {
        
        
        const siteDetails = await SQL.AddNewSite(this.props.User.UserId, this.state.siteName, this.state.siteAddress,this.state.base64)
        
        if(siteDetails != null)
          await this.props.addSites([siteDetails]);
        this.props.Toggle();

      }
      else {
        throw ("חובה למלא את כל השדות")
      }

    } catch (error) {
      console.log(error);

    }
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo} > הוספת אתר חדש </Text>
        <TextInput
          style={styles.input}
          placeholder="שם האתר"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ siteName: text }) }}
        />
        <TextInput
          style={styles.input}
          placeholder="כתובת האתר"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ siteAddress: text }) }}
        />


        <View style={{ flexDirection: 'row' }}>
          <Icon
            type="ionicon"
            name="ios-add-circle-outline"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={this.addNewSite}
            containerStyle={{ marginHorizontal: (width - 80) / 6 }}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => null}
            Toggle={this.openModal}
          >
            <CameraPage Snap={this.TakePicture}  />

          </Modal>
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
            onPress={() => { this.setState({ modalVisible: true }) }}
            containerStyle={{ marginHorizontal: (width - 80) / 6 }}
          />

        </View>
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
  logo: {
    color: 'white',
    fontSize: 30,
  }

});


const mapDispatchToProps = (dispatch) => ({
  addSites: (Sites) => dispatch(addSites(Sites)),

})

const mapStateToProps = (state) => ({
  User: state.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(AddSite); 