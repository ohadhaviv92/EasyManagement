import React, { Component } from 'react'
import { TextInput, Button, View, Dimensions, StyleSheet,Text } from 'react-native'
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import SQL from '../../Handlers/SQL';
import { addSites } from '../../actions/siteAction';

class AddSite extends Component {
  state = {
    siteName: "",
    siteAddress: ""
  };

  addNewSite = async () => {
    try {
      if(this.state.siteName!=""&&this.state.siteAddress){
      const siteDetails = await SQL.AddNewSite(this.props.User.UserId, this.state.siteName, this.state.siteAddress)
      await this.props.addSites([siteDetails]);          
      this.props.navigation.navigate("Home");
      }
      else {
          throw("חובה למלא את כל השדות")      
      }

    } catch (error) {
      console.log(error);
      alert(error);
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <Text  style={styles.logo} > הוספת אתר חדש </Text>
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


        <View style={{flexDirection: 'row'}}>
          <Icon
            type="ionicon"
            name="ios-add-circle-outline"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={this.addNewSite}
            containerStyle={{marginHorizontal: (width - 80)/4}}
          />
          <Icon
            type="MaterialIcons"
            name="add-a-photo"
            size={50}
            color="#ECF0F1"
            underlayColor="transparent"
            onPress={()=>null}
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
  logo:{
    color:'white',
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