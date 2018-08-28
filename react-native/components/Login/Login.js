import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import { Icon } from "react-native-elements";
import SQL from "../../Handlers/SQL";

export default class Login extends Component {
  state = {
    userName: "",
    Password: ""
  };

  onLogin = async () => {
    try {
      const user = await SQL.Login(this.state.userName, this.state.Password);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      this.props.navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert(error, "", [{ text: "OK" }]);
    }
  };

  async componentDidMount(){
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if(user != undefined){
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    return (
      <View style={{ marginTop: height * 0.05, height: height * 0.7 }}>
        <View style={styles.title}>
          <Text style={styles.text_big}>LOGIN</Text>
          <Text style={styles.text_small}>/ Sign up</Text>
        </View>

<KeyboardAvoidingView enabled behavior ='position' style={styles.container}>

          <TextInput
            style={styles.input}
            placeholder="User name"
            keyboardType="email-address"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={text => {
              this.setState({ userName: text });
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={text => {
              this.setState({ Password: text });
            }}
          />

        </KeyboardAvoidingView>
        <View style={styles.Arrow}>
          <Icon
            type="ionicon"
            name="ios-arrow-forward"
            size={50}
            color="#ffdd00"
            underlayColor="transparent"
            onPress={() => this.props.navigation.navigate("Register")}
          />
        </View>

        <TouchableOpacity onPress={this.onLogin}  style={styles.confirm}>
          <Image
            source={require("../../assets/Confirm.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  confirm: {
    position: 'absolute',
    right: 30,
    bottom: 30
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: width - 80,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: "#ffffff",
    marginBottom: 10
  },
  title: {
    flexDirection: "row",
    marginLeft: 30
  },
  container: {
   flexDirection: "column",
    marginTop: 30,
    alignItems: "center",
  },
  text_small: {
    color: "white",
    fontSize: 20,
    marginTop: 20
  },
  text_big: {
    color: "white",
    fontSize: 40
  },
  Arrow: {
    position: "absolute",
    right: 10,
  },
});
