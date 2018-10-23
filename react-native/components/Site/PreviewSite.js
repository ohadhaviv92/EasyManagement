import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import { SetRooms } from '../../actions/roomAction';
import { SetSiteStatus, RemoveUserFromSite, SetCurSite, SetCurType } from '../../actions/siteAction';
import { Icon } from "react-native-elements";
import SQL from '../../Handlers/SQL';
import DropDownMenu from '../General/DropDownMenu';
import Modal from '../General/Modal'
class PreviewSite extends Component {

  state = {
    open: false,
    modalVisible: false,
  }

  onSiteClick = async () => {
    this.props.SetCurSite(this.props.site.SiteId)
    this.props.SetCurType(this.props.site.UserTypeId)
    this.props.navigation.navigate("Site");
  }

  openModal = () => this.setState((pervState) => ({ modalVisible: !pervState.modalVisible }))

  closeSite = async () => {
    try {
      await SQL.ChangeSiteStatus(this.props.site.SiteId, !this.props.site.SiteStatus);
      this.props.SetSiteStatus(this.props.site.SiteId, !this.props.site.SiteStatus);
    } catch (error) {

    }
  }

  GetOutFromSite = async () => {
    try {
      await SQL.OutFromSite(this.props.site.SiteId, this.props.user.UserId);
      this.props.RemoveUserFromSite(this.props.site.SiteId);
    } catch (error) {

    }
  }

  toggle = () => {
    this.setState((pervState) => ({ open: !pervState.open }));
  }



  render() {
    const site = this.props.site;

    return (
      <View style={{overflow: 'hidden',}}>
        <TouchableOpacity onPress={this.onSiteClick}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: site.SiteStatus ? "#3498DB" : "#E74C3C"
          }}>

           <TouchableOpacity onPress={this.openModal} style={{flex:1}}>
            <Image
              source={(site.SiteImage == null || site.SiteImage == '') ? require('../../assets/House.png') : { uri: site.SiteImage }}
              style={styles.img}
            />
           </TouchableOpacity>
           <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => null}
            Toggle={this.openModal}
          >
                        <Image
              source={(site.SiteImage == null || site.SiteImage == '') ? require('../../assets/House.png') : { uri: site.SiteImage }}
              style={styles.img2}
            />

          </Modal>

            <Text style={styles.text}>{site.SiteName}</Text>
            <Text style={styles.text}>{site.SiteAddress}</Text>
            <Icon
              type="ionicon"
              name={this.state.open ? 'ios-arrow-up' : 'ios-arrow-down'}
              size={40}
              color="#ECF0F1"
              underlayColor="transparent"
              onPress={this.toggle}
              containerStyle={{ padding: 30 }}
            />

          </View>
        </TouchableOpacity>

        <DropDownMenu isOpen={this.state.open}>
            <View>
              <Icon
                type="ionicon"
                name='md-remove-circle'
                size={40}
                containerStyle={{ paddingBottom: 20 }}
                color="#E74C3C"
                underlayColor="transparent"
                onPress={this.closeSite}
              />
            </View> 
        </DropDownMenu>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 21,
    color: '#ECF0F1',
  },
  img: {
    marginLeft: 3,
    marginTop:3,
    marginBottom: 3,
    flex: 1,
    
    width: 90,
    height: 90,

  },
  img2: {
    

    width: '99%',
    height: '99%',

  }

})

const mapDispatchToProps = (dispatch) => ({
  SetRooms: (Rooms, SiteID) => dispatch(SetRooms(Rooms, SiteID)),
  SetCurType: (TypeId) => dispatch(SetCurType(TypeId)),
  SetSiteStatus: (SiteId, Status) => dispatch(SetSiteStatus(SiteId, Status)),
  RemoveUserFromSite: (SiteId) => dispatch(RemoveUserFromSite(SiteId)),
  SetCurSite: (SiteId) => dispatch(SetCurSite(SiteId))
})

export default connect(null, mapDispatchToProps)(PreviewSite);
