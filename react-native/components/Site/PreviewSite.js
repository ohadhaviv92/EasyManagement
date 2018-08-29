import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class PreviewSite extends Component {

  render() {    
    const site = this.props.site;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{site.SiteName}</Text>
        <Text style={styles.text}>{site.SiteAddress}</Text>
      </View>
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