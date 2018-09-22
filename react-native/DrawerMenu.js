import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ScrollView,Image
  } from "react-native";
  import { Icon } from "react-native-elements";
  import { DrawerItems } from 'react-navigation';
  import { connect } from 'react-redux'
  import { Logout } from './actions/userAction';

const DrawerWithLogoutButton = (props) => (

    <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <Image
           source={require('../react-native/assets/default_user_pic.png')}
           style={styles.img}
        />
        <DrawerItems {...props} />
      </SafeAreaView>
      <TouchableOpacity onPress={async()=> {await props.Logout(); props.navigation.navigate('AuthNav')}}>
        <View style={styles.item}>
   
        <View style={styles.iconContainer}>

          <Icon
            type="simple-line-icon"
            name="logout"
            size={20}
            underlayColor="transparent"
          />
          </View>
          <Text style={styles.label}>התנתק</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  
  );
  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      marginBottom: 48,
      marginLeft: 10,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, .87)',
    },
    iconContainer: {
      marginBottom: 46,
      width: 24,
      alignItems: 'center',
    },
    icon: {
      width: 24,
      height: 24,
    },
    img: {
      
      width: 80,
       height: 80,
       borderRadius:40,
    }
  });


  const mapDispatchToProps = (dispatch) => ({
    Logout: () => dispatch(Logout())
  })
  

  
  export default connect(null, mapDispatchToProps)(DrawerWithLogoutButton);
  