import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
  Text,
  ActivityIndicator

} from "react-native";
import SQL from '../../Handlers/SQL';
import Notification from '../../Handlers/Notification';
import { Icon } from "react-native-elements";
import { connect } from 'react-redux'
import { onLogin, UpdateToken, Logout } from '../../actions/userAction';
import { SetSites } from '../../actions/siteAction';
import {SetFaults} from '../../actions/faultAction';
import {SetRooms} from '../../actions/roomAction';



 class Login extends Component {
  state = {
    userName: "",
    Password: "",
    loading: false
  };

  onLogin = async () => {
    try {
      const userDetails = await SQL.Login(this.state.userName, this.state.Password);
      this.setState({loading: true})
      await this.props.onLogin(userDetails.User);
  
      const sites = userDetails.Sites.map(site=>({
        SiteId: site.SiteId,
        SiteAddress: site.SiteAddress,
        SiteImage: site.SiteImage,
        SiteName: site.SiteName,
        SiteStatus: site.SiteStatus,
        UserTypeId: site.UserTypeId
      }))
      
      await this.props.SetSites(sites)

      const sitesWithRooms = userDetails.Sites.filter(site=> site.Rooms.length != 0)
      for(let site of sitesWithRooms) {

        const rooms = site.Rooms.map(room=>({
          FloorNumber: room.FloorNumber,
          RoomId: room.RoomId,
          RoomName: room.RoomName,
          RoomPicture: room.RoomPicture,
          RoomTypeId: room.RoomTypeId,
          RoomTypeName: room.RoomTypeName,
          SiteId: site.SiteId
        }))
        this.props.SetRooms(rooms)

        const roomsWithFaults = site.Rooms.filter(room => room.Faults.length != 0 )
        for (const room of roomsWithFaults) {
          const faults = room.Faults.map(fault=>({
            SiteId: site.SiteId,
            RoomId: room.RoomId,
            ...fault
          }))

          this.props.SetFaults(faults)
        
        }
      }
      
      const Token  = await Notification.Register(userDetails.User.Email ,userDetails.User.Token )
      await this.props.UpdateToken(Token);

      this.props.navigation.navigate("HomeNav");
    } catch (error) {
      this.setState({loading: false})
      console.log(error);
      alert(error);
    }
  };

  async componentDidMount() {
    
    if (Object.keys(this.props.User).length != 0) {
      this.props.navigation.navigate("HomeNav");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text  style={styles.logo} > EasyManagement </Text>
        <TextInput
          style={styles.input}
          placeholder="שם משתמש"
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ userName: text }) }}
        />
        <TextInput
          style={styles.input}
          placeholder="סיסמא"
          secureTextEntry={true}
          placeholderTextColor="#ECF0F1"
          underlineColorAndroid="transparent"
          onChangeText={(text) => { this.setState({ Password: text }) }}
        />
        {this.state.loading ? <ActivityIndicator size="large" color="#3498DB" /> :  <Button title='התחבר' onPress={this.onLogin} color='#3498DB'/>}
       
       
        <View style={styles.Arrow}>
          <Icon
            type="ionicon"
            name="ios-arrow-back"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>

      </View>
    );
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
  logo:{
    color:'white',
    fontSize: 30,
  }

});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (userDetails) => dispatch(onLogin(userDetails)),
  SetSites: (Sites) => dispatch(SetSites(Sites)),
  UpdateToken: (Token) => dispatch(UpdateToken(Token)),
  SetFaults: (Faults) => dispatch(SetFaults(Faults)),
  SetRooms: (Rooms) => dispatch(SetRooms(Rooms)),
  Logout: () => dispatch(Logout())

})
const mapStateToProps = state => ({
    User: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
