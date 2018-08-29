import React, { Component } from 'react'
import { Text, FlatList, View, AsyncStorage,RefreshControl, StyleSheet, Dimensions } from 'react-native'
import PreviewSite from '../Site/PreviewSite';

export default class Home extends Component {
  state = {
    user: {},
    refreshing: false
  }
  async componentDidMount() {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    this.setState({ user })

  }
  _onRefresh = () => {

  }
  _ListEmptyComponent = () => {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Empty</Text>
      </View>
    );
  }
  _keyExtractor = (site) => site.SiteId.toString();
  _renderItem = (site) => <PreviewSite site={site.item} />
  render() {
    return (
      <View>
        <FlatList
        ListEmptyComponent = {this._ListEmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.state.user.Sites}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    marginTop: height/2.5,
  },
  text: {
    fontSize: 21,
    color: '#ECF0F1',
  }

})