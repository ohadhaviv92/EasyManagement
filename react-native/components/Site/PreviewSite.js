import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux';
import { SetRooms } from '../../actions/roomAction';
import { SetSiteStatus } from '../../actions/siteAction';
import { Icon } from "react-native-elements";
import SQL from '../../Handlers/SQL';
class PreviewSite extends Component {


  onSiteClick = async () => {
    console.log(this.props.site.Rooms, this.props.site.SiteId);

    await this.props.SetRooms(this.props.site.Rooms, this.props.site.SiteId);
    this.props.navigation.navigate("Site");
  }

  onSiteClick = async () => {
    console.log(this.props.site.Rooms, this.props.site.SiteId);

    await this.props.SetRooms(this.props.site.Rooms, this.props.site.SiteId);
    this.props.navigation.navigate("Site");
  }


  closeSite = async () => {
    try {
      await SQL.ChangeSiteStatus(this.props.site.SiteId, !this.props.site.SiteStatus);
      this.props.SetSiteStatus(this.props.site.SiteId, !this.props.site.SiteStatus);
    } catch (error) {

    }
  }

  render() {
    const site = this.props.site;

    return (
      <TouchableOpacity onPress={this.onSiteClick}>
        <View style={styles.container}>

          <Icon
            type="MaterialIcons"
            name="info-outline"
            size={30}
            color="white"
            underlayColor="transparent"
            onPress={() => {
              if (this.props.site.UserTypeId == 1) {


                Alert.alert(
                  'שינוי סטטוס אתר',
                  'מה ברצונך לבצע?',
                  [

                    { text: 'יציאה מהאתר', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'שינוי סטטוס אתר', onPress: this.closeSite },
                    { text: 'cancel', onPress: () => console.log('Ask me later pressed') },
                  ],
                  { cancelable: false }
                )
              }
              else {
                Alert.alert(
                  'הודעה',
                  'מה ברצונך לבצע?',
                  [

                    { text: 'יציאה מהאתר', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'cancel', onPress: () => console.log('Ask me later pressed') },

                  ],
                  { cancelable: false }
                )
              }
            }}
          />
          <Text style={styles.text}>{site.SiteName}</Text>
          <Text style={styles.text}>{site.SiteAddress}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E74C3C'
  },
  text: {
    fontSize: 21,
    color: '#ECF0F1',
  }

})

const mapDispatchToProps = (dispatch) => ({
  SetRooms: (Rooms, SiteID) => dispatch(SetRooms(Rooms, SiteID)),
  SetSiteStatus: (SiteId, Status) => dispatch(SetSiteStatus(SiteId, Status))

})

export default connect(null, mapDispatchToProps)(PreviewSite);
