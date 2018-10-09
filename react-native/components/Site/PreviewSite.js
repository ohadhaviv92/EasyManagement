import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import { connect } from 'react-redux';
import { SetRooms } from '../../actions/roomAction';
import { SetSiteStatus, RemoveUserFromSite } from '../../actions/siteAction';
import { Icon } from "react-native-elements";
import SQL from '../../Handlers/SQL';
class PreviewSite extends Component {


  onSiteClick = async () => {
    this.props.navigation.navigate("Site");
  }



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


  render() {
    const site = this.props.site;

    return (
      <TouchableOpacity onPress={this.onSiteClick}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: site.SiteStatus ? "#3498DB" : "#E74C3C"
        }}>


          <Image
            source={(site.SiteImage == null || site.SiteImage == '') ? require('../../assets/House.png') : {uri:site.SiteImage}}
            style={styles.img}
          />


          <Text style={styles.text}>{site.SiteName}</Text>
          <Text style={styles.text}>{site.SiteAddress}</Text>
          <Icon
            type="FontAwesome"
            name="edit"
            size={35}
            color="#2C3E50"
            underlayColor="transparent"
            onPress={() => {
              if (this.props.site.UserTypeId == 1) {
                Alert.alert(
                  'שינוי סטטוס אתר',
                  'מה ברצונך לבצע?',
                  [
                    { text: 'שינוי סטטוס אתר', onPress: this.closeSite },
                    { text: 'ביטול' },
                  ],
                  { cancelable: false }
                )
              }
              else {
                Alert.alert(
                  'הודעה',
                  'מה ברצונך לבצע?',
                  [
                    { text: 'ביטול' },
                    { text: 'יציאה מהאתר', onPress: this.GetOutFromSite },
                  ],
                  { cancelable: false }
                )
              }
            }}
          />

        </View>
      </TouchableOpacity>
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
    flex: 1,

    width: 30,
    height: 100,

  }

})

const mapDispatchToProps = (dispatch) => ({
  SetRooms: (Rooms, SiteID) => dispatch(SetRooms(Rooms, SiteID)),
  SetSiteStatus: (SiteId, Status) => dispatch(SetSiteStatus(SiteId, Status)),
  RemoveUserFromSite: (SiteId) => dispatch(RemoveUserFromSite(SiteId))
})

export default connect(null, mapDispatchToProps)(PreviewSite);
