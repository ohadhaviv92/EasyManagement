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
      <TouchableOpacity onPress={()=>{ props.navigation.navigate('EditUserDetails');}}>
      <View style={styles.user}>
      <Image
           source={require('./assets/default_user_pic.png')}
           style={styles.img}
        />
        <Text style={styles.label}>שלום {props.User.FirstName +" "+ props.User.LastName}</Text>
        </View>
        </TouchableOpacity>
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
  
  const mapStateToProps = (state) => ({
    User: state.user,
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(DrawerWithLogoutButton);
  