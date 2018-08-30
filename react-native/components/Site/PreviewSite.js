import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { AddRooms } from '../../actions/roomAction';

class PreviewSite extends Component {


  onSiteClick = async() => {
    await this.props.AddRooms(this.props.site.Rooms)
  }

  render() {    
    const site = this.props.site;

    return (
      <TouchableOpacity onPress={this.onSiteClick}>
      <View style={styles.container}>
        <Text style={styles.text}>{site.SiteName}</Text>
        <Text style={styles.text}>{site.SiteAddress}</Text>
      </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
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
  AddRooms: (Rooms) => dispatch(AddRooms(Rooms))
})

export default connect(null, mapDispatchToProps)(PreviewSite);
