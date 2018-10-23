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
           source={props.User.Img=="" || props.User.Img==null ?  require('./assets/user.png') : {uri:props.User.Img}}
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
      alignSelf: 'center',
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
      alignSelf: 'center',
      width: 120,
       height: 120,
       borderRadius:60,
    }
  });


  const mapDispatchToProps = (dispatch) => ({
    Logout: () => dispatch(Logout())
  })
  
  const mapStateToProps = (state) => ({
    User: state.user,
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(DrawerWithLogoutButton);
  